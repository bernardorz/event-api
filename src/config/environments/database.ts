import { LoggerOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ENABLE_SSL = process.env.ENABLE_SSL
  ? process.env.ENABLE_SSL === 'true'
  : false;
const DB_URL = process.env.DB_URL || process.env.DATABASE_URL;
const DB_HOST = process.env.DB_COMPOSE_HOST || process.env.DB_HOST;
const DB_PORT = Number(process.env.EVENT_DB_PORT);
const DB_USERNAME = process.env.EVENT_DB_USER;
console.log(process.env.EVENT_DB_USER);
const DB_PASSWORD = process.env.EVENT_DB_PASSWORD;
const DB_NAME = process.env.EVENT_DB_DATABASE;
const DB_LOGGING_LEVEL = process.env.DB_LOGGING_LEVEL?.split(
  ',',
) as LoggerOptions;

export {
  ENABLE_SSL,
  DB_URL,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_LOGGING_LEVEL,
};
