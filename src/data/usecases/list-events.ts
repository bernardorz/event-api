import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';

import { Account } from 'src/infrastructure/db/entities/account.entity';
import {
  ListEvent,
  ListEventData,
  ListEventDataReturns,
} from 'src/domain/usecases/event/list-event';
import { AccountDataTranformatedObject } from 'src/presentation/modules/event/dto/list-event-dto';

@Injectable()
export class ListEventImplementation implements ListEvent {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,

    @InjectRepository(Account)
    private readonly AccountRepository: Repository<Account>,
  ) {}

  async list({
    limit,
    page,
    ...restEventData
  }: ListEventData): Promise<ListEventDataReturns> {
    const ofsset = Math.ceil(Number(limit) * Number(page));

    const queryBuilder = this.EventRepository.createQueryBuilder('event');

    if (restEventData.startAt && restEventData.endAt) {
      queryBuilder.andWhere('event.start_at BETWEEN :startDate AND :endDate', {
        startDate: restEventData.startAt,
        endDate: restEventData.endAt,
      });
    }

    if (restEventData.startAt && !restEventData.endAt) {
      queryBuilder.andWhere('event.start_at >= :date', {
        date: restEventData.startAt,
      });
    }

    if (!restEventData.startAt && restEventData.endAt) {
      queryBuilder.andWhere('event.end_at <= :date', {
        date: restEventData.endAt,
      });
    }

    if (restEventData.name) {
      queryBuilder.where('event.name LIKE :name', {
        name: `%${restEventData.name}%`,
      });
    }

    queryBuilder.leftJoinAndSelect('event.responsable', 'account');

    queryBuilder.skip(ofsset).take(limit);

    const [events, count] = await queryBuilder.getManyAndCount();

    const mapEvents = new AccountDataTranformatedObject().map(events);

    return { events: mapEvents, count };
  }
}
