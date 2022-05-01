import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OrderServiceModule } from './order-service.module';

const logger = new Logger('Order Service');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    OrderServiceModule,
    {
      cors: true,
    },
  );

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validationError: { target: true, value: true },
      forbidUnknownValues: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: redis_url,
    },
  });

  await app.startAllMicroservices();

  const service_port = process.env.ORDER_SERVICE_PORT || 3001;
  await app.listen(service_port, () =>
    logger.log(`Order Service is listening on port ${service_port}`),
  );
}
bootstrap();
