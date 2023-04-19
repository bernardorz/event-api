import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class EventCompanie1681937450240 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('event', 'event_account_fk');
    await queryRunner.dropColumn('event', 'account_id');

    await queryRunner.addColumn(
      'event',
      new TableColumn({
        name: 'company_id',
        type: 'bigint',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'event',
      new TableForeignKey({
        name: 'event_company_fk',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('event', 'event_company_fk');
    await queryRunner.dropColumn('event', 'company_id');
  }
}
