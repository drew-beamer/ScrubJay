/* eslint-disable no-underscore-dangle */

import { MongoClient, ObjectId } from 'mongodb';
import { eBirdObservation } from '../../ebird/types';

/**
 * Inserts and updates location-related information into the database provided an array of
 * observation data
 *
 * @param client
 * @param observations
 */
export default async function insertLocationsFromObservations(
    client: MongoClient,
    observations: eBirdObservation[]
) {
    const collection = client.db('ScrubJay').collection('Locations');

    // Gets relevant location information from observations
    const locationInformation = observations.map((observation) => ({
        _id: observation.locId,
        county: observation.subnational2Name,
        state: observation.subnational1Name,
        lat: observation.lat,
        lng: observation.lng,
        name: observation.locName,
        isPrivate: observation.locationPrivate,
    }));

    // Creates a bulk operation for each location
    const bulkOps = locationInformation.map((location) => ({
        updateOne: {
            filter: {
                _id: location._id as unknown as ObjectId,
            },
            update: {
                $set: location,
            },
            upsert: true,
        },
    }));

    return collection.bulkWrite(bulkOps);
}
