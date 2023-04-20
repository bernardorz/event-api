import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';
import { AccountModel } from 'src/domain/models/account';
import { ListAccountData } from 'src/domain/usecases/account/list-account';

export class ListAccountDataTransferObject implements ListAccountData {
  @ApiProperty({ example: 'Example_name' })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ example: 'Example@email' })
  @IsEmail()
  @IsOptional()
  email: string;

  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;

  constructor(partial: Partial<AccountModel>) {
    Object.assign(this, partial);
  }
}
