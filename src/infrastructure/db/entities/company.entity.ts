import { Id } from '../helpers/id';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { CompanyModel } from 'src/domain/models/company';
import {
  IsEmail,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';

@Entity('company')
export class Company implements CompanyModel {
  @Id()
  id: number;

  @IsString()
  @Column('varchar', { name: 'name' })
  name: string;

  @IsEmail()
  @Column('varchar', { name: 'email' })
  email: string;

  @IsString()
  @Column('varchar', { name: 'trading_name' })
  tradingName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @IsString()
  @Column('varchar', { name: 'document' })
  document: string;

  @IsPhoneNumber()
  @Column('varchar', { name: 'phone' })
  phone: string;

  @IsString()
  @Length(2, 2)
  @Column('varchar', { name: 'state' })
  state: string;

  @IsPostalCode('BR')
  @Column('varchar', { name: 'zipcode' })
  zipcode: string;
}
