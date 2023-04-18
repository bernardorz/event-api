import { MigrationInterface, QueryRunner, TableColumn, Table } from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class Account1681846329247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '95',
          }),
          new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '120',
            isUnique: true,
            isNullable: true,
          }),
          new TableColumn({
            name: 'password',
            type: 'varchar',
            length: '195',
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
    await queryRunner.dropTable('account');
  }
}
