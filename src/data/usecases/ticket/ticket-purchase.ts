import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Ticket,
  TicketPurchase,
} from 'src/domain/usecases/ticket/ticket-purchase';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';

import { TicketEntity } from 'src/infrastructure/db/entities/ticket.entity';
import { Conflict } from 'src/presentation/http/errors';
import { Account } from 'src/infrastructure/db/entities';
import { TicketPurchaseEntity } from 'src/infrastructure/db/entities/ticket-purchase.entity';
import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';

@Injectable()
export class TicketPurchaseImplementation implements Ticket {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
    @InjectRepository(TicketEntity)
    private readonly TicketRepository: Repository<TicketEntity>,
    @InjectRepository(Account)
    private readonly AccountRepository: Repository<Account>,
    @InjectRepository(TicketPurchaseEntity)
    private readonly TicketPurchaseRepository: Repository<TicketPurchaseEntity>,
  ) {}

  async buy(ticketData: TicketPurchase): Promise<TicketPurchaseModel> {
    const ticket = await this.TicketRepository.findOne({
      where: {
        id: ticketData.ticket_id,
      },
      relations: ['event'],
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    console.log({ ticket });
    if (!ticket.availableQuantity) {
      throw new BadRequestException('Tickets sold out');
    }

    const validQuantity = ticket.availableQuantity - ticketData.quantity;

    if (!validQuantity) {
      throw new HttpException(
        new Conflict('Quantity of tickets unavailable'),
        HttpStatus.BAD_REQUEST,
      );
    }

    const account = await this.AccountRepository.findOne({
      where: {
        id: ticketData.account_id,
      },
    });

    const event = await this.EventRepository.findOne({
      where: {
        id: ticket.event.id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const total = ticketData.quantity * ticket.price;

    const createTicketPurchase = await this.TicketPurchaseRepository.save({
      account,
      event,
      quantity: ticketData.quantity,
      total: total,
    });

    await this.TicketRepository.createQueryBuilder('ticket')
      .update(TicketEntity)
      .set({ availableQuantity: validQuantity })
      .where('ticket.id = :id', { id: ticket.id })
      .execute();

    return createTicketPurchase;
  }
}
