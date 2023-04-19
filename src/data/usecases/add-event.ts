import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddEvent, AddEventData } from 'src/domain/usecases/event/create-event';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { AccountDataTransferObject } from 'src/presentation/modules/account/dto/add-acount-dto';
import { Conflict } from 'src/presentation/http/errors';
import { Account } from 'src/infrastructure/db/entities/account.entity';

@Injectable()
export class AddEventImplementation implements AddEvent {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,

    @InjectRepository(Account)
    private readonly AccountRepository: Repository<Account>,
  ) {}

  async add(eventData: AddEventData): Promise<any> {
    const account = await this.AccountRepository.findOne({
      where: {
        id: eventData.account_id,
      },
    });

    const accountData = new AccountDataTransferObject({
      email: account.email,
      id: account.id,
      createdAt: account.createdAt,
    });

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
      responsable: account,
    });

    return { ...createEvent, responsable: accountData };
  }
}
