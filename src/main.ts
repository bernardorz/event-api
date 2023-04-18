import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/environments/server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(SERVER_PORT, () => {
    console.log(`🚀️ started on: http://localhost:${SERVER_PORT}`);
  });
}
bootstrap();
