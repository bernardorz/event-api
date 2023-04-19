import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BadRequest, Conflict } from '../../../http/errors/index';
import { CompanyDataTransferObject } from '../dto/add-company-dto';
import { Authorize } from 'src/presentation/guard/session';
import { AuthGuard } from 'src/presentation/guard/auth.guard';
import { CompanyModel } from 'src/domain/models/company';
import { AddCompanyImplemantation } from 'src/data/usecases/add-company';

@ApiTags('Account')
@Controller('api/company')
export class CompanyController {
  constructor(private readonly AddCompany: AddCompanyImplemantation) {}

  @Post('')
  @Authorize(['ADM'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'company successfully created',
    type: CompanyDataTransferObject,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Company already exist',
    type: Conflict,
  })
  async addManager(
    @Body() body: CompanyDataTransferObject,
  ): Promise<CompanyModel> {
    const user = await this.AddCompany.add(body);
    return user;
  }
}
