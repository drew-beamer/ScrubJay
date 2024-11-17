import {
    integer,
    text,
    sqliteTable,
    real,
    primaryKey,
    foreignKey,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const locations = sqliteTable('location', {
    id: text('id').primaryKey(),
    county: text('county').notNull(),
    state: text('state').notNull(),
    lat: real('lat').notNull(),
    lng: real('lng').notNull(),
    name: text('name').notNull(), // hotspot or private location name on ebird
    isPrivate: integer('is_private', { mode: 'boolean' }).notNull(),
    lastUpdated: integer('last_updated', { mode: 'timestamp' })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
});

export const observations = sqliteTable(
    'observation',
    {
        speciesCode: text('species_code').notNull(),
        subId: text('sub_id').notNull(),
        comName: text('common_name').notNull(),
        sciName: text('scientific_name').notNull(),
        locId: text('location_id')
            .references(() => locations.id, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            })
            .notNull(),
        obsDt: integer('observation_date', { mode: 'timestamp' }).notNull(),
        howMany: integer('how_many').notNull(),
        obsValid: integer('observation_valid', { mode: 'boolean' }).notNull(),
        obsReviewed: integer('observation_reviewed', {
            mode: 'boolean',
        }).notNull(),
        presenceNoted: integer('presence_noted', { mode: 'boolean' }).notNull(),
        hasComments: integer('has_comments', { mode: 'boolean' }).notNull(),
        createdAt: integer('created_at', { mode: 'timestamp' })
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
        lastUpdated: integer('last_updated', { mode: 'timestamp' })
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.speciesCode, table.subId] }),
    })
);

export const observationMedia = sqliteTable(
    'observation_media',
    {
        id: text('id').primaryKey(),
        observationSpeciesCode: text('observation_species_code').notNull(),
        observationSubId: text('observation_sub_id').notNull(),
        evidence: text('evidence', { enum: ['P', 'A', 'V'] }).notNull(),
        lastUpdated: integer('last_updated', { mode: 'timestamp' })
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => ({
        foreignKey: foreignKey({
            columns: [table.observationSpeciesCode, table.observationSubId],
            foreignColumns: [observations.speciesCode, observations.subId],
        }),
    })
);

export const states = sqliteTable('state', {
    id: text().primaryKey(),
    name: text('name').notNull(),
    isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
});

export const regions = sqliteTable('region', {
    regionCode: text('region_code').primaryKey(),
    regionName: text().notNull(),
});

export const counties = sqliteTable(
    'county',
    {
        countyName: text().notNull(),
        stateCode: text()
            .notNull()
            .references(() => states.id, {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.countyName, table.stateCode] }),
    })
);

export const countyRegions = sqliteTable(
    'county_region',
    {
        countyName: text('county_name'),
        stateCode: text('state_code'),
        regionCode: text('region_code').references(() => regions.regionCode, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }),
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.countyName, table.stateCode, table.regionCode],
        }),
        countyForeignKey: foreignKey({
            columns: [table.countyName, table.stateCode],
            foreignColumns: [counties.countyName, counties.stateCode],
        })
            .onDelete('cascade')
            .onUpdate('cascade'),
    })
);

export const channelSubscriptions = sqliteTable('channel_subscription', {
    channelId: text('channel_id').primaryKey(),
    regionCode: text('region_code').references(() => regions.regionCode, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    stateId: text('state_id').references(() => states.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    active: integer('active', { mode: 'boolean' }).notNull().default(true),
});

/*
    Filtered species are species that are filtered for a given channel.
    This is used to prevent spamming the channel with species that are not of interest.

    This also allows for flexible filtering in the future. If ScrubJay supports multiple
    servers, this will allow for filtering on a per-server/channel basis.
*/
export const filteredSpecies = sqliteTable(
    'filtered_species',
    {
        speciesCode: text('species_code'),
        channelId: text('channel_id').references(
            () => channelSubscriptions.channelId,
            {
                onDelete: 'cascade',
                onUpdate: 'cascade',
            }
        ),
        lastUpdated: integer('last_updated', { mode: 'timestamp' })
            .notNull()
            .default(sql`CURRENT_TIMESTAMP`),
    },
    (table) => ({
        pk: primaryKey({
            columns: [table.speciesCode, table.channelId],
        }),
    })
);
