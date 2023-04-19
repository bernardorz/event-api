import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';
import { ListCompanyData } from 'src/domain/usecases/company/list-company';

export class ListCompanyDataTransferObject implements ListCompanyData {
  @ApiProperty({ example: 'MB-LABS' })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 'MB LTDA' })
  @IsString()
  @IsOptional()
  tradingName: string;

  @ApiProperty({ example: '17.093.553/0001-39' })
  @IsString()
  @IsOptional()
  @Length(14, 18)
  document: string;

  @ApiProperty({ example: '+55 (11) 99999-9999' })
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'SC' })
  @IsOptional()
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: 'BR' })
  @IsOptional()
  @IsPostalCode('BR')
  zipcode: string;

  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;
}
