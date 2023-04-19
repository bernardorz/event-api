import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AddEventImplementation } from 'src/data/usecases/add-event';
import { EventController } from './controllers/event-controller';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { ListEventImplementation } from 'src/data/usecases/list-events';
import { ListEventByAccountImplementation } from 'src/data/usecases/list-events-by-account';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([EventEntity, Account]),
  ],
  controllers: [EventController],
  providers: [
    Repository,
    AddEventImplementation,
    ListEventImplementation,
    ListEventByAccountImplementation,
  ],
})
export class EventModule {}
