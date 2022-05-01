import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ShippingServiceController } from './shipping-service.controller';
import { ShippingServiceService } from './shipping-service.service';

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SHIPPING_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: redis_url,
        },
      },
    ]),
  ],
  controllers: [ShippingServiceController],
  providers: [ShippingServiceService],
})
export class ShippingServiceModule {}
