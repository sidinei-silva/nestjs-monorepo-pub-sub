import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Product {
  @IsString()
  name: string;

  @IsInt()
  price: number;
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => Product)
  products: Product[];
}
