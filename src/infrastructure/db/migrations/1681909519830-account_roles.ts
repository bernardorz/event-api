import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AccountRoles1681909519830 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account_roles',
        columns: [
          new TableColumn({
            name: 'account_id',
            type: 'bigint',
            isNullable: true,
          }),
          new TableColumn({
            name: 'role_id',
            type: 'bigint',
            isNullable: true,
          }),
        ],
      }),
    );

    await queryRunner.createForeignKeys('account_roles', [
      new TableForeignKey({
        name: 'account_roles_fk',
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'account',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
      new TableForeignKey({
        name: 'role_account_fk',
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'role',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('account_roles', 'account_roles_fk');
    await queryRunner.dropForeignKey('account_roles', 'role_account_fk');
    await queryRunner.dropTable('account_roles');
  }
}
