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
import { IntegerTransformer } from '../helpers/transformer-big-integer';

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

  @ApiProperty({ example: 300 })
  @Column('bigint', {
    name: 'available_quantity',
    transformer: IntegerTransformer.getInstance(),
  })
  availableQuantity: number;

  @ApiProperty({ example: 300 })
  @Column('decimal', {
    name: 'price',
    precision: 10,
    scale: 2,
    transformer: IntegerTransformer.getInstance(),
  })
  price: number;

  @ManyToOne(() => EventEntity)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
