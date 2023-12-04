import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './db';

const runMigrations = async () => {
  console.info('Running migrations...');
  await migrate(db, {
    migrationsFolder: 'drizzle',
  });
};

runMigrations();
