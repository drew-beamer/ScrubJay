/**
 * @fileoverview Provides functions for fetching data from and interacting with the eBird API.
 */

import { config } from "@/config";

import "dotenv/config";
import {
	ebirdObservationResponseSchema,
	type EBirdObservationResponse,
} from "./schema";

// Headers to be used across all requests
const myHeaders = new Headers();
myHeaders.append("X-eBirdApiToken", config.EBIRD_TOKEN);

const requestOptions = {
	method: "GET",
	headers: myHeaders,
	redirect: "follow",
} satisfies RequestInit;

function getFetchRareObservationsUrl(regionCode: string) {
	return new URL(
		`/v2/data/obs/${regionCode}/recent/notable?detail=full&back=7`,
		config.EBIRD_BASE_URL,
	);
}

/**
 * Fetches recent observations of notable species from eBird API. Gets all observations from the
 * previous seven days.
 *
 * @param regionCode region code of the region to fetch observations from, ex: US-CA
 * @param onError callback function to be called on error
 * @returns a list of observations
 */
export async function fetchRareObservations(
	regionCode: string,
): Promise<EBirdObservationResponse> {
	const url = getFetchRareObservationsUrl(regionCode);
	console.log(`Fetching observations from ${url}`);
	return await fetch(url, requestOptions).then(async (response) => {
		if (response.status === 200) {
			const observations = await response.json();
			try {
				return ebirdObservationResponseSchema.parse({
					type: "success",
					observations,
				});
			} catch (err) {
				return ebirdObservationResponseSchema.parse({
					type: "error",
					message: `Error parsing observations: ${err}`,
				});
			}
		}
		return ebirdObservationResponseSchema.parse({
			type: "error",
			message: `eBird API threw status ${response.status}`,
		});
	});
}
