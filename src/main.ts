import { json, urlencoded } from 'express';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb' }));

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, () => {
    console.log(`Server listening on ${process.env.PORT}`);
  });
}

bootstrap();
