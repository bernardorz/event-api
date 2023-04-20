import { IsNumber } from 'class-validator';
import { TicketPurchase } from 'src/domain/usecases/ticket/ticket-purchase';

export class PurchaseTicketTransferObject implements TicketPurchase {
  @IsNumber()
  account_id: number;

  @IsNumber()
  ticket_id: number;

  @IsNumber()
  quantity: number;
}
