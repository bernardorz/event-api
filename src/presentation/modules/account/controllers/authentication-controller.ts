import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthModel } from 'src/domain/usecases/account/authentication';
import { auth } from 'src/domain/models/authentication';
import { BadRequest } from '../../../http/errors/index';
import { AccountDataTransferObject } from '../dto/add-acount-dto';
import { AuthGuard } from 'src/presentation/guard/auth.guard';
import { AuthenticationImplementation } from 'src/data/usecases/authentication';

@ApiTags('Account')
@Controller('api/auth')
export class AuthenticationController {
  constructor(private readonly authentication: AuthenticationImplementation) {}

  @Post()
  @ApiOperation({ summary: 'Authentication' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully authentication',
    type: AccountDataTransferObject,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  async add(@Body() body: AuthModel): Promise<auth> {
    const auth = await this.authentication.auth(body);
    return auth;
  }
}
