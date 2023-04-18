import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { connection } from './infrastructure/db/connection/';
import { AccountModule } from './presentation/modules/account/account.module';
import { Account } from 'src/infrastructure/db/entities/account.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connection),
    TypeOrmModule.forFeature([Account]),
    AccountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
