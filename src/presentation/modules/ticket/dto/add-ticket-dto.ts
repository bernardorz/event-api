import { Transform } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsDecimal,
} from 'class-validator';
import { TicketData } from 'src/domain/usecases/ticket/add-ticket';

export class TicketTransferObject implements TicketData {
  @IsString()
  type: string;

  @IsOptional()
  description: string;

  @IsNumber()
  availableQuantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  event_id: number;
}
