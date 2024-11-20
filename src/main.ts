import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { VersioningType } from '@nestjs/common';
import * as hbs from 'hbs';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useStaticAssets(join(__dirname, '..', 'public')); // Serve static assets from 'public' folder

  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  app.enableVersioning({
    defaultVersion: ['1', '2'],
    type: VersioningType.URI
  });

  hbs.registerHelper('formatDate', (date, locale = 'en-US') => {
    return new Date(date).toLocaleString(locale);
  });

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('users') // Add tags if needed
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header', // Ensure the JWT is passed in the header
      },
      'access-token', // This is the key that Swagger will use to identify the token in API requests.
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI will be available at /api
  
  await app.listen(3000);
}
bootstrap();
