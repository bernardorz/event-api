import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AddTicketImplementation } from 'src/data/usecases/ticket/add-ticket';
import {
  Account,
  EventEntity,
  TicketEntity,
} from '../../../infrastructure/db/entities';
import { TicketController } from './controllers/ticket.controller';
import { TicketPurchaseImplementation } from 'src/data/usecases/ticket/ticket-purchase';
import { TicketPurchaseEntity } from 'src/infrastructure/db/entities/ticket-purchase.entity';
import { TicketListImplementation } from 'src/data/usecases/ticket/list-ticket-by-event';
import { TicketPurchaseListImplementation } from 'src/data/usecases/ticket/list-ticket-purchase-by-ticket';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      TicketEntity,
      EventEntity,
      Account,
      TicketPurchaseEntity,
    ]),
  ],
  controllers: [TicketController],
  providers: [
    Repository,
    AddTicketImplementation,
    TicketPurchaseImplementation,
    TicketListImplementation,
    TicketPurchaseListImplementation,
  ],
})
export class TicketModule {}
