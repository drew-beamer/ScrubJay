import { integer, text, sqliteTable, real } from 'drizzle-orm/sqlite-core';

export const locations = sqliteTable('locations', {
    id: text('id').primaryKey(),
    county: text('county').notNull(),
    state: text('state').notNull(),
    lat: real('lat').notNull(),
    long: real('long').notNull(),
    name: text('name').notNull(), // hotspot or private location name on ebird
    isPrivate: integer('is_private').notNull()
});

export const observations = sqliteTable('observations', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    comName: text('common_name').notNull(),
    sciName: text('scientific_name').notNull(),
    locId: text('location_id')
        .references(() => locations.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
        .notNull(),
    obsDt: integer('observation_date', { mode: 'timestamp' }).notNull(),
    howMany: integer('how_many').notNull(),
    obsValid: integer('observation_valid', { mode: 'boolean' }).notNull(),
    obsReviewed: integer('observation_reviewed', { mode: 'boolean' }).notNull(),
    subId: text('sub_id').notNull(),
    obsId: text('obs_id').notNull(),
    checklistId: text('checklist_id').notNull(),
    presenceNoted: integer('presenceNoted', { mode: 'boolean' }).notNull(),
    hasComments: integer('has_comments', { mode: 'boolean' }).notNull(),
    evidence: text('evidence', { enum: ['P', 'A', 'V'] }),
});
