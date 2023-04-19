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

@Injectable()
export class ListEventImplementation implements ListEvent {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
  ) {}

  async list({
    limit,
    page,
    ...restEventData
  }: ListEventData): Promise<ListEventDataReturns> {
    const ofsset = Math.ceil(Number(limit) * (Number(page) - 1)) / limit;

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

    return { events: events, count };
  }
}
