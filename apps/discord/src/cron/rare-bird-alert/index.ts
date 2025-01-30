import { CronJob } from 'cron';
import { fromZonedTime } from 'date-fns-tz';
import { eq, sql, gte, and, or, not, exists } from 'drizzle-orm';

import { createRareBirdAlertEmbed } from '@/embeds/rare-bird-alert';
import type { GroupedObservation } from '@/embeds/rare-bird-alert/types';
import db from '@/utils/database';
import {
    locations,
    observations,
    filteredSpecies,
    channelSubscriptions,
    countyTimezones,
} from '@/utils/database/schema';
import { fetchRareObservations } from '@/utils/ebird';
import type {
    EBirdObservation,
    EBirdObservationResponse,
} from '@/utils/ebird/schema';

import type { EBirdObservationWithMediaCounts } from './types';
import type { Client } from 'discord.js';

export class RareBirdAlert {
    private job: CronJob;

    constructor(private client: Client) {
        this.run(true);
        this.job = new CronJob('*/1 * * * *', async () => {
            await this.run(false);
        });
        this.job.start();
    }

    private async getActiveStates() {
        const statesToFetch = await db
            .selectDistinct({ stateCode: channelSubscriptions.stateCode })
            .from(channelSubscriptions)
            .where(eq(channelSubscriptions.active, true));
        return statesToFetch.map((state) => state.stateCode);
    }

    private async getTimezoneForCounty(countyCode: string): Promise<string> {
        const result = await db
            .select({ timezone: countyTimezones.timezone })
            .from(countyTimezones)
            .where(eq(countyTimezones.countyCode, countyCode))
            .limit(1);

        return result.at(0)?.timezone ?? 'America/Los_Angeles';
    }

    private async fetchRareObservations(states: string[]) {
        const responsePromises = states.map((state) =>
            fetchRareObservations(state)
        );
        const responses = await Promise.all(responsePromises);

        return responses.flatMap((response: EBirdObservationResponse) => {
            return response.type === 'success' ? response.observations : [];
        });
    }

    private async upsertLocations(rawLocations: EBirdObservation[]) {
        const locationsToUpsert = rawLocations.map((observation) => ({
            id: observation.locId,
            county: observation.subnational2Name,
            countyCode: observation.subnational2Code,
            state: observation.subnational1Name,
            stateCode: observation.subnational1Code,
            name: observation.locName,
            lat: observation.lat,
            lng: observation.lng,
            isPrivate: observation.locationPrivate,
            lastUpdated: new Date(),
        }));

        const batchSize = 100;
        for (let i = 0; i < locationsToUpsert.length; i += batchSize) {
            const batch = locationsToUpsert.slice(i, i + batchSize);
            await db
                .insert(locations)
                .values(batch)
                .onConflictDoUpdate({
                    target: [locations.id],
                    set: {
                        county: sql`excluded.county`,
                        countyCode: sql`excluded.county_code`,
                        state: sql`excluded.state`,
                        stateCode: sql`excluded.state_code`,
                        name: sql`excluded.name`,
                        lat: sql`excluded.lat`,
                        lng: sql`excluded.lng`,
                        isPrivate: sql`excluded.is_private`,
                        lastUpdated: sql`excluded.last_updated`,
                    },
                });
        }
    }

    private async upsertObservations(
        rawObservations: EBirdObservationWithMediaCounts[],
        initialRun: boolean = false
    ) {
        const observationsToUpsert = await Promise.all(
            rawObservations.map(async (observation) => {
                const timezone = await this.getTimezoneForCounty(
                    observation.subnational2Code
                );
                return {
                    speciesCode: observation.speciesCode,
                    subId: observation.subId,
                    comName: observation.comName,
                    sciName: observation.sciName,
                    locId: observation.locId,
                    obsDt: fromZonedTime(new Date(observation.obsDt), timezone),
                    howMany: observation.howMany || -1,
                    obsValid: observation.obsValid,
                    obsReviewed: observation.obsReviewed,
                    presenceNoted: observation.presenceNoted,
                    photoCount: observation.photos,
                    audioCount: observation.audio,
                    videoCount: observation.video,
                    hasComments: observation.hasComments,
                    createdAt: initialRun
                        ? new Date(Date.now() - 300 * 1000) // 5 minutes ago for initial run
                        : new Date(),
                    lastUpdated: new Date(),
                };
            })
        );

        const batchSize = 100;
        for (let i = 0; i < observationsToUpsert.length; i += batchSize) {
            const batch = observationsToUpsert.slice(i, i + batchSize);
            await db
                .insert(observations)
                .values(batch)
                .onConflictDoUpdate({
                    target: [observations.subId, observations.speciesCode],
                    set: {
                        comName: sql`excluded.common_name`,
                        sciName: sql`excluded.scientific_name`,
                        locId: sql`excluded.location_id`,
                        obsDt: sql`excluded.observation_date`,
                        howMany: sql`excluded.how_many`,
                        obsValid: sql`excluded.observation_valid`,
                        obsReviewed: sql`excluded.observation_reviewed`,
                        presenceNoted: sql`excluded.presence_noted`,
                        photoCount: sql`excluded.photo_count`,
                        audioCount: sql`excluded.audio_count`,
                        videoCount: sql`excluded.video_count`,
                        hasComments: sql`excluded.has_comments`,
                        lastUpdated: sql`excluded.last_updated`,
                    },
                });
        }
    }

