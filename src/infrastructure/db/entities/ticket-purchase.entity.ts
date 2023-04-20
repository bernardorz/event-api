import { Id } from '../helpers/id';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';
import { ApiProperty } from '@nestjs/swagger';

import { EventEntity } from './event.entity';
import { Account } from './account.entity';

@Entity('ticket_purchase')
export class TicketPurchaseEntity implements TicketPurchaseModel {
  @Id()
  id: number;

  @ApiProperty({ example: 'R$ 300,00' })
  @Column('decimal', { name: 'total', precision: 10, scale: 2 })
  total: number;

  @ApiProperty({ example: 'R$ 300,00' })
  @Column('bigint', { name: 'quantity' })
  quantity: number;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
