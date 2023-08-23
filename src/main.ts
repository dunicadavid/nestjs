import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { HttpStatus } from '@nestjs/common';
import { CronService } from './providers/cron.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule, { logger: ['debug'] });

  //cronjobs
  const cronService = app.get(CronService);

  //OpenAPI
  const config = new DocumentBuilder()
    .setTitle('Users-Meetings API')
    .setDescription('Testing Nest features.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
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
