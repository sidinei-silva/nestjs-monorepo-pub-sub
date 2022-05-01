import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BillingServiceController } from './billing-service.controller';
import { BillingServiceService } from './billing-service.service';

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BILLING_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: redis_url,
        },
      },
    ]),
  ],
  controllers: [BillingServiceController],
  providers: [BillingServiceService],
})
export class BillingServiceModule {}
