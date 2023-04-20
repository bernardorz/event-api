import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';

export interface TicketPurchase {
  account_id: number;
  ticket_id: number;
  quantity: number;
}

export interface Ticket {
  buy(event: TicketPurchase): Promise<TicketPurchaseModel>;
}
