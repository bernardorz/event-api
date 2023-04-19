import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { Role } from 'src/infrastructure/db/entities/role.entity';
import { Company } from 'src/infrastructure/db/entities/company.entity';

@Injectable()
export class AddAcountImplemantation implements AddAcount {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
    @InjectRepository(Role)
    private readonly RolesRepository: Repository<Role>,
    @InjectRepository(Company)
    private readonly CompanyRepository: Repository<Company>,
  ) {}

  private company: Company;

  async add({
    name,
    email,
    password,
    permission,
    company_id,
  }: AddAcountModel): Promise<DeepPartial<AddAcountModel>> {
    if (permission === 'MANAGER') {
      const company = await this.CompanyRepository.findOne({
        where: {
          id: company_id,
        },
      });

      if (!company) {
        throw new NotFoundException('Company not found');
      }

      this.company = company;
      console.log({ company: this.company });
    }

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

    const roles = await this.RolesRepository.createQueryBuilder('role')
      .where('role.initials = :permission', { permission })
      .select(['role.id', 'role.initials'])
      .getMany();

    console.log({
      name,
      email,
      password: await hash(password, 8),
      roles: roles,
      company: this.company,
    });

    const account = await this.repository.save({
      name,
      email,
      password: await hash(password, 8),
      roles: roles,
      company: this.company,
    });

    return new AccountDataTransferObject({
      id: account.id,
      email: account.email,
      name: account.name,
      company: account.company,
    });
  }
}
