import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { BillingServiceCmd } from 'shared/cmd/BillingServiceCmd';
import { BillingPayloadDto } from 'shared/dtos/payloads/billing-payload.dto';
import { NewOrderPayloadDto } from 'shared/dtos/payloads/new-order-payload.dto';

@Injectable()
export class BillingServiceService {
  constructor(@Inject('BILLING_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World! from BillingService';
  }

  async runBilling(newOrderPayloadDto: NewOrderPayloadDto) {
    const { orderId } = newOrderPayloadDto;
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    // const randomBool = Math.random() > 0.5 ? true : false;
    const randomBool = true;

    if (randomBool) {
      return this.client.emit(BillingServiceCmd.billing, {
        orderId: orderId,
        billing: true,
        date: new Date(),
      } as BillingPayloadDto);
    } else {
      return this.client.emit(BillingServiceCmd.billing, {
        orderId: orderId,
        billing: false,
        date: new Date(),
      } as BillingPayloadDto);
    }
  }
}
