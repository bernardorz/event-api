import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export class FindByIdQueryParams {
  @ApiProperty({ example: 1 })
  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @ApiProperty({ example: 'Company name' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: '2023-04-20T14:23:47.800Z' })
  @IsOptional()
  @IsDateString()
  startAt: Date;

  @ApiProperty({ example: '2023-04-20T14:23:47.800Z' })
  @IsOptional()
  @IsDateString()
  endAt: Date;
}
