import { RareBirdAlertFilter } from '../filters/types';
import Observation from '../models/observation';
import { CountyRegionMapping } from './types';
import { RecentNotableObservation } from '../utils/mongo/aggregation/get-sightings';
import { eBirdObservation } from '../utils/ebird/types';

type GroupedObservation = Omit<Observation, 'evidence'> & {
    evidence: ('P' | 'A' | 'V' | null)[];
};

/**
 * Groups observations by species and subId.
 * @param observations - Array of observations
 * @return array of grouped observations
 */
export function groupObservationsBySpeciesAndSubId(
    observations: eBirdObservation[]
): GroupedObservation[] {
    const observationsGroupedBySubId = new Map();
    const observationsAdded = new Set();
    observations.forEach((observation) => {
        const key = `${observation.speciesCode}+${observation.subId}`;
        if (!observationsAdded.has(key)) {
            observationsGroupedBySubId.set(key, {
                ...observation,
                evidence: [observation.evidence],
            });
            observationsAdded.add(key);
        } else {
            const existingObservation = observationsGroupedBySubId.get(key);
            existingObservation.evidence.push(observation.evidence);
        }
    });
    return Array.from(observationsGroupedBySubId.values());
}

/**
 * Parses filter data to get a set of species to filter by.
 * @param filterData - Array of filter data.
 * @returns filteredSpecies - Set of species to filter on.
 */
export function parseFilter(filterData: RareBirdAlertFilter) {
    const filteredSpecies = new Set<string>();
    filterData.forEach((species) => {
        filteredSpecies.add(species.species);
    });
    return filteredSpecies;
}

/**
 * Filters out observations that are in the specified filter.
 * @param {RecentNotableObservation} observations - Array of observations
 * @param filter - Set of species to filter on.
 * @returns filteredObservations - Array of filtered observations
 */
export function filterObservations(
    observations: RecentNotableObservation[],
    filter: Set<string>
): RecentNotableObservation[] {
    return observations.filter(
        (observation) => !filter.has(observation._id.comName)
    );
}

/**
 *
 * @param newObservations - Array of the new observations
 * @param region - Region code of the region to separate observations by. Ex: US-CA.
 * @returns map of regions and observations
 */
export function separateObservationsByRegion<Regions extends string>(
    newObservations: RecentNotableObservation[],
    countyRegions: CountyRegionMapping<Regions>
): Map<Regions, RecentNotableObservation[]> {
    const separatedObservations = new Map();
    newObservations.forEach((observation) => {
        const observedCounty = observation.location.county;
        const key = countyRegions[observedCounty];
        if (separatedObservations.has(key)) {
            separatedObservations.get(key).push(observation);
        } else {
            separatedObservations.set(key, [observation]);
        }
    });
    return separatedObservations;
}
