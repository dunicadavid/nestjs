import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { HttpStatus } from '@nestjs/common';
import { CronService } from './providers/cron.service';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const cronService = app.get(CronService);
  cronService.startCronJob();
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      forbidUnknownValues: false,
      validationError: { target: true, value: true },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
