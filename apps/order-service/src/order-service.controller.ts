import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { Order } from '@prisma/client';
import { BillingServiceCmd } from 'shared/cmd/BillingServiceCmd';
import { ShippingServiceCmd } from 'shared/cmd/ShippingServiceCmd';
import { BillingPayloadDto } from 'shared/dtos/payloads/billing-payload.dto';
import { ShippingPayloadDto } from 'shared/dtos/payloads/shipping-payload.dto';
import { CreateOrderDto } from './dtos/create-orde.dto';
import { OrderServiceService } from './order-service.service';

@Controller()
export class OrderServiceController {
  constructor(private readonly orderServiceService: OrderServiceService) {}

  @Get()
  getHello(): string {
    return this.orderServiceService.getHello();
  }

  @Post('order')
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderServiceService.createOrder(createOrderDto);
  }

  @Get('orders')
  async getOrders(): Promise<Order[]> {
    return this.orderServiceService.getOrders();
  }

  @Get('orders/:id')
  async getOneOrder(@Payload() id: number): Promise<Order> {
    return this.orderServiceService.getOneOrder(id);
  }

  @Get('clean')
  async cleanOrder(): Promise<string> {
    return this.orderServiceService.cleanOrder();
  }

  @MessagePattern(BillingServiceCmd.billing)
  async getBilling(
    @Payload() data: BillingPayloadDto,
    @Ctx() context: RedisContext,
  ): Promise<void> {
    const logger = new Logger('Order Service: getBilling');

    logger.log(
      `Receipt  from Channel: ${context.getChannel()} => ${JSON.stringify(
        data,
      )}`,
    );

    return this.orderServiceService.updateBillingOrder(data);
  }

  @MessagePattern(ShippingServiceCmd.shipping)
  async getShipping(
    @Payload() data: ShippingPayloadDto,
    @Ctx() context: RedisContext,
  ) {
    const logger = new Logger('Order Service: getShipping');

    logger.log(
      `Receipt  from Channel: ${context.getChannel()} => ${JSON.stringify(
        data,
      )}`,
    );

    return this.orderServiceService.updateShippingStatus(data);
  }
}
