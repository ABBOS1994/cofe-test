import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    description: 'image',
    required: false,
  })
  @IsString()
  @IsOptional()
  image: string | null;

  @ApiProperty({
    type: Number,
    description: 'price',
  })
  @Type(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: Number,
    description: 'amount',
  })
  @Type(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    type: Number,
    description: 'category_id',
  })
  @Type(()=>Number)
  @IsNumber()
  @IsNotEmpty()
  category_id: number;
}
