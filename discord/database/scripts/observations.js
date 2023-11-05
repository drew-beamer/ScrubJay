import { groupObservationsBySpeciesAndSubId } from '../../utils/ebird/parse-observations.js';

/**
 * Parses through a list of observations and inserts them into the database. If an observation
 * already exists, it will be updated (important for determining if a species has been confirmed
 * since the last update).
 * @param {import('mongodb').MongoClient} client
 * @param {Array<import('../../typedefs').eBirdObservation>} observations
 */
export default async function insertObservationsFromObservations(
  client,
  observations,
  init = false
) {
  const collection = client.db('ScrubJay').collection('Observations');
  const groupedObservations = groupObservationsBySpeciesAndSubId(observations);
  const observationsWithRelevantFields = groupedObservations.map(
    (observation) => ({
      speciesCode: observation.speciesCode,
      comName: observation.comName,
      sciName: observation.sciName,
      locId: observation.locId,
      obsDt: new Date(observation.obsDt),
      howMany: observation.howMany,
      obsValid: observation.obsValid,
      obsReviewed: observation.obsReviewed,
      subId: observation.subId,
      obsId: observation.obsId,
      checklistId: observation.checklistId,
      presenceNoted: observation.presenceNoted,
      hasComments: observation.hasComments,
      evidence: observation.evidence,
    })
  );
  const bulkOps = observationsWithRelevantFields.map((observation) => ({
    updateOne: {
      filter: {
        obsId: observation.obsId,
      },
      update: {
        $set: observation,
        /* Adds a createdOn field if the observation is new, allows for easy detection of 
        observations created in the last 15 minutes, even if the observation is from a previous
        day. */
        $setOnInsert: {
          // Sets the createdOn field to 30 minutes ago if init is true, otherwise sets it to now.
          // This is to prevent the bot from sending notifications for old observations on startup.
          createdOn: init ? new Date(new Date() - 60 * 30 * 1000) : new Date(),
        },
      },
      upsert: true,
    },
  }));
  return collection.bulkWrite(bulkOps);
}
