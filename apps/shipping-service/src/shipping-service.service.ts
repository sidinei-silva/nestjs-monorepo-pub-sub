import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ShippingServiceCmd } from 'shared/cmd/ShippingServiceCmd';
import { ShippingPayloadDto } from 'shared/dtos/payloads/shipping-payload.dto';

@Injectable()
export class ShippingServiceService {
  constructor(@Inject('SHIPPING_SERVICE') private client: ClientProxy) {}

  getHello(): string {
    return 'Hello World! from ShippingService';
  }

  async runShipping({ orderId }: { orderId: number }) {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await this.client.emit(ShippingServiceCmd.shipping, {
      orderId: orderId,
      statusShipping: 'enviado a transportadora',
      date: new Date(),
    } as ShippingPayloadDto);

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await this.client.emit(ShippingServiceCmd.shipping, {
      orderId: orderId,
      statusShipping: 'a caminho do destinatário',
      date: new Date(),
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });

    await this.client.emit(ShippingServiceCmd.shipping, {
      orderId: orderId,
      statusShipping: 'produto recebido',
      date: new Date(),
    });
  }
}
