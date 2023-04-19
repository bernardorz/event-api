import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';

import {
  ListEventByCompanyt,
  ListEventByCompanyData,
  ListEventDataReturns,
} from 'src/domain/usecases/event/list-event-by-account';

import { Company } from 'src/infrastructure/db/entities/company.entity';

@Injectable()
export class ListEventByCompanyImplementation implements ListEventByCompanyt {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,

    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
  ) {}

  async list({
    limit,
    page,
    company_id,
    ...restEventData
  }: ListEventByCompanyData): Promise<ListEventDataReturns> {
    const ofsset = Math.ceil(Number(limit) * (Number(page) - 1)) / limit;

    const company = await this.CompanyRepository.findOne({
      where: {
        id: company_id,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const queryBuilder = this.EventRepository.createQueryBuilder('event');

    queryBuilder
      .leftJoin('event.company', 'company')
      .where('company.id = :id', { id: company_id })
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
