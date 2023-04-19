import { DeepPartial } from 'typeorm';
import { EventModel } from '../../models/event';

export interface ListEventData {
  page: number;
  limit: number;
  name?: string;
  startAt?: Date;
  endAt?: Date;
}

export interface ListEventDataReturns {
  events: DeepPartial<EventModel>[];
  count: number;
}

export interface ListEvent {
  list(event: ListEventData): Promise<ListEventDataReturns>;
}
