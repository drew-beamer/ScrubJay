import { MongoClient } from 'mongodb';
import { eBirdObservation } from '../../ebird/types.js';
import moment from 'moment';
import 'moment-timezone';
import db from '../../../database/index.js';
import { observations } from '../../../database/schema.js';
import { sql } from 'drizzle-orm';

/**
 * Parses through a list of observations and inserts them into the database. If an observation
 * already exists, it will be updated (important for determining if a species has been confirmed
 * since the last update).
 * @param client
 * @param observations
 */
export default async function insertObservations(
    rawObservations: eBirdObservation[],
    init = false
) {
    const relevantObservations = rawObservations.map((observation) => ({
        comName: observation.comName,
        sciName: observation.sciName,
        speciesCode: observation.speciesCode,
        locId: observation.locId,
        obsDt: new Date(
            moment.tz(observation.obsDt, 'America/Los_Angeles').format()
        ),
        createdDt: init
        ? new Date(new Date().valueOf() - 60 * 30 * 1000)
        : new Date(),
        howMany: observation.howMany,
        obsValid: observation.obsValid,
        obsReviewed: observation.obsReviewed,
        subId: observation.subId,
        presenceNoted: observation.presenceNoted,
        hasComments: observation.hasComments,
        evidence: observation.evidence
    }));

    return db.insert(observations).values(relevantObservations).onConflictDoUpdate({
        target: [observations.subId, observations.speciesCode, observations.evidence],
        set: {
            howMany: sql`excluded.how_many`,
            locId: sql`excluded.location_id`,
            obsValid: sql`observation_valid`,
            obsReviewed: sql`excluded.observation_reviewed`,
            presenceNoted: sql`excluded.presence_noted`,
            hasComments: sql`excluded.has_comments`
        }
    });
}
