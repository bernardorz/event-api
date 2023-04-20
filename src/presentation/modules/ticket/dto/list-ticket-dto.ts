export interface TicketListData {
  page: number;
  limit: number;
  type: string;
}

import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt } from 'class-validator';

export class TicketListTransferObject implements TicketListData {
  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsString()
  @IsOptional()
  type: string;
}
