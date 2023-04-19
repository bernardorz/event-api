import { Id } from '../helpers/id';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { AccountModel } from 'src/domain/models/account';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { Company } from './company.entity';

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

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'account_roles',
    joinColumn: {
      name: 'account_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @ManyToOne(() => Company)
  @JoinColumn({
    name: 'company_id',
  })
  company: Company;

  constructor(partial: Partial<Account>) {
    Object.assign(this, partial);
  }
}
