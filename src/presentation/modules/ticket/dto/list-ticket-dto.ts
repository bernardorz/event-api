export interface TicketListData {
  page: number;
  limit: number;
  type: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class TicketListTransferObject implements TicketListData {
  @ApiProperty({ example: 1 })
  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @ApiProperty({ example: 'VIP' })
  @IsString()
  @IsOptional()
  type: string;
}
