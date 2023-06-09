import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequest, Conflict, NotFound } from '../../../http/errors/index';

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
import { ListTicketPurchaseDataReturns } from 'src/domain/usecases/ticket/list-ticket-purchase-by-ticket';
import { TicketPurchaseListImplementation } from 'src/data/usecases/ticket/list-ticket-purchase-by-ticket';
import { TicketPurchaseListTransferObject } from '../dto/list-ticket-purchase-dto';

@ApiTags('Ticket')
@Controller('api/ticket')
export class TicketController {
  constructor(
    private readonly addTicket: AddTicketImplementation,
    private readonly ticketPurchase: TicketPurchaseImplementation,
    private readonly ticketList: TicketListImplementation,
    private readonly ticketPurchaseList: TicketPurchaseListImplementation,
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
    @Req() request,
  ): Promise<DeepPartial<TicketPurchaseModel>> {
    const { sub } = request.user;
    const ticket = await this.ticketPurchase.buy({ ...body, account_id: sub });
    return ticket;
  }

  @Get('purchase/:id')
  @Authorize(['MANAGER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List ticket purchase by event id' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'ticket purchase successfully list',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload query params',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Ticket not found',
    type: NotFound,
  })
  async listTicketsPurchase(
    @Query(ValidationPipe) queryParams: TicketPurchaseListTransferObject,
    @Req() request,
    @Param('id') ticket_id: string,
  ): Promise<ListTicketPurchaseDataReturns> {
    const { sub } = request.user;
    const tickets = await this.ticketPurchaseList.list({
      ...queryParams,
      account_id: sub,
      ticket_id: Number(ticket_id),
    });

    return tickets;
  }

  @Get('event/:id')
  @Authorize(['MANAGER,USER'])
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
