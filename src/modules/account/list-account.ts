import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import {
  ListAccount,
  ListAccountData,
  ListAccountsReturns,
} from 'src/domain/usecases/account/list-account';

@Injectable()
export class ListAccountsImplementation implements ListAccount {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
  ) {}

  async list({
    limit,
    page,
    ...restCompanyData
  }: ListAccountData): Promise<ListAccountsReturns> {
    const ofsset = Math.ceil(Number(limit) * (Number(page) - 1)) / limit;

    const queryBuilder = this.repository.createQueryBuilder('account');
    queryBuilder
      .leftJoin('account.roles', 'roles')
      .where('roles.id = :roleId', { roleId: 3 })
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select('1')
          .from('account_roles', 'other_roles')
          .where('other_roles.role_id <> :roleId', { roleId: 3 })
          .andWhere('other_roles.account_id = account.id')
          .getQuery();
        return `NOT EXISTS(${subQuery})`;
      });

    if (restCompanyData.name) {
      queryBuilder.where('account.name LIKE :name', {
        name: `%${restCompanyData.name}%`,
      });
    }

    if (restCompanyData.email) {
      queryBuilder.where('account.email LIKE :email', {
        email: `%${restCompanyData.email}%`,
      });
    }

    queryBuilder.select(['account.id', 'account.name', 'account.email']);

    queryBuilder.skip(ofsset).take(limit);

    const [accounts, count] = await queryBuilder.getManyAndCount();

    return { accounts, count };
  }
}
