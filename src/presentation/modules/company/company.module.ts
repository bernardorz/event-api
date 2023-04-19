import { Module } from '@nestjs/common';
import { CompanyController } from './controllers/add-company-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Company } from 'src/infrastructure/db/entities/company.entity';
import { AddCompanyImplemantation } from 'src/data/usecases/add-company';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [AddCompanyImplemantation, Repository],
})
export class CompanyModule {}
