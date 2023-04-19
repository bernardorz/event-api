import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { Conflict } from '../../presentation/http/errors/conflict';
import { DeepPartial, Repository } from 'typeorm';
import {
  AddAcountModel,
  AddAcount,
} from 'src/domain/usecases/account/create-account';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { AccountDataTransferObject } from 'src/presentation/modules/account/dto/add-acount-dto';

@Injectable()
export class AddAcountImplemantation implements AddAcount {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
  ) {}

  async add({
    name,
    email,
    password,
  }: AddAcountModel): Promise<DeepPartial<AddAcountModel>> {
    const accountAlreadyCreated = await this.repository.findOne({
      where: {
        email: email,
      },
    });

    if (accountAlreadyCreated) {
      throw new HttpException(
        new Conflict('Email already used'),
        HttpStatus.CONFLICT,
      );
    }

    const account = await this.repository.save({
      name,
      email,
      password: await hash(password, 8),
    });

    return new AccountDataTransferObject({
      email: account.email,
      id: account.id,
      name: account.name,
    });
  }
}
