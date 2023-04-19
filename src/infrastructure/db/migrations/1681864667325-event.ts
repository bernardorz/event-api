import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class Event1681864667325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '124',
          }),
          new TableColumn({
            name: 'start_at',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'end_at',
            type: 'timestamp',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          }),
          new TableColumn({
            name: 'account_id',
            type: 'bigint',
            isNullable: false,
          }),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'event',
      new TableForeignKey({
        name: 'event_account_id',
        columnNames: ['account_id'],
        referencedTableName: 'account',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('event', 'event_account_id');
    await queryRunner.dropTable('event');
  }
}
