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
import { CompanyModule } from './presentation/modules/company/company.module';
import { Role } from './infrastructure/db/entities/role.entity';
import { Company } from './infrastructure/db/entities/company.entity';
import { TicketModule } from './presentation/modules/ticket/event.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(connection),
    TypeOrmModule.forFeature([Account, EventEntity, Role, Company]),
    AccountModule,
    EventModule,
    CompanyModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
