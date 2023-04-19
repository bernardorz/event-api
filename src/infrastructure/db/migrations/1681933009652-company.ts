import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class Company1681933009652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'trading_name',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'document',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'phone',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'state',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'zipcode',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company');
  }
}
