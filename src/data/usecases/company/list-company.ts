import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Company } from 'src/infrastructure/db/entities/company.entity';

import {
  ListCompaniesataReturns,
  ListCompany,
  ListCompanyData,
} from 'src/domain/usecases/company/list-company';

@Injectable()
export class ListCompaniesImplemantation implements ListCompany {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  async list({
    limit,
    page,
    ...restCompanyData
  }: ListCompanyData): Promise<ListCompaniesataReturns> {
    const ofsset = Math.ceil(Number(limit) * (Number(page) - 1)) / limit;

    const queryBuilder = this.repository.createQueryBuilder('company');

    if (restCompanyData.name) {
      queryBuilder.where('company.name LIKE :name', {
        name: `%${restCompanyData.name}%`,
      });
    }

    if (restCompanyData.state) {
      queryBuilder.where('company.state = :state', {
        state: restCompanyData.state,
      });
    }

    if (restCompanyData.tradingName) {
      queryBuilder.where('company.trading_name = :tradingName', {
        tradingName: `%${restCompanyData.tradingName}%`,
      });
    }

    if (restCompanyData.zipcode) {
      queryBuilder.where('company.zipcode = :zipcode', {
        zipcode: restCompanyData.zipcode,
      });
    }

    queryBuilder.skip(ofsset).take(limit);

    const [companies, count] = await queryBuilder.getManyAndCount();

    return { companies: companies, count };
  }
}
