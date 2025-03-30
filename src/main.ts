import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Using whitelist to strip out the elements that are not defined in dto
      whitelist: true,
    }),
  );
  await app.listen(3333);
}
bootstrap();
