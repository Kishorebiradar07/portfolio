import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

let dbInstance: PostgresJsDatabase<typeof schema> | null = null;

if (connectionString) {
  try {
    const client = postgres(connectionString, { prepare: false });
    dbInstance = drizzle(client, { schema });
  } catch (err) {
    console.error('Failed to initialize database client:', err);
  }
} else {
  console.log('DATABASE_URL is not set. Telemetry DB logging is disabled.');
}

export const db = dbInstance;
