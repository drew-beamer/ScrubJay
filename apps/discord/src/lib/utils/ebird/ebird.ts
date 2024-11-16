/**
 * @fileoverview Provides functions for fetching data from and interacting with the eBird API.
 */

import { config } from '../../../config';
import 'dotenv/config';
import testData from './sampledata.json';
import { eBirdObservation } from './types';

// Headers to be used across all requests
const myHeaders = new Headers();
myHeaders.append('X-eBirdApiToken', config.EBIRD_TOKEN);

/**
 * Fetches recent observations of notable species from eBird API. Gets all observations from the
 * previous seven days.
 *
 * @param regionCode region code of the region to fetch observations from, ex: US-CA
 * @param onError callback function to be called on error
 * @returns a list of observations
 */
export async function fetchRareObservations(
    regionCode: string
): Promise<eBirdObservation[]> {
    console.log('Fetching from eBird');

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };
    return await fetch(
        `https://api.ebird.org/v2/data/obs/${regionCode}/recent/notable?detail=full&back=7`,
        requestOptions
    ).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error(`eBird API threw status ${response.status}`);
        }
    });
}

/**
 * Creates a set of unique identifiers for observations.
 * @param observations list of observations
 * @returns a set of unique identifiers for observations
 */
export function getObservationSet(observations: eBirdObservation[]) {
    const observationSet = new Set();
    observations.forEach((observation) => {
        observationSet.add(`${observation.speciesCode}+${observation.subId}`);
    });
    return observationSet;
}
