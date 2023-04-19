import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFound } from '../../presentation/http/errors/';
import { Repository } from 'typeorm';
import {
  AuthModel,
  Authentication,
} from 'src/domain/usecases/account/authentication';
import { auth } from 'src/domain/models/authentication';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import {
  Bcryptjs,
  BcryptjsImplementation,
} from 'src/infrastructure/bcrypt/compare';
import {
  TOKEN_SECRET,
  TOKEN_EXPIRATION_IN_MILLISECONDS,
} from 'src/config/environments/authentication';

@Injectable()
export class AuthenticationImplementation implements Authentication {
  constructor(
    @InjectRepository(Account)
    private readonly repository: Repository<Account>,
    private jwtService: JwtService,
    @Inject(BcryptjsImplementation)
    private Bcrypt: Bcryptjs,
  ) {}

  async auth({ email, password }: AuthModel): Promise<auth> {
    const accountAlreadyCreated = await this.repository.findOne({
      where: {
        email: email,
      },
    });

    if (!accountAlreadyCreated) {
      throw new HttpException(new NotFound(), HttpStatus.CONFLICT);
    }

    const matchPassword = this.Bcrypt.compare(
      password,
      accountAlreadyCreated.password,
    );

    if (!matchPassword) {
      throw new HttpException(
        'Incorrect email or password.',
        HttpStatus.FORBIDDEN,
      );
    }

    const payload = {
      username: accountAlreadyCreated.name,
      sub: accountAlreadyCreated.id,
    };

    const acess_token = await this.jwtService.signAsync(payload, {
      secret: TOKEN_SECRET,
      expiresIn: TOKEN_EXPIRATION_IN_MILLISECONDS,
    });

    return {
      acess_token,
    };
  }
}
