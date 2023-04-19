import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddEvent, AddEventData } from 'src/domain/usecases/event/create-event';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { Conflict, NotFound } from 'src/presentation/http/errors';
import { Company } from 'src/infrastructure/db/entities/company.entity';

@Injectable()
export class AddEventImplementation implements AddEvent {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,

    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
  ) {}

  async add(eventData: AddEventData): Promise<any> {
    const company = await this.CompanyRepository.findOne({
      where: {
        id: eventData.company_id,
      },
    });

    if (!company) {
      throw new NotFound();
    }

    const event = await this.EventRepository.findOne({
      where: {
        name: eventData.name,
      },
    });

    if (event) {
      throw new HttpException(
        new Conflict('Event already created'),
        HttpStatus.CONFLICT,
      );
    }

    const { name, startAt, endAt } = eventData;

    const createEvent = await this.EventRepository.save({
      name,
      startAt,
      endAt,
      company,
    });

    return createEvent;
  }
}
