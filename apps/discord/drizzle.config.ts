import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'sqlite',
    schema: './src/utils/database/schema.ts',
    out: './src/utils/database/drizzle',
    dbCredentials: {
        url: process.env.DATABASE_URL || '/etc/dbs/scrubjay/scrubjay.db',
    },
});
