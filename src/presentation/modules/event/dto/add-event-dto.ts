import { IsOptional, IsString, IsDateString } from 'class-validator';
import { AddEventData } from 'src/domain/usecases/event/create-event';

export class EventDataTransferObject implements AddEventData {
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  startAt: Date;

  @IsOptional()
  @IsDateString()
  endAt: Date;

  account_id: number;
}
