import { Module } from '@nestjs/common';
import { AccoutController } from './controllers/add-account-controller';
import { AddAcountImplemantation } from 'src/data/usecases/add-acount';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { connection } from 'src/infrastructure/db/connection/';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Account])],
  controllers: [AccoutController],
  providers: [AddAcountImplemantation, Repository],
})
export class AccountModule {}
