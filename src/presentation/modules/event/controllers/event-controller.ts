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
import { BadRequest, Conflict } from '../../../http/errors/index';

import { EventModel } from 'src/domain/models/event';
import { DeepPartial } from 'typeorm';
import { AddEventImplementation } from 'src/data/usecases/events/add-event';
import { ListEventImplementation } from 'src/data/usecases/events/list-events';
import { AuthGuard } from 'src/presentation/guard/auth.guard';
import { ListEventDataReturns } from 'src/domain/usecases/event/list-event';
import { ListEventByCompanyImplementation } from 'src/data/usecases/events/list-events-by-company';
import { FindByIdQueryParams } from '../dto/list-event-dto';
import { Authorize } from 'src/presentation/guard/session';
import { EventDataTransferObject } from '../dto/add-event-dto';

@ApiTags('Event')
@Controller('api/event')
export class EventController {
  constructor(
    private readonly addEvent: AddEventImplementation,
    private readonly ListEvents: ListEventImplementation,
    private readonly ListEventByCompany: ListEventByCompanyImplementation,
  ) {}

  @Post()
  @Authorize(['MANAGER'])
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
    @Body() body: EventDataTransferObject,
  ): Promise<DeepPartial<EventModel>> {
    const user = await this.addEvent.add({ ...body });
    return user;
  }

  @Get()
  @Authorize(['MANAGER', 'USER'])
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'List events' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'event successfully created',
    type: Object,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'invalid payload query params',
    type: BadRequest,
  })
  async list(
    @Query(ValidationPipe) query: FindByIdQueryParams,
  ): Promise<ListEventDataReturns> {
    const { page, ...queryParams } = query;
    const events = await this.ListEvents.list({
      page: page === 0 ? 1 : page,
      ...queryParams,
    });

    return events;
  }

  @Get('/company/:id')
  @Authorize(['MANAGER', 'USER'])
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
    description: 'invalid payload query params',
    type: Conflict,
  })
  async listByAccount(
    @Query(ValidationPipe) query: FindByIdQueryParams,
    @Param('id') company_id: string,
  ): Promise<ListEventDataReturns> {
    const { limit, page, name, endAt, startAt } = query;

    const events = await this.ListEventByCompany.list({
      limit,
      page: page === 0 ? 1 : page,
      name,
      startAt,
      endAt,
      company_id: Number(company_id),
    });

    return events;
  }
}
