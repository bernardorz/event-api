import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class TicketPurchaseRelationWithTicket1682099625647
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'ticket_purchase',
      new TableColumn({
        name: 'ticket_id',
        type: 'bigint',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'ticket_purchase',
      new TableForeignKey({
        name: 'ticket_purchase_ticket_fk',
        columnNames: ['ticket_id'],
        referencedTableName: 'ticket',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'ticket_purchase',
      'ticket_purchase_ticket_fk',
    );

    await queryRunner.dropColumn('ticket_purchase', 'ticket_id');
  }
}
