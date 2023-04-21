import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';
import { DeepPartial } from 'typeorm';

export interface TicketPurchaseListData {
  ticket_id: number;
  page: number;
  limit: number;
  account_id: number;
}

export interface ListTicketPurchaseDataReturns {
  tickets: DeepPartial<TicketPurchaseModel>[];
  count: number;
}

export interface TicketPurchaseList {
  list(ticket: TicketPurchaseListData): Promise<ListTicketPurchaseDataReturns>;
}
