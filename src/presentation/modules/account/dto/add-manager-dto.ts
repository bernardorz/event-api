import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
  isStrongPassword,
  MinLength,
} from 'class-validator';
import { AccountModel } from 'src/domain/models/account';
import { AddAcountModel } from 'src/domain/usecases/account/create-account';

export class ManagerAccountDataTransferObject implements AddAcountModel {
  @ApiProperty({ example: 'Example_name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Example_password' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Example@email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Example@email' })
  @IsNumber()
  company_id?: number;

  permission: string;

  constructor(partial: Partial<AccountModel>) {
    Object.assign(this, partial);
  }
}
