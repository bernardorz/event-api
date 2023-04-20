import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AddTicketImplementation } from 'src/data/usecases/ticket/add-ticket';
import { EventEntity, TicketEntity } from '../../../infrastructure/db/entities';
import { TicketController } from './controllers/ticket.controller';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([TicketEntity, EventEntity]),
  ],
  controllers: [TicketController],
  providers: [Repository, AddTicketImplementation],
})
export class TicketModule {}
