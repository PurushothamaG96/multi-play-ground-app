import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({ path: '.env.local' });
console.log(process.env.DATABASE_URL);

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  migrations: ['src/migrations/**/*.ts'],
  synchronize: false, // Never true in production
});
