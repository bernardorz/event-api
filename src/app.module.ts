import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { connection } from './infrastructure/db/connection/';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(connection)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
