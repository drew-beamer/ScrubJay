import { eBirdObservation } from '../../ebird/types';
import db from '../../../database';
import { locations } from '../../../database/schema';
import { sql } from 'drizzle-orm';

/**
 * Inserts and updates location-related information into the database provided an array of
 * observation data
 *
 * @param client
 * @param observations
 */
export default async function insertLocationsFromObservations(
    observations: eBirdObservation[]
) {
    // Gets relevant location information from observations
    const locationInformation = observations.map((observation) => ({
        id: observation.locId,
        county: observation.subnational2Name,
        state: observation.subnational1Name,
        lat: observation.lat,
        lng: observation.lng,
        name: observation.locName,
        isPrivate: observation.locationPrivate,
    }));

    return db
        .insert(locations)
        .values(locationInformation)
        .onConflictDoUpdate({
            target: locations.id,
            set: {
                county: sql`excluded.county`,
                state: sql`excluded.state`,
                lat: sql`excluded.lat`,
                lng: sql`excluded.lng`,
                name: sql`excluded.name`,
                isPrivate: sql`excluded.is_private`,
            },
        });
}
