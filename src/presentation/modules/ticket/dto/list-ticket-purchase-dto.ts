import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class TicketPurchaseListTransferObject {
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

  account_id: number;
}
