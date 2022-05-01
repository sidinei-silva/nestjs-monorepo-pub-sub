import { IsInt, IsString } from 'class-validator';

export class ShippingPayloadDto {
  @IsInt()
  orderId: number;

  @IsString()
  statusShipping: string;

  date: Date;
}
