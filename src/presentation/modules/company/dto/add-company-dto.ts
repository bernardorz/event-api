import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';
import { AddCompanyModel } from 'src/domain/usecases/company/add-company';

export class CompanyDataTransferObject implements AddCompanyModel {
  @ApiProperty({ example: 'MB-LABS' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Comercial@gmail' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'MB LTDA' })
  @IsString()
  tradingName: string;

  @IsString()
  @Length(14, 18)
  @ApiProperty({ example: '17.093.553/0001-39' })
  document: string;

  @ApiProperty({ example: '+55 (11) 99999-9999' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'SC' })
  @IsString()
  @Length(2, 2)
  state: string;

  @ApiProperty({ example: 'BR' })
  @IsPostalCode('BR')
  zipcode: string;
}
