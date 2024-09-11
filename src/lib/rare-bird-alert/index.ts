import { Client } from 'discord.js';
import {
    RegionChannelMapping,
    CountyRegionMapping,
    RareBirdAlertConfig,
} from './types';
import { fetchRareObservations } from '../utils/ebird/ebird';
import insertObservations from '../utils/db/scripts/observations';
import {
    parseFilter,
} from './parse-observations';
import insertLocationsFromObservations from '../utils/db/scripts/locations';

export class RareBirdAlert<Regions extends string> {
    private discordClient: Client;
    private regionCode: string;
    private statewideChannels: string[];
    private filteredSpecies: Set<string>;
    private regionChannels: RegionChannelMapping<Regions>;
    private countyRegions: CountyRegionMapping<Regions>;
    // private cronJob: CronJob;

    constructor(
        discordClient: Client,
        config: RareBirdAlertConfig<Regions>
    ) {
        this.discordClient = discordClient;
        this.regionCode = config.regionCode;
        this.statewideChannels = config.statewideChannels;
        this.filteredSpecies = parseFilter(config.filteredSpecies);
        this.regionChannels = config.regionChannels;
        this.countyRegions = config.countyRegions;

        // Run initial fetch to prevent mass send
        fetchRareObservations(this.regionCode).then(async (eBirdResult) => {
            await insertLocationsFromObservations(eBirdResult);
            await insertObservations(eBirdResult, true);
        });

        console.log('Database populated.');

        // this.cronJob = this.initializeCron();

        // if (this.cronJob) {
        //     this.cronJob.start();
        // }
    }

    // private initializeCron() {
    //     return new CronJob('0 */15 * * * *', async () => {
    //         console.log(`Running Rare Bird Alert for ${this.regionCode}`);
    //         fetchRareObservations(this.regionCode)
    //             .then((eBirdResult) => {
    //                 try {
    //                     const obsInsert = insertObservations(
    //                         eBirdResult,
    //                         false
    //                     );
    //                     return Promise.all([obsInsert]);
    //                 } catch (err) {
    //                     console.error(
    //                         'Error: could not insert observations or locations'
    //                     );
    //                 }
    //             })
    //             .then(
    //                 async () => await getNewNotableObservations(this.dbClient)
    //             )
    //             .then((recentNotableObservations) => {
    //                 this.dispatchStatewideObservations(
    //                     recentNotableObservations
    //                 );
    //                 this.dispatchObservationsToRegions(
    //                     recentNotableObservations
    //                 );
    //             });

    //         console.log('Fetch succeeded');
    //     });
    // }

    /*
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
        */
}
