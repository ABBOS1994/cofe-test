import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: 'name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({
    type: String,
    description: 'image',
    required: false,
  })
  @IsString()
  @IsOptional()
  image: string

  @ApiProperty({
    type: Number,
    description: 'price',
    required: false,
  })
  @Type(()=>Number)
  @IsNumber()
  @IsOptional()
  price: number

  @ApiProperty({
    type: Number,
    description: 'amount',
    required: false,
  })
  @Type(()=>Number)
  @IsNumber()
  @IsOptional()
  amount: number

  @ApiProperty({
    type: Number,
    description: 'category_id',
  })
  @Type(()=>Number)
  @IsNumber()
  @IsOptional()
  category_id: number

  @ApiProperty({
    type: Boolean,
    description: 'isActive',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
