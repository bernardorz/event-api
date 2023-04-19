import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/company-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Company } from 'src/infrastructure/db/entities/company.entity';
import { AddCompanyImplemantation } from 'src/data/usecases/company/add-company';
import { ListCompaniesImplemantation } from 'src/data/usecases/company/list-company';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    AddCompanyImplemantation,
    ListCompaniesImplemantation,
    Repository,
  ],
})
export class CompanyModule {}
