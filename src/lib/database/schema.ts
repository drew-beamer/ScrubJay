import { integer, text, sqliteTable, real, primaryKey } from 'drizzle-orm/sqlite-core';

export const locations = sqliteTable('locations', {
    id: text('id').primaryKey(),
    county: text('county').notNull(),
    state: text('state').notNull(),
    lat: real('lat').notNull(),
    lng: real('lng').notNull(),
    name: text('name').notNull(), // hotspot or private location name on ebird
    isPrivate: integer('is_private', { mode: 'boolean' }).notNull()
});

export const observations = sqliteTable('observations', {
    comName: text('common_name').notNull(),
    sciName: text('scientific_name').notNull(),
    speciesCode: text('species_code').notNull(),
    locId: text('location_id')
        .references(() => locations.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
        .notNull(),
    obsDt: integer('observation_date', { mode: 'timestamp' }).notNull(),
    createdDt: integer('creation_date', {mode: 'timestamp'}).notNull(),
    howMany: integer('how_many').notNull(),
    obsValid: integer('observation_valid', { mode: 'boolean' }).notNull(),
    obsReviewed: integer('observation_reviewed', { mode: 'boolean' }).notNull(),
    subId: text('sub_id').notNull(),
    presenceNoted: integer('presence_noted', { mode: 'boolean' }).notNull(),
    hasComments: integer('has_comments', { mode: 'boolean' }).notNull(),
    evidence: text('evidence', { enum: ['P', 'A', 'V'] }),

}, (table) => ({
    pk: primaryKey({ columns: [table.speciesCode, table.subId, table.evidence]})
}));
