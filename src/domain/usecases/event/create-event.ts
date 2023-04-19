import { DeepPartial } from 'typeorm';
import { EventModel } from '../../models/event';

export interface AddEventData {
  name: string;
  startAt: Date;
  endAt: Date;
  company_id: number;
}

export interface AddEvent {
  add(event: AddEventData): Promise<DeepPartial<EventModel>>;
}
