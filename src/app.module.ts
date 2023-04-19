import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { connection } from './infrastructure/db/connection/';
import { AccountModule } from './presentation/modules/account/account.module';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { EventEntity } from './infrastructure/db/entities/event.entity';
import { EventModule } from './presentation/modules/event/event.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connection),
    TypeOrmModule.forFeature([Account, EventEntity]),
    AccountModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
