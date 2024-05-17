import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, EBIRD_TOKEN, DB_URI } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !EBIRD_TOKEN || !DB_URI) {
    throw new Error("Missing environmental variables");
}

export const config = {
    DISCORD_TOKEN,
    DISCORD_CLIENT_ID,
    EBIRD_TOKEN,
    DB_URI
}