import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { TicketEntity } from 'src/infrastructure/db/entities/ticket.entity';
import {
  ListTicketByEventDataReturns,
  TicketList,
  TicketListData,
} from 'src/domain/usecases/ticket/list-ticket-by-event';

@Injectable()
export class TicketListImplementation implements TicketList {
  constructor(
    @InjectRepository(EventEntity)
    private readonly EventRepository: Repository<EventEntity>,
    @InjectRepository(TicketEntity)
    private readonly TicketRepository: Repository<TicketEntity>,
  ) {}

  async list(
    ticketListData: TicketListData,
  ): Promise<ListTicketByEventDataReturns> {
    const event = await this.EventRepository.findOne({
      where: {
        id: ticketListData.event_id,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const { limit, page } = ticketListData;

    const ofsset = Math.ceil(Number(limit) * (Number(page) - 1)) / limit;

    const queryBuilder = this.TicketRepository.createQueryBuilder('ticket');

    queryBuilder
      .leftJoin('ticket.event', 'event')
      .where('event.id = :eventId', { eventId: ticketListData.event_id });

    if (ticketListData.type) {
      queryBuilder.where('ticket.type LIKE :type', {
        type: `%${ticketListData.type}%`,
      });
    }

    queryBuilder.skip(ofsset).take(limit);

    const [tickets, count] = await queryBuilder.getManyAndCount();

    return { tickets, count };
  }
}
