import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AddAcountModel } from 'src/domain/usecases/account/create-account';
import { BadRequest, Conflict } from '../../../http/errors/index';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { AddAcountImplemantation } from 'src/data/usecases/add-acount';
import { AccountDataTransferObject } from '../dto/add-acount-dto';
import { AccountModel } from 'src/domain/models/account';
import { DeepPartial } from 'typeorm';

@ApiTags('Account')
@Controller('api/account')
export class AccoutController {
  constructor(private readonly addAcount: AddAcountImplemantation) {}

  @Post()
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
  async add(@Body() body: AddAcountModel): Promise<DeepPartial<AccountModel>> {
    const user = await this.addAcount.add(body);
    return user;
  }
}
