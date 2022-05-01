import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderServiceController } from './order-service.controller';
import { OrderServiceService } from './order-service.service';
import { PrismaService } from './prisma.service';

const redis_url = process.env.REDIS_URL || 'redis://localhost:6379';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.REDIS,
        options: {
          url: redis_url,
        },
      },
    ]),
  ],
  controllers: [OrderServiceController],
  providers: [OrderServiceService, PrismaService],
})
export class OrderServiceModule {}
