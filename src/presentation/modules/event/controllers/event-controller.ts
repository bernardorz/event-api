import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AddEventData } from 'src/domain/usecases/event/create-event';
import { BadRequest, Conflict } from '../../../http/errors/index';

import { EventModel } from 'src/domain/models/event';
import { DeepPartial } from 'typeorm';
import { AddEventImplementation } from 'src/data/usecases/add-event';
import { ListEventImplementation } from 'src/data/usecases/list-events';
import { AuthGuard } from 'src/presentation/guard/auth.guard';
import { ListEventDataReturns } from 'src/domain/usecases/event/list-event';
import { ListEventByAccountImplementation } from 'src/data/usecases/list-events-by-account';
import { FindByIdQueryParams } from '../dto/list-event-dto';

@ApiTags('Account')
@Controller('api/event')
export class EventController {
  constructor(
    private readonly addEvent: AddEventImplementation,
    private readonly ListEvents: ListEventImplementation,
    private readonly ListEventByAccount: ListEventByAccountImplementation,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'event successfully created',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Event already created',
    type: Conflict,
  })
  async add(
    @Request() request,
    @Body() body: AddEventData,
  ): Promise<DeepPartial<EventModel>> {
    const { sub } = request['user'];
    const user = await this.addEvent.add({ ...body, account_id: sub });
    return user;
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List events' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'event successfully created',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Event already created',
    type: Conflict,
  })
  async list(
    @Query(ValidationPipe) query: FindByIdQueryParams,
  ): Promise<ListEventDataReturns> {
    const { limit, page, name, endAt, startAt } = query;
    const events = await this.ListEvents.list({
      limit,
      page: page === 0 ? 1 : page,
      name,
      startAt,
      endAt,
    });

    return events;
  }

  @Get('/responsable/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List events' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'event successfully created',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload body',
    type: BadRequest,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Event already created',
    type: Conflict,
  })
  async listByAccount(
    @Query(ValidationPipe) query: FindByIdQueryParams,
    @Param('id') accout_id: string,
  ): Promise<ListEventDataReturns> {
    const { limit, page, name, endAt, startAt } = query;

    const events = await this.ListEventByAccount.list({
      limit,
      page: page === 0 ? 1 : page,
      name,
      startAt,
      endAt,
      account_id: Number(accout_id),
    });

    return events;
  }
}
