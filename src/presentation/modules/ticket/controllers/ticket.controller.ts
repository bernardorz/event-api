import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Conflict } from '../../../http/errors/index';

import { TicketModel } from 'src/domain/models/ticket';
import { DeepPartial } from 'typeorm';

import { AuthGuard } from 'src/presentation/guard/auth.guard';

import { Authorize } from 'src/presentation/guard/session';
import { TicketTransferObject } from '../dto/add-ticket-dto';
import { AddTicketImplementation } from 'src/data/usecases/ticket/add-ticket';

@ApiTags('Ticket')
@Controller('api/ticket')
export class TicketController {
  constructor(private readonly addTicket: AddTicketImplementation) {}

  @Post()
  @Authorize(['MANAGER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ticket successfully created',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'ticket already created',
    type: Conflict,
  })
  async add(
    @Body() body: TicketTransferObject,
  ): Promise<DeepPartial<TicketModel>> {
    const ticket = await this.addTicket.add(body);
    return ticket;
  }
}
