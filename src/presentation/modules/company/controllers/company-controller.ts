import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BadRequest, Conflict } from '../../../http/errors/index';
import { ListCompanyDataTransferObject } from '../dto/list-company-dto';
import { Authorize } from 'src/presentation/guard/session';
import { AuthGuard } from 'src/presentation/guard/auth.guard';
import { CompanyModel } from 'src/domain/models/company';
import { AddCompanyImplemantation } from 'src/data/usecases/company/add-company';
import { ListCompaniesImplemantation } from 'src/data/usecases/company/list-company';
import { ListCompaniesataReturns } from 'src/domain/usecases/company/list-company';
import { CompanyDataTransferObject } from '../dto/add-company-dto';

@ApiTags('Company')
@Controller('api/company')
export class CompanyController {
  constructor(
    private readonly AddCompany: AddCompanyImplemantation,
    private readonly listCompanies: ListCompaniesImplemantation,
  ) {}

  @Post('')
  @Authorize(['ADM'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'list companies',
    type: ListCompanyDataTransferObject,
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
  async addCompany(
    @Body() body: CompanyDataTransferObject,
  ): Promise<CompanyModel> {
    const user = await this.AddCompany.add(body);
    return user;
  }

  @Get('')
  @Authorize(['MANAGER', 'USER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List companies' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'list companies',
    type: ListCompanyDataTransferObject,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload query params',
    type: BadRequest,
  })
  async list(
    @Query(ValidationPipe) query: ListCompanyDataTransferObject,
  ): Promise<ListCompaniesataReturns> {
    const { page, ...queryParams } = query;

    const companies = await this.listCompanies.list({
      page: page === 0 ? 1 : page,
      ...queryParams,
    });
    return companies;
  }
}
