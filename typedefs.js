/**
 * @namespace eBirdTypes
 */

/**
 * @namespace cronTypes
 */

/**
 * @typedef {Object} eBirdObservation
 * @property {string} speciesCode - The species code of the observation.
 * @property {string} comName - The common name of the species.
 * @property {string} sciName - The scientific name of the species.
 * @property {string} locId - The location ID of the observation.
 * @property {string} locName - The location name of the observation.
 * @property {number} obsDt - The date of the observation.
 * @property {number} howMany - The number of individuals observed.
 * @property {boolean} obsValid - Whether the observation is valid.
 * @property {boolean} obsReviewed - Whether the observation has been reviewed.
 * @property {boolean} locationPrivate - Whether the location is private.
 * @property {string} subId - The sub ID of the observation.
 * @property {string} subnational2Code - The subnational2 code of the observation.
 * @property {string} subnational2Name - The subnational2 name of the observation.
 * @property {string} subnational1Code - The subnational1 code of the observation.
 * @property {string} subnational1Name - The subnational1 name of the observation.
 * @property {string} countryCode - The country code of the observation.
 * @property {string} countryName - The country name of the observation.
 * @property {string} userDisplayName - The display name of the user who made the observation.
 * @property {string} obsId - The ID of the observation.
 * @property {string} checklistId - The ID of the checklist.
 * @property {boolean} presenceNoted - Whether the presence of the species was noted.
 * @property {boolean} hasComments - Whether the observation has comments.
 * @property {string | null} evidence - 'P' if the observation is a photo, 'A' if it is an audio recording, 'V' if it is a video recording, 'X' if it is a checklist.
 * @property {string} firstName - The first name of the user who made the observation.
 * @property {string} lastName - The last name of the user who made the observation.
 * @property {boolean} hasRichMedia - Whether the observation has rich media.
 * @memberof eBirdTypes
 */

/**
 * @typedef RecentNotableObservation
 * @property {object} _id - The ID of the observation.
 * @property {string} _id.comName - The common name of the species.
 * @property {string} _id.locId - The location ID of the observation.
 * @property {string} mostRecentTime - The most recent time of the observation (UTC).
 * @property {Array<string>} newChecklists - The sub IDs of the new checklists containing the notable observation.
 * @property {Array<number>} howMany - The number of individuals observed.
 * @property {object} location - The location of the observation.
 * @property {string} location._id - The ID of the location.
 * @property {string} location.county - The county of the location.
 * @property {boolean} location.isPrivate - Whether the location is private.
 * @property {number} location.lat - The latitude of the location.
 * @property {number} location.lng - The longitude of the location.
 * @property {string} location.name - The name of the location.
 * @property {string} location.state - The state of the location.
 * @property {Array<string>} evidence - The evidence of the observation.
 * @property {number} numNewObs - The number of new observations.
 * @property {boolean} previousConfirmed - Whether the species has been previously confirmed at the location in the last week.
 * @memberof cronTypes
 */

export {};
