import * as path from 'path';
import { DataSourceOptions } from 'typeorm';
import {
  DB_HOST,
  DB_LOGGING_LEVEL,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_URL,
  DB_USERNAME,
  ENABLE_SSL,
} from '../../../config/environments/database';

const connection: DataSourceOptions = {
  type: 'postgres',
  url: DB_URL,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  logging: DB_LOGGING_LEVEL,
  logNotifications: true,
  entities: [path.resolve(__dirname, '..', 'entities', '*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, '..', 'migrations', '*')],
  ssl: ENABLE_SSL ? { rejectUnauthorized: false } : false,
};

export { connection };
