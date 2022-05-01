import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BillingServiceModule } from './billing-service.module';

const logger = new Logger('Billing Service');

async function bootstrap() {
  const app = await NestFactory.create(BillingServiceModule);

  const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
  await app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: redis_url,
    },
  });

  await app.startAllMicroservices();

  const service_port = process.env.BILLING_SERVICE_PORT || 3003;
  await app.listen(service_port, () =>
    logger.log(`Billing Service is listening on port ${service_port}`),
  );
}
bootstrap();
