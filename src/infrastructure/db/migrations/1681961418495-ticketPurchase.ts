import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { primaryKey } from '../helpers/primary-key';

export class TicketPurchase1681961418495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ticket_purchase',
        columns: [
          primaryKey(),
          new TableColumn({
            name: 'total',
            type: 'decimal',
          }),
          new TableColumn({
            name: 'event_id',
            type: 'bigint',
            isNullable: true,
          }),
          new TableColumn({
            name: 'quantity',
            type: 'bigint',
          }),
          new TableColumn({
            name: 'account_id',
            type: 'bigint',
            isNullable: true,
          }),
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'ticket_purchase',
      new TableForeignKey({
        name: 'ticket_purchase_event_fk',
        columnNames: ['event_id'],
        referencedTableName: 'event',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'ticket_purchase',
      new TableForeignKey({
        name: 'ticket_purchase_account_fk',
        columnNames: ['account_id'],
        referencedTableName: 'account',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ticket_purchase',
      'ticket_purchase_event_fk',
    );
    await queryRunner.dropForeignKey(
      'ticket_purchase',
      'ticket_purchase_account_fk',
    );
    await queryRunner.dropTable('ticket');
  }
}
