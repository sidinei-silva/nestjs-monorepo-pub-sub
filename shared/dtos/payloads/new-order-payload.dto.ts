import { IsString, IsInt } from 'class-validator';

export class NewOrderPayloadDto {
  @IsInt()
  orderId: number;

  @IsInt()
  value: number;

  @IsInt()
  userId: number;
}
