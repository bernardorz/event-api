import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';
import { DeepPartial } from 'typeorm';

export interface TicketPurchase {
  account_id?: number;
  ticket_id: number;
  quantity: number;
}

export interface Ticket {
  buy(ticket: TicketPurchase): Promise<DeepPartial<TicketPurchaseModel>>;
}
