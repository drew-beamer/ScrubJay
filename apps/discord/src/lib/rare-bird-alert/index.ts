import type { Client } from 'discord.js';
import { CronJob } from 'cron';
import db from '../database';
import { locations, observations, states } from '../database/schema';
import { eq, gte, sql } from 'drizzle-orm';
import { fetchRareObservations } from '../utils/ebird/ebird';
import type { eBirdObservation } from '../utils/ebird/types';

export class RareBirdAlert {
    private job: CronJob;

    constructor(private client: Client) {
        // Set up the cron job to run every 5 minutes
        this.job = new CronJob('*/5 * * * *', async () => {
            await this.run();
        });
        this.job.start(); // Start the cron job
    }

    /**
     * Fetches all active states from the database.
     */
    private async getActiveStates() {
        const statesToFetch = await db
            .select({ id: states.id })
            .from(states)
            .where(eq(states.isActive, true));
        return statesToFetch.map((state) => state.id);
    }

    /**
     * Fetches all rare observations for the given states.
     */
    private async fetchRareObservations(states: string[]) {
        const rareObservationsPromises = states.map(
            (state) => fetchRareObservations(state) // Fetch all observations
        );
        const rareObservations = (
            await Promise.all(rareObservationsPromises)
        ).flat();

        return rareObservations;
    }

    private async upsertLocations(rawLocations: eBirdObservation[]) {
        const locationsToUpsert = rawLocations.map((observation) => ({
            id: observation.locId,
            county: observation.subnational2Name,
            state: observation.subnational1Code,
            name: observation.locName,
            lat: observation.lat,
            lng: observation.lng,
            isPrivate: observation.locationPrivate,
            lastUpdated: new Date(),
        }));

        await db
            .insert(locations)
            .values(locationsToUpsert)
            .onConflictDoUpdate({
                target: [locations.id],
                set: {
                    county: sql`excluded.county`,
                    state: sql`excluded.state`,
                    name: sql`excluded.name`,
                    lat: sql`excluded.lat`,
                    lng: sql`excluded.lng`,
                    isPrivate: sql`excluded.isPrivate`,
                    lastUpdated: sql`excluded.lastUpdated`,
                },
            });
    }

    private async upsertObservations(rawObservations: eBirdObservation[]) {
        const observationsToUpsert = rawObservations.map((observation) => ({
            speciesCode: observation.speciesCode,
            subId: observation.subId,
            comName: observation.comName,
            sciName: observation.sciName,
            locId: observation.locId,
            obsDt: new Date(observation.obsDt),
            howMany: observation.howMany,
            obsValid: observation.obsValid,
            obsReviewed: observation.obsReviewed,
            presenceNoted: observation.presenceNoted,
            hasComments: observation.hasComments,
            createdAt: new Date(),
            lastUpdated: new Date(),
        }));

        await db
            .insert(observations)
            .values(observationsToUpsert)
            .onConflictDoUpdate({
                target: [observations.subId, observations.speciesCode],
                set: {
                    comName: sql`excluded.comName`,
                    sciName: sql`excluded.sciName`,
                    locId: sql`excluded.locId`,
                    obsDt: sql`excluded.obsDt`,
                    howMany: sql`excluded.howMany`,
                    obsValid: sql`excluded.obsValid`,
                    obsReviewed: sql`excluded.obsReviewed`,
                    presenceNoted: sql`excluded.presenceNoted`,
                    hasComments: sql`excluded.hasComments`,
                    lastUpdated: sql`excluded.lastUpdated`,
                },
            });
    }

    async run() {
        console.log('Rare bird alert is running');
        const states = await this.getActiveStates();
        const rareObservations = await this.fetchRareObservations(states);
        // Upsert the locations into the database
        await this.upsertLocations(rareObservations);
        // Upsert the recent observations into the database
        await this.upsertObservations(rareObservations);

        const recentObservations = await db
            .select()
            .from(observations)
            .where(
                gte(
                    observations.createdAt,
                    new Date(Date.now() - 15 * 60 * 1000)
                )
            );

        console.log(
            `Found ${recentObservations.length} recent observations to send to discord`
        );

        console.log(
            'Observations:',
            recentObservations.map(
                (observation) => `${observation.subId} - ${observation.comName}`
            )
        );
    }
}
