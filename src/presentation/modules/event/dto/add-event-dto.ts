import { IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
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

  @IsNumber()
  company_id: number;
}
