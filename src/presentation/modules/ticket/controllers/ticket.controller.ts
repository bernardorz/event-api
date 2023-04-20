import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Conflict } from '../../../http/errors/index';

import { TicketPurchaseModel } from 'src/domain/models/ticket-purchase';
import { DeepPartial } from 'typeorm';

import { AuthGuard } from 'src/presentation/guard/auth.guard';

import { Authorize } from 'src/presentation/guard/session';
import { TicketTransferObject } from '../dto/add-ticket-dto';
import { AddTicketImplementation } from 'src/data/usecases/ticket/add-ticket';
import { TicketPurchaseImplementation } from 'src/data/usecases/ticket/ticket-purchase';
import { PurchaseTicketTransferObject } from '../dto/purchase-ticket-dto';
import { TicketModel } from 'src/domain/models/ticket';
import { TicketListTransferObject } from '../dto/list-ticket-dto';
import { TicketListImplementation } from 'src/data/usecases/ticket/list-ticket-by-event';
import { ListTicketByEventDataReturns } from 'src/domain/usecases/ticket/list-ticket-by-event';

@ApiTags('Ticket')
@Controller('api/ticket')
export class TicketController {
  constructor(
    private readonly addTicket: AddTicketImplementation,
    private readonly ticketPurchase: TicketPurchaseImplementation,
    private readonly ticketList: TicketListImplementation,
  ) {}

  @Post()
  @Authorize(['MANAGER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ticket successfully created',
    type: TicketTransferObject,
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

  @Post('purchase')
  @Authorize(['MANAGER', 'USER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'buy new ticket' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ticket successfully purchase',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'invalidy quantity',
    type: Conflict,
  })
  async buy(
    @Body() body: PurchaseTicketTransferObject,
  ): Promise<TicketPurchaseModel> {
    const ticket = await this.ticketPurchase.buy(body);
    return ticket;
  }

  @Get('event/:id')
  @Authorize(['USER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List tickets by event id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ticket successfully list',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload query/route params',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Event not found',
    type: BadRequest,
  })
  @ApiQuery({ name: 'id', description: 'Event id', required: true })
  async list(
    @Query(ValidationPipe) queryParams: TicketListTransferObject,
    @Param('id') event_id: number,
  ): Promise<ListTicketByEventDataReturns> {
    const ticket = await this.ticketList.list({ ...queryParams, event_id });
    return ticket;
  }
}
