import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_URL } from '../../config/environments/server';

export const swagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Event API')
    .setExternalDoc('Schemas', `/${SWAGGER_URL}-json`)
    .setContact(
      'Bernardo',
      'https://github.com/bernardorz',
      'bernardo.dev@gmail.com',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(SWAGGER_URL, app, document);
};
