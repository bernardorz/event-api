import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class Roles1681909455247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'role',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'initials',
            type: 'varchar',
            length: '20',
            isUnique: true,
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar',
            length: '95',
            isNullable: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('role');
  }
}
