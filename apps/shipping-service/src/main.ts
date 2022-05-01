import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ShippingServiceModule } from './shipping-service.module';

const logger = new Logger('Shipping Service');

async function bootstrap() {
  const app = await NestFactory.create(ShippingServiceModule);

  const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      url: redis_url,
    },
  });

  await app.startAllMicroservices();

  const service_port = process.env.SHIPPING_SERVICE_PORT || 3002;
  await app.listen(service_port, () =>
    logger.log(`Shipping Service is listening on port ${service_port}`),
  );
}
bootstrap();
