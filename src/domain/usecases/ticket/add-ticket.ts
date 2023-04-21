import { TicketModel } from 'src/domain/models/ticket';

export interface TicketData {
  type: string;
  description: string;
  availableQuantity: number;
  price: number;
  event_id: number;
}

export interface Ticket {
  add(ticket: TicketData): Promise<TicketModel>;
}
