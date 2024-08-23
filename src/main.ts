import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: process.env.LOGGING ? ['error', 'warn', 'log'] : false,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const errors = validationErrors.map((error) => {
          return `${Object.values(error.constraints).join(', ')}`;
        });
        return new BadRequestException(errors);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
