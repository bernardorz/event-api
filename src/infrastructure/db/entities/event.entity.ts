import { Id } from '../helpers/id';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EventModel } from 'src/domain/models/event';
import { ApiProperty } from '@nestjs/swagger';

import { Account } from './account.entity';

@Entity('event')
export class EventEntity implements EventModel {
  @Id()
  id: number;

  @ApiProperty({ example: 'Show nacional' })
  @Column('varchar', { name: 'name' })
  name: string;

  @ApiProperty({ example: '2023-04-18T23:10:07.887Z' })
  @Column('varchar', { name: 'start_at' })
  startAt: Date;

  @ApiProperty({ example: '2023-04-18T23:10:07.887Z' })
  @Column('varchar', { name: 'end_at' })
  endAt: Date;

  @ApiProperty({ example: '13/05/2004' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  responsable: Account;
}
