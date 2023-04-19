import { EventEntity } from 'src/infrastructure/db/entities/event.entity';
import { AccountDataTransferObject } from '../../account/dto/add-acount-dto';
import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class AccountDataTranformatedObject {
  map(events: EventEntity[]) {
    const formatedEvents = events.map((event: EventEntity) => {
      const { responsable, ...restEventData } = event;

      return {
        ...restEventData,
        responsable: new AccountDataTransferObject({
          email: responsable.email,
          id: responsable.id,
          name: responsable.name,
        }),
      };
    });

    return formatedEvents;
  }
}

export class FindByIdQueryParams {
  @IsInt({ always: true })
  @Transform(({ value }) => parseInt(value))
  page: number;

  @IsInt({
    always: true,
  })
  @Transform(({ value }) => parseInt(value))
  limit: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsDateString()
  startAt: Date;

  @IsOptional()
  @IsDateString()
  endAt: Date;
}
