import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/environments/server';
import { swagger } from './presentation/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  swagger(app);

  await app.listen(SERVER_PORT, () => {
    console.log(`🚀️ started on: http://localhost:${SERVER_PORT}`);
  });
}
bootstrap();
