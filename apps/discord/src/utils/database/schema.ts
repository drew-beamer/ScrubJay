import { sql } from "drizzle-orm";
import {
	index,
	integer,
	primaryKey,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

import { timezones } from "../timezone";

export const locations = sqliteTable(
	"location",
	{
		id: text("id").primaryKey(),
		county: text("county").notNull(),
		countyCode: text("county_code").notNull(),
		state: text("state").notNull(),
		stateCode: text("state_code").notNull(),
		lat: real("lat").notNull(),
		lng: real("lng").notNull(),
		name: text("name").notNull(),
		isPrivate: integer("is_private", { mode: "boolean" }).notNull(),
		lastUpdated: integer("last_updated", { mode: "timestamp" })
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		index("county_state_code_idx").on(table.countyCode, table.stateCode),
	],
);

export const observations = sqliteTable(
	"observation",
	{
		speciesCode: text("species_code").notNull(),
		subId: text("sub_id").notNull(),
		comName: text("common_name").notNull(),
		sciName: text("scientific_name").notNull(),
		locId: text("location_id")
			.references(() => locations.id, {
				onDelete: "cascade",
				onUpdate: "cascade",
			})
			.notNull(),
		obsDt: integer("observation_date", { mode: "timestamp" }).notNull(),
		howMany: integer("how_many").notNull(),
		obsValid: integer("observation_valid", { mode: "boolean" }).notNull(),
		obsReviewed: integer("observation_reviewed", {
			mode: "boolean",
		}).notNull(),
		presenceNoted: integer("presence_noted", { mode: "boolean" }).notNull(),
		photoCount: integer("photo_count").notNull().default(0),
		audioCount: integer("audio_count").notNull().default(0),
		videoCount: integer("video_count").notNull().default(0),
		hasComments: integer("has_comments", { mode: "boolean" }).notNull(),
		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
		lastUpdated: integer("last_updated", { mode: "timestamp" })
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		primaryKey({ columns: [table.speciesCode, table.subId] }),
		index("obs_created_at_idx").on(table.createdAt),
		index("obs_location_date_idx").on(table.locId, table.obsDt),
		index("obs_review_valid_date_idx").on(
			table.obsReviewed,
			table.obsValid,
			table.obsDt,
		),
	],
);

export const channelSubscriptions = sqliteTable(
	"channel_subscription",
	{
		channelId: text("channel_id").notNull(),
		countyCode: text("county_code").notNull(),
		stateCode: text("state_code").notNull(),
		active: integer("active", { mode: "boolean" }).notNull().default(true),
		lastUpdated: integer("last_updated", { mode: "timestamp" })
			.notNull()
			.default(sql`CURRENT_TIMESTAMP`),
	},
	(table) => [
		primaryKey({
			columns: [table.channelId, table.countyCode, table.stateCode],
		}),
		index("county_state_idx").on(table.countyCode, table.stateCode),
		index("active_state_idx").on(table.active, table.stateCode),
	],
);

/*
    Filtered species are species that are filtered for a given channel.
    This is used to prevent spamming the channel with species that are not of interest.

    This also allows for flexible filtering in the future. If ScrubJay supports multiple
    servers, this will allow for filtering on a per-server/channel basis.
*/
export const filteredSpecies = sqliteTable(
	"filtered_species",
	{
		commonName: text("common_name").notNull(),
		channelId: text("channel_id").notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.commonName, table.channelId] }),
		index("common_name_channel_id_idx").on(table.commonName, table.channelId),
	],
);

export const countyTimezones = sqliteTable(
	"county_timezones",
	{
		countyCode: text("county_code").primaryKey(),
		timezone: text("timezone", { enum: timezones })
			.notNull()
			.default("America/Los_Angeles"),
	},
	(table) => [index("county_code_idx").on(table.countyCode)],
);
