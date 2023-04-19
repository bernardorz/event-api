import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AccountCompany1681940321489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'account',
      new TableColumn({
        name: 'company_id',
        type: 'bigint',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'account',
      new TableForeignKey({
        name: 'account_company_fk',
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'company',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('event', 'account_company_fk');
    await queryRunner.dropColumn('event', 'company_id');
  }
}
