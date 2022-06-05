import * as DotEnv from 'dotenv';
DotEnv.config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception/filter/httpException.filter';
import { ErrorExceptionFilter } from './shared/exception/filter/errorException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Banking System')
    .setDescription('Banking System API')
    .setVersion('1.0')
    .build();
  app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
