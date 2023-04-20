import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { auth } from 'src/domain/models/authentication';
import { BadRequest } from '../../../http/errors/index';
import { AccountDataTransferObject } from '../dto/add-acount-dto';
import { AuthenticationImplementation } from 'src/data/usecases/account/authentication';
import { AuthDataTransferObject } from '../dto/auth-dto';

@ApiTags('Authentication')
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
  async add(@Body() body: AuthDataTransferObject): Promise<auth> {
    const auth = await this.authentication.auth(body);
    return auth;
  }
}
