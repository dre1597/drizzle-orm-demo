import 'dotenv/config';

import { defineConfig } from 'drizzle-kit';

console.log(process.env.DATABASE_USER);

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER,
    port: Number(process.env.DATABASE_PORT) || 5432,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'drizzle_demo',
  }
});
