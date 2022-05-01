import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RedisContext,
} from '@nestjs/microservices';
import { BillingServiceCmd } from 'shared/cmd/BillingServiceCmd';
import { BillingPayloadDto } from 'shared/dtos/payloads/billing-payload.dto';
import { ShippingServiceService } from './shipping-service.service';

@Controller()
export class ShippingServiceController {
  constructor(
    private readonly shippingServiceService: ShippingServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.shippingServiceService.getHello();
  }

  @MessagePattern(BillingServiceCmd.billing)
  async getBilling(
    @Payload() data: BillingPayloadDto,
    @Ctx() context: RedisContext,
  ): Promise<void> {
    const logger = new Logger('Shipping Service: getBilling');

    logger.log(
      `Receipt  from Channel: ${context.getChannel()} => ${JSON.stringify(
        data,
      )}`,
    );

    if (data.billing === true) {
      return this.shippingServiceService.runShipping(data);
    }
  }
}
