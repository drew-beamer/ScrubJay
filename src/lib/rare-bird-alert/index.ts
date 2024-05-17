import { Client } from 'discord.js';
import { CronJob } from 'cron';
import {
    RegionChannelMapping,
    CountyRegionMapping,
    RareBirdAlertConfig,
} from './types';
import { MongoClient } from 'mongodb';
import { fetchRareObservations } from '../utils/ebird/ebird';
import insertObservations from '../utils/mongo/scripts/observations';
import {
    filterObservations,
    parseFilter,
    separateObservationsByRegion,
} from '../utils/ebird/parse-observations';
import insertLocationsFromObservations from '../utils/mongo/scripts/locations';
import getNewNotableObservations, {
    RecentNotableObservation,
} from '../utils/mongo/aggregation/get-sightings';
import { generateEmbeds, sendEmbeds } from './embeds';

export class RareBirdAlert<Regions extends string> {
    private discordClient: Client;
    private dbClient: MongoClient;
    private regionCode: string;
    private statewideChannels: string[];
    private filteredSpecies: Set<string>;
    private regionChannels: RegionChannelMapping<Regions>;
    private countyRegions: CountyRegionMapping<Regions>;
    private cronJob: CronJob;

    constructor(
        discordClient: Client,
        dbClient: MongoClient,
        config: RareBirdAlertConfig<Regions>
    ) {
        this.discordClient = discordClient;
        this.dbClient = dbClient;
        this.regionCode = config.regionCode;
        this.statewideChannels = config.statewideChannels;
        this.filteredSpecies = parseFilter(config.filteredSpecies);
        this.regionChannels = config.regionChannels;
        this.countyRegions = config.countyRegions;

        // Run initial fetch to prevent mass send
        fetchRareObservations(this.regionCode).then(async (eBirdResult) => {
            await insertObservations(this.dbClient, eBirdResult, true);
            await insertLocationsFromObservations(this.dbClient, eBirdResult);
        });

        console.log('Database populated.');

        this.cronJob = this.initializeCron();

        if (this.cronJob) {
            this.cronJob.start();
        }
    }

    private initializeCron() {
        return new CronJob('0 */5 * * * *', async () => {
            console.log(`Running Rare Bird Alert for ${this.regionCode}`);
            const eBirdResult = await fetchRareObservations(this.regionCode);
            try {
                await insertObservations(this.dbClient, eBirdResult, true);
                await insertLocationsFromObservations(
                    this.dbClient,
                    eBirdResult
                );

                const recentNotableObservations =
                    await getNewNotableObservations(this.dbClient);
                this.dispatchStatewideObservations(recentNotableObservations);
                this.dispatchObservationsToRegions(recentNotableObservations);
            } catch (err) {
                console.error(err);
            }

            console.log('Fetch succeeded');
        });
    }

    private dispatchStatewideObservations(
        newObservations: RecentNotableObservation[]
    ) {
        const statewideNotableObservations = filterObservations(
            newObservations,
            this.filteredSpecies
        );
        const embeds = generateEmbeds(statewideNotableObservations);
        if (embeds.length >= 1) {
            sendEmbeds(this.discordClient, embeds, this.statewideChannels);
        }
        return embeds.length;
    }

    private dispatchObservationsToRegions(
        newObservations: RecentNotableObservation[]
    ) {
        const observationsByRegion = separateObservationsByRegion(
            newObservations,
            this.countyRegions
        );
        Array.from(observationsByRegion.keys()).forEach((region) => {
            const regionObs = observationsByRegion.get(region);
            if (regionObs) {
                const regionEmbeds = generateEmbeds(regionObs);
                if (regionEmbeds.length >= 1) {
                    sendEmbeds(
                        this.discordClient,
                        regionEmbeds,
                        this.regionChannels[region]
                    );
                }
            }
        });
    }

    private terminateCron() {
        this.cronJob.stop();
    }
}
