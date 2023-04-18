import { DataSource } from 'typeorm';
import { connection } from './src/infrastructure/db/connection';

export const AppDataSource = new DataSource({ ...connection });
