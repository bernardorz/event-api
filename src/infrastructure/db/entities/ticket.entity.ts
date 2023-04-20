import { Id } from '../helpers/id';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TicketModel } from 'src/domain/models/ticket';
import { ApiProperty } from '@nestjs/swagger';

import { EventEntity } from './event.entity';

@Entity('ticket')
export class TicketEntity implements TicketModel {
  @Id()
  id: number;

  @ApiProperty({ example: 'VIP' })
  @Column('varchar', { name: 'type' })
  type: string;

  @ApiProperty({ example: 'Arquibancada' })
  @Column('varchar', { name: 'description' })
  description: string;

  @ApiProperty({ example: '300' })
  @Column('bigint', { name: 'available_quantity' })
  availableQuantity: number;

  @ApiProperty({ example: 'R$ 300,00' })
  @Column('decimal', { name: 'price', precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
