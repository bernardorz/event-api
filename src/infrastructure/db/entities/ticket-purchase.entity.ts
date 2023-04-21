import { Id } from '../helpers/id';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';
import { ApiProperty } from '@nestjs/swagger';

import { EventEntity } from './event.entity';
import { Account } from './account.entity';
import { IntegerTransformer } from '../helpers/transformer-big-integer';
import { TicketEntity } from './ticket.entity';

@Entity('ticket_purchase')
export class TicketPurchaseEntity implements TicketPurchaseModel {
  @Id()
  id: number;

  @ApiProperty({ example: 129.9 })
  @Column('decimal', {
    name: 'total',
    precision: 10,
    scale: 2,
    transformer: IntegerTransformer.getInstance(),
  })
  total: number;

  @ApiProperty({ example: 10 })
  @Column('bigint', {
    name: 'quantity',
    transformer: IntegerTransformer.getInstance(),
  })
  quantity: number;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ManyToOne(() => TicketEntity)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
