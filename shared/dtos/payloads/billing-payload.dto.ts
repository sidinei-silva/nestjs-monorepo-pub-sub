import { IsBoolean, IsInt } from 'class-validator';

export class BillingPayloadDto {
  @IsInt()
  orderId: number;

  @IsBoolean()
  billing: boolean;

  date: Date;
}
