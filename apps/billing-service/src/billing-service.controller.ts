import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { OrderServiceCmd } from 'shared/cmd/OrderServiceCmd';
import { NewOrderPayloadDto } from 'shared/dtos/payloads/new-order-payload.dto';
import { BillingServiceService } from './billing-service.service';

@Controller()
export class BillingServiceController {
  constructor(private readonly billingServiceService: BillingServiceService) {}

  @Get()
  getHello(): string {
    return this.billingServiceService.getHello();
  }

  @MessagePattern(OrderServiceCmd.newOrder)
  getNewOrder(
    @Payload() data: NewOrderPayloadDto,
    @Ctx() context: RedisContext,
  ) {
    const logger = new Logger('Billing Service: getNewOrder');

    logger.log(
      `Receipt from Channel: ${context.getChannel()} => ${JSON.stringify(
        data,
      )}`,
    );

    this.billingServiceService.runBilling(data);
  }
}
