import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Repository } from 'typeorm';
import { AddEventImplementation } from 'src/data/usecases/events/add-event';
import { EventController } from './controllers/event-controller';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { ListEventImplementation } from 'src/data/usecases/events/list-events';
import { ListEventByAccountImplementation } from 'src/data/usecases/events/list-events-by-account';
import { Company } from 'src/infrastructure/db/entities/company.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([EventEntity, Company]),
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
