import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from '@prisma/client';
import { OrderServiceCmd } from 'shared/cmd/OrderServiceCmd';
import { BillingPayloadDto } from 'shared/dtos/payloads/billing-payload.dto';
import { NewOrderPayloadDto } from 'shared/dtos/payloads/new-order-payload.dto';
import { ShippingPayloadDto } from 'shared/dtos/payloads/shipping-payload.dto';
import { CreateOrderDto } from './dtos/create-orde.dto';
import { PrismaService } from './prisma.service';

@Injectable()
export class OrderServiceService {
  constructor(
    private prisma: PrismaService,
    @Inject('ORDER_SERVICE') private client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World! from OrderService';
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderPrice = createOrderDto.products.reduce(
      (totalValue, { price }) => totalValue + price,
      0,
    );

    const order = await this.prisma.order.create({
      data: {
        userId: createOrderDto.userId,
        price: orderPrice,
        products: { create: createOrderDto.products },
        status: {
          create: {
            status: 'pending',
            date: new Date(),
          },
        },
      },
      include: {
        products: true,
        status: true,
      },
    });

    await this.client.emit(OrderServiceCmd.newOrder, {
      orderId: order.id,
      userId: order.userId,
      value: order.price,
    } as NewOrderPayloadDto);

    return order;
  }

  async getOneOrder(id: number): Promise<Order> {
    return this.prisma.order.findFirst({
      where: {
        id,
      },
      include: {
        products: true,
        status: true,
        statusShipping: true,
      },
    });
  }

  async getOrders(): Promise<Order[]> {
    return this.prisma.order.findMany({
      take: 2,
      orderBy: {
        id: 'desc',
      },
      include: {
        products: true,
        status: true,
        statusShipping: true,
      },
    });
  }

  async cleanOrder(): Promise<string> {
    await this.prisma.order.deleteMany();
    await this.prisma.product.deleteMany();

    return 'Order and products cleaned';
  }

  async updateBillingOrder(billingPayloadDto: BillingPayloadDto) {
    const { orderId, billing, date } = billingPayloadDto;

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    const status = billing ? 'paid' : 'recused';

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        status: { create: { status, date } },
      },
      include: {
        status: true,
      },
    });
  }

  async updateShippingStatus(data: ShippingPayloadDto) {
    const { orderId, statusShipping, date } = data;

    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    await this.prisma.order.update({
      where: { id: order.id },
      data: {
        statusShipping: { create: { status: statusShipping, date } },
      },
      include: {
        statusShipping: true,
      },
    });
  }
}
