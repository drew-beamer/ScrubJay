import express from "express";

import { regions } from "./regions";
import { species } from "./species";
const app = express();
const PORT = 8080;

const myRBA: Record<string, eBirdObservation[]> = {};

export interface eBirdObservation {
	comName: string;
	sciName: string;
	speciesCode: string;
	locId: string;
	locName: string;
	lat: number;
	lng: number;
	obsDt: string;
	howMany: number;
	obsValid: boolean;
	obsReviewed: boolean;
	locationPrivate: boolean;
	subId: string;
	countryCode: string;
	countryName: string;
	subnational1Code: string;
	subnational1Name: string;
	subnational2Code: string;
	subnational2Name: string;
	firstName: string;
	lastName: string;
	userDisplayName: string;
	obsId: string;
	checklistId: string;
	presenceNoted: boolean;
	hasRichMedia: boolean;
	hasComments: boolean;
	evidence: "P" | "A" | "V" | null;
}

function addRandomizedObs(regionCode: string): eBirdObservation | undefined {
	const region = regions[regionCode as keyof typeof regions];
	if (!region) {
		return;
	}

	const randomSpecies = species[Math.floor(Math.random() * species.length)];
	const randomSubregion = Object.keys(region.counties)[
		Math.floor(Math.random() * Object.keys(region.counties).length)
	];
	if (!randomSpecies || !randomSubregion) {
		return;
	}

	const obs = {
		...randomSpecies,
		locId: crypto.randomUUID(),
		locName: "A random location",
		lat: 0.0,
		lng: 0.0,
		subId: crypto.randomUUID(),
		obsDt: new Date().toISOString(),
		howMany: Math.floor(Math.random() * 10) + 1,
		obsValid: true,
		obsReviewed: true,
		locationPrivate: false,
		subnational1Code: region.code,
		subnational1Name: region.name,
		subnational2Code:
			region.counties[randomSubregion as keyof typeof region.counties],
		subnational2Name: randomSubregion,
		countryCode: "US",
		countryName: "United States",
		firstName: "John",
		lastName: "Doe",
		userDisplayName: "John Doe",
		obsId: crypto.randomUUID(),
		checklistId: crypto.randomUUID(),
		presenceNoted: true,
		hasRichMedia: false,
		hasComments: false,
		evidence: null,
	};

	myRBA[regionCode] = myRBA[regionCode] || [];
	myRBA[regionCode].push(obs);

	return obs;
}

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Scrubjay Mock API Server for Development");
});

app.get("/health", (req, res) => {
	res.send("ok");
});

app.get("/v2/data/obs/:regionCode/recent/notable", (req, res) => {
	const { regionCode } = req.params;

	if (!regionCode) {
		res.status(400).json({ error: "Region code is required" });
		return;
	}

	const region = regions[regionCode as keyof typeof regions];
	if (!region) {
		res.status(404).json({ error: "Region not found" });
		return;
	}

	addRandomizedObs(regionCode);

	res.status(200).send(myRBA[regionCode]);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
