import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, IsNumber } from 'class-validator';
import { AddEventData } from 'src/domain/usecases/event/create-event';

export class EventDataTransferObject implements AddEventData {
  @ApiProperty({ example: 'Event name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '2023-04-20T14:23:47.800Z' })
  @IsDateString()
  startAt: Date;

  @ApiProperty({ example: '2023-04-20T14:23:47.800Z' })
  @IsDateString()
  endAt: Date;

  @ApiProperty({ example: 1 })
  @IsNumber()
  company_id: number;
}
