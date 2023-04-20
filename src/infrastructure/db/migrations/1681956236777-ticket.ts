import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class Ticket1681956236777 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ticket',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'type',
            type: 'varchar(124)',
          }),
          new TableColumn({
            name: 'description',
            type: 'varchar(124)',
          }),
          new TableColumn({
            name: 'available_quantity',
            type: 'bigint',
          }),
          new TableColumn({
            name: 'price',
            type: 'decimal',
          }),
          new TableColumn({
            name: 'event_id',
            type: 'bigint',
            isNullable: true,
          }),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ticket',
      new TableForeignKey({
        name: 'ticket_event_fk',
        columnNames: ['event_id'],
        referencedTableName: 'event',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('ticket', 'ticket_event_fk');
    await queryRunner.dropTable('ticket');
  }
}
