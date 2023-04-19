import { DeepPartial } from 'typeorm';
import { EventModel } from '../../models/event';
import { ListEventData } from './list-event';

export interface ListEventByCompanyData extends ListEventData {
  company_id: number;
}

export interface ListEventDataReturns {
  events: DeepPartial<EventModel>[];
  count: number;
}

export interface ListEventByCompanyt {
  list(event: ListEventByCompanyData): Promise<ListEventDataReturns>;
}
