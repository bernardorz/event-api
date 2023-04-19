import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { AccountDataTransferObject } from '../../account/dto/add-acount-dto';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindByIdQueryParams {
  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  startAt: Date;

  @IsOptional()
  @IsDateString()
  endAt: Date;
}
