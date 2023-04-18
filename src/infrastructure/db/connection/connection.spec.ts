import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../../ormconfig';
const databaseName = `test_${randomBytes(8).toString('hex')}`;
let connection: DataSource;

const databaseIntegrationSetup = async () => {
  try {
    connection = await AppDataSource.initialize();
    await AppDataSource.query(`CREATE DATABASE "${databaseName}"`);
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }

  return connection;
};

const closeDatabaseIntegrationConnections = async () => {
  try {
    await connection.query(`DROP DATABASE "${databaseName}"`);
    await connection.destroy();
  } catch (err) {
    process.stderr.write(
      `${err instanceof Error ? err.stack : JSON.stringify(err)}\n`,
    );
    process.exit(1);
  }
};

describe('Db tests', () => {
  let app;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const databaseConnection = await databaseIntegrationSetup();

    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(databaseConnection.options)],
    }).compile();

    app = module.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await closeDatabaseIntegrationConnections();
  });

  it('app should be defined', async () => {
    expect(app).toBeDefined();
  });

  it('test database should be create ', async () => {
    expect(connection).toBeDefined();
  });
});