    private groupObservationsForInsert(
        observations: EBirdObservation[]
    ): EBirdObservationWithMediaCounts[] {
        const grouped = observations.reduce((acc, obs) => {
            const key = `${obs.speciesCode}-${obs.subId}`;

            if (!acc.has(key)) {
                acc.set(key, {
                    ...obs,
                    photos: 0,
                    audio: 0,
                    video: 0,
                });
            }

            const entry = acc.get(key)!;
            if (obs.evidence === 'P') entry.photos++;
            if (obs.evidence === 'A') entry.audio++;
            if (obs.evidence === 'V') entry.video++;

            return acc;
        }, new Map<string, EBirdObservationWithMediaCounts>());

        return Array.from(grouped.values());
    }

    private async sendObservationsToChannel(
        channelId: string,
        observations: GroupedObservation[]
    ) {
        const channel = await this.client.channels.fetch(channelId);
        if (!channel?.isTextBased() || !channel?.isSendable()) return;

        for (const observation of observations) {
            const embed = createRareBirdAlertEmbed(observation);
            await channel.send({ embeds: [embed] });
        }
    }

    async run(initialRun: boolean = false) {
        const states = await this.getActiveStates();
        const rareObservations = await this.fetchRareObservations(states);
        await this.upsertLocations(rareObservations);

        const groupedObservations =
            this.groupObservationsForInsert(rareObservations);

        await this.upsertObservations(groupedObservations, initialRun);

        const thirtySecondsAgo = new Date(Date.now() - 30 * 1000);

        const recentObservationsWithChannels = await db
            .select({
                channelId: channelSubscriptions.channelId,
                speciesCode: observations.speciesCode,
                subId: observations.subId,
                comName: observations.comName,
                county: locations.county,
                locId: observations.locId,
                locName: locations.name,
                isPrivate: locations.isPrivate,
                latestDate: sql<number>`max(${observations.obsDt})`,
                howMany: sql<number>`max(${observations.howMany})`,
                photoCount: sql<number>`coalesce(sum(${observations.photoCount}), 0)`,
                audioCount: sql<number>`coalesce(sum(${observations.audioCount}), 0)`,
                videoCount: sql<number>`coalesce(sum(${observations.videoCount}), 0)`,
                reports: sql<number>`count(*)`,
            })
            .from(observations)
            .innerJoin(locations, eq(observations.locId, locations.id))
            .innerJoin(
                channelSubscriptions,
                and(
                    eq(channelSubscriptions.stateCode, locations.stateCode),
                    or(
                        eq(channelSubscriptions.countyCode, '*'),
                        eq(
                            channelSubscriptions.countyCode,
                            locations.countyCode
                        )
                    ),
                    eq(channelSubscriptions.active, true)
                )
            )
            .where(
                and(
                    gte(observations.createdAt, thirtySecondsAgo),
                    not(
                        exists(
                            db
                                .select()
                                .from(filteredSpecies)
                                .where(
                                    and(
                                        eq(
                                            filteredSpecies.channelId,
                                            channelSubscriptions.channelId
                                        ),
                                        eq(
                                            filteredSpecies.commonName,
                                            observations.comName
                                        )
                                    )
                                )
                        )
                    )
                )
            )
            .groupBy(
                channelSubscriptions.channelId,
                observations.speciesCode,
                observations.locId
            );

        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const confirmedSpecies = await db
            .selectDistinct({
                speciesCode: observations.speciesCode,
                locId: observations.locId,
            })
            .from(observations)
            .where(
                and(
                    gte(observations.obsDt, oneWeekAgo),
                    eq(observations.obsReviewed, true),
                    eq(observations.obsValid, true)
                )
            );

        const confirmedSet = new Set(
            confirmedSpecies.map((obs) => `${obs.speciesCode}-${obs.locId}`)
        );

        const observationsByChannel = recentObservationsWithChannels.reduce(
            (acc, obs) => {
                if (!acc.has(obs.channelId)) {
                    acc.set(obs.channelId, []);
                }
                acc.get(obs.channelId)!.push({
                    species: {
                        code: obs.speciesCode,
                        commonName: obs.comName,
                    },
                    location: {
                        id: obs.locId,
                        name: obs.locName,
                        county: obs.county,
                        isPrivate: obs.isPrivate,
                    },
                    reports: {
                        subId: obs.subId,
                        count: obs.reports,
                        maxCount: obs.howMany,
                        latestTimestamp: new Date(1000 * obs.latestDate),
                        media: {
                            photos: obs.photoCount,
                            audio: obs.audioCount,
                            video: obs.videoCount,
                        },
                        confirmedLastWeek: confirmedSet.has(
                            `${obs.speciesCode}-${obs.locId}`
                        ),
                    },
                });
                return acc;
            },
            new Map<string, GroupedObservation[]>()
        );

        for (const [channelId, observations] of observationsByChannel) {
            await this.sendObservationsToChannel(channelId, observations);
        }
    }
}
