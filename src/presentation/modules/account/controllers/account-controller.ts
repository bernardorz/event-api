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

import { AddAcountModel } from 'src/domain/usecases/account/create-account';
import { BadRequest, Conflict } from '../../../http/errors/index';
import { AddAcountImplemantation } from 'src/data/usecases/account/add-acount';
import { AccountDataTransferObject } from '../dto/add-acount-dto';
import { AccountModel } from 'src/domain/models/account';
import { DeepPartial } from 'typeorm';
import { Authorize } from 'src/presentation/guard/session';
import { AuthGuard } from 'src/presentation/guard/auth.guard';
import { ManagerAccountDataTransferObject } from '../dto/add-manager-dto';
import { ListAccountsImplementation } from 'src/data/usecases/account/list-account';
import { ListAccountDataTransferObject } from '../dto/list-account-dto';
import { ListAccountsReturns } from 'src/domain/usecases/account/list-account';

@ApiTags('Account')
@Controller('api/account')
export class AccoutController {
  constructor(
    private readonly addAcount: AddAcountImplemantation,
    private readonly listAccount: ListAccountsImplementation,
  ) {}

  @Post('/manager')
  @Authorize(['ADM'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'user successfully created',
    type: AccountDataTransferObject,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already used',
    type: Conflict,
  })
  async addManager(
    @Body() body: ManagerAccountDataTransferObject,
  ): Promise<DeepPartial<AccountModel>> {
    const user = await this.addAcount.add({ ...body, permission: 'MANAGER' });
    return user;
  }

  @Post('')
  @ApiOperation({ summary: 'Create a new account' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'user successfully created',
    type: AccountDataTransferObject,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already used',
    type: Conflict,
  })
  async addAccount(
    @Body() body: AddAcountModel,
  ): Promise<DeepPartial<AccountModel>> {
    const user = await this.addAcount.add({ ...body, permission: 'USER' });
    return user;
  }

  @Get('')
  @Authorize(['MANAGER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'list  accounts' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload query params',
    type: BadRequest,
  })
  async list(
    @Query(ValidationPipe) query: ListAccountDataTransferObject,
  ): Promise<ListAccountsReturns> {
    const { page, ...queryParams } = query;

    const accounts = await this.listAccount.list({
      page: page === 0 ? 1 : page,
      ...queryParams,
    });
    return accounts;
  }
}
