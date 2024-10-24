import { Module } from '@nestjs/common';
import { AccoutController } from './controllers/account-controller';
import { AuthenticationController } from './controllers/authentication-controller';
import { AddAcountImplemantation } from 'src/modules/account/add-acount';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Account } from 'src/infrastructure/db/entities/account.entity';
import { Repository } from 'typeorm';
import { AuthenticationImplementation } from 'src/modules/account/authentication';
import { JwtService } from '@nestjs/jwt';
import { BcryptjsImplementation } from 'src/infrastructure/bcrypt/compare';
import {
  TOKEN_SECRET,
  TOKEN_EXPIRATION_IN_MILLISECONDS,
} from 'src/config/environments/authentication';
import { Role } from 'src/infrastructure/db/entities/role.entity';
import { Company } from 'src/infrastructure/db/entities/company.entity';
import { ListAccountsImplementation } from 'src/modules/account/list-account';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Account, Role, Company]),
    JwtModule.register({
      global: true,
      secret: TOKEN_SECRET,
      signOptions: {
        expiresIn: `${TOKEN_EXPIRATION_IN_MILLISECONDS / 1000}s`,
      },
    }),
  ],
  controllers: [AccoutController, AuthenticationController],
  providers: [
    AddAcountImplemantation,
    Repository,
    AuthenticationImplementation,
    ListAccountsImplementation,
    JwtService,
    BcryptjsImplementation,
  ],
})
export class AccountModule {}
