import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { AccountModel } from 'src/domain/models/account';

export class AccountDataTransferObject {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Bernardo' })
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  constructor(partial: Partial<AccountModel>) {
    Object.assign(this, partial);
  }
}
