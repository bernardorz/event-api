import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';
import { TicketData } from 'src/domain/usecases/ticket/add-ticket';

export class TicketTransferObject implements TicketData {
  @ApiProperty({ example: 'VIP' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'CAMAROTE' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  availableQuantity: number;

  @ApiProperty({ example: 129.9 })
  @IsNumber()
  price: number;

  @IsNumber()
  event_id: number;
}
