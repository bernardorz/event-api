import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TicketPurchase } from 'src/domain/usecases/ticket/ticket-purchase';

export class PurchaseTicketTransferObject implements TicketPurchase {
  @ApiProperty({ example: 1 })
  @IsNumber()
  ticket_id: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  quantity: number;
}
