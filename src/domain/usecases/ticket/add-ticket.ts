import { TicketModel } from 'src/domain/models/ticket';

export interface TicketData {
  type: string;
  price: number;
  description: string;
  availableQuantity: number;
  event_id: number;
}

export interface Ticket {
  add(event: TicketData): Promise<TicketModel>;
}
