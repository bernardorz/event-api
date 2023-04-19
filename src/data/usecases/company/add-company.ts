import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Conflict } from '../../../presentation/http/errors/conflict';
import { Repository } from 'typeorm';
import { Company } from 'src/infrastructure/db/entities/company.entity';

import {
  AddCompany,
  AddCompanyModel,
} from 'src/domain/usecases/company/add-company';
import { CompanyModel } from 'src/domain/models/company';

@Injectable()
export class AddCompanyImplemantation implements AddCompany {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  async add(companyData: AddCompanyModel): Promise<CompanyModel> {
    const companyAlreadyCreated = await this.repository.findOne({
      where: {
        document: companyData.document,
      },
    });

    if (companyAlreadyCreated) {
      throw new HttpException(
        new Conflict('Company already created'),
        HttpStatus.CONFLICT,
      );
    }
    const company = await this.repository.save(companyData);

    return company;
  }
}
