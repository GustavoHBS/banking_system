import * as DotEnv from 'dotenv';
DotEnv.config();
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception/filter/httpException.filter';
import { ErrorExceptionFilter } from './shared/exception/filter/errorException.filter';
import { RedocModule } from 'nestjs-redoc';

function addDoc(app: INestApplication) {
  const title = 'Banking System';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription('Banking System API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  return RedocModule.setup('/docs', app, document, {
    title,
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3000;
  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new ErrorExceptionFilter(), new HttpExceptionFilter());
  await addDoc(app);
  await app.listen(PORT);
}
bootstrap();
