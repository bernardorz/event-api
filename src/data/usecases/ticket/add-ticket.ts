import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketData } from 'src/domain/usecases/ticket/add-ticket';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';

import { TicketEntity } from 'src/infrastructure/db/entities/ticket.entity';
import { Conflict } from 'src/presentation/http/errors';

@Injectable()
export class AddTicketImplementation implements Ticket {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,

    @InjectRepository(TicketEntity)
    private readonly TicketRepository: Repository<TicketEntity>,
  ) {}

  async add(ticketData: TicketData): Promise<any> {
    const event = await this.EventRepository.findOne({
      where: {
        id: ticketData.event_id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const { type, description, price, availableQuantity } = ticketData;

    const ticket = await this.TicketRepository.findOne({
      where: {
        type,
        description,
      },
    });

    if (ticket) {
      throw new HttpException(
        new Conflict('Ticket already created'),
        HttpStatus.CONFLICT,
      );
    }

    const createTicket = await this.TicketRepository.save({
      type,
      description,
      price,
      availableQuantity,
      event: event,
    });

    return createTicket;
  }
}
