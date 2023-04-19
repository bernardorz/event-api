import { DeepPartial } from 'typeorm';
import { EventModel } from '../../models/event';
import { ListEventData } from './list-event';

export interface ListEventByAccountData extends ListEventData {
  account_id: number;
}

export interface ListEventDataReturns {
  events: DeepPartial<EventModel>[];
  count: number;
}

export interface ListEventByAccount {
  list(event: ListEventByAccountData): Promise<ListEventDataReturns>;
}
