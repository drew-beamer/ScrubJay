import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    DISCORD_TOKEN: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    EBIRD_TOKEN: z.string(),
    EBIRD_BASE_URL: z.string().optional().default('https://api.ebird.org/'),
    REACTION_THRESHOLD: z.string().optional().default('3').transform(Number),
});

export const config = envSchema.parse(process.env);
