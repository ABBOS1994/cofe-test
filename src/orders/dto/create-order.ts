import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export class CreateOrderDto {
  @ApiProperty({
    type: Number,
    description: 'priceAll',
  })
  @Type(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  priceAll: number;

  @ApiProperty({
    type: Number,
    description: 'quantity',
  })
  @Type(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsOptional()
  @Allow() 
  product: ProductEntity;

  @ApiProperty()
  @IsOptional()
  @Allow()
  user: UserEntity;
}
