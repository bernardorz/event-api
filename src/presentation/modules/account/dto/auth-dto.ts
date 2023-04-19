import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  isStrongPassword,
  MinLength,
} from 'class-validator';
import { AccountModel } from 'src/domain/models/account';
import { AuthModel } from 'src/domain/usecases/account/authentication';

export class AuthDataTransferObject implements AuthModel {
  @ApiProperty({ example: 'Example@email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Example_password' })
  @IsString()
  password: string;

  constructor(partial: Partial<AccountModel>) {
    Object.assign(this, partial);
  }
}
