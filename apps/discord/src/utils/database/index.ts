import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database(
	process.env.DATABASE_URL || "/etc/dbs/scrubjay/scrubjay.db",
);
const db = drizzle(sqlite);

export default db;
