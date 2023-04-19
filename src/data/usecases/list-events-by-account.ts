import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';

import { Account } from 'src/infrastructure/db/entities/account.entity';
import {
  ListEventByAccount,
  ListEventByAccountData,
  ListEventDataReturns,
} from 'src/domain/usecases/event/list-event-by-account';
import { AccountDataTranformatedObject } from 'src/presentation/modules/event/dto/list-event-dto';
import { NotFound } from 'src/presentation/http/errors';

@Injectable()
export class ListEventByAccountImplementation implements ListEventByAccount {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,

    @InjectRepository(Account)
    private readonly AccountRepository: Repository<Account>,
  ) {}

  async list({
    limit,
    page,
    account_id,
    ...restEventData
  }: ListEventByAccountData): Promise<ListEventDataReturns> {
    const ofsset = Math.ceil(Number(limit) * Number(page));

    const account = await this.AccountRepository.findOne({
      where: {
        id: account_id,
      },
    });

    if (!account) {
      throw new NotFound();
    }

    const queryBuilder = this.EventRepository.createQueryBuilder('event');

    queryBuilder
      .leftJoin('event.responsable', 'account')
      .where('account.id = :id', { id: account_id })
      .orderBy('event.id');

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

    queryBuilder.skip(ofsset).take(limit);

    const [events, count] = await queryBuilder.getManyAndCount();

    return { events: events, count };
  }
}
