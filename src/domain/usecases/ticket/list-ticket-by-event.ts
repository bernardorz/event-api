import { TicketModel } from 'src/domain/models/ticket';
import { DeepPartial } from 'typeorm';

export interface TicketListData {
  event_id: number;
  page: number;
  limit: number;
  type: string;
}

export interface ListTicketByEventDataReturns {
  tickets: DeepPartial<TicketModel>[];
  count: number;
}

export interface TicketList {
  list(listTicket: TicketListData): Promise<ListTicketByEventDataReturns>;
}
