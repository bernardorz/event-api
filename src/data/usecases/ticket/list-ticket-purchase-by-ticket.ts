import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TicketEntity } from 'src/infrastructure/db/entities/ticket.entity';

import { TicketPurchaseEntity } from 'src/infrastructure/db/entities/ticket-purchase.entity';

import {
  ListTicketPurchaseDataReturns,
  TicketPurchaseList,
  TicketPurchaseListData,
} from 'src/domain/usecases/ticket/list-ticket-purchase-by-ticket';
import { Account } from 'src/infrastructure/db/entities';

@Injectable()
export class TicketPurchaseListImplementation implements TicketPurchaseList {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly TicketRepository: Repository<TicketEntity>,
    @InjectRepository(TicketPurchaseEntity)
    private readonly TicketPurchaseRepository: Repository<TicketPurchaseEntity>,
    @InjectRepository(Account)
    private readonly AccountRepository: Repository<Account>,
  ) {}

  async list(
    tickePurchasetListData: TicketPurchaseListData,
  ): Promise<ListTicketPurchaseDataReturns> {
    const ticket = await this.TicketRepository.findOne({
      where: {
        id: tickePurchasetListData.ticket_id,
      },
    });

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const { company } = await this.AccountRepository.createQueryBuilder(
      'account',
    )
      .where('account.id = :accountId', {
        accountId: tickePurchasetListData.account_id,
      })
      .leftJoinAndSelect('account.company', 'company')
      .getOne();

    console.log({ company });

    const { limit, page } = tickePurchasetListData;

    const ofsset = Math.ceil(Number(limit) * (Number(page) - 1)) / limit;

    const queryBuilder =
      this.TicketPurchaseRepository.createQueryBuilder('ticket_purchase');

    queryBuilder
      .leftJoin('ticket_purchase.ticket', 'ticket')
      .where('ticket.id = :ticketId', {
        ticketId: tickePurchasetListData.ticket_id,
      });

    queryBuilder
      .leftJoinAndSelect('ticket_purchase.event', 'event')
      .leftJoin('ticket_purchase.account', 'account')
      .addSelect('account.id')
      .addSelect('account.email')
      .addSelect('account.name')
      .leftJoin('event.company', 'company')
      .where('company.id = :companyId', { companyId: company.id });

    queryBuilder.skip(ofsset).take(limit);

    const [tickets, count] = await queryBuilder.getManyAndCount();

    return { tickets, count };
  }
}
