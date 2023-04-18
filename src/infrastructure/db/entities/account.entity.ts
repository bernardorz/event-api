import { Id } from 'src/infrastructure/db/helpers/id';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { AccountModel } from 'src/domain/models/account';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('account')
export class Account implements AccountModel {
  @Id()
  id: number;

  @ApiProperty({ example: 'Bernardo' })
  @Column('varchar', { name: 'name' })
  name: string;

  @ApiProperty({ example: 'Bernardo@gmail' })
  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password' })
  @Exclude()
  password: string;

  @ApiProperty({ example: '13/05/2004' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
