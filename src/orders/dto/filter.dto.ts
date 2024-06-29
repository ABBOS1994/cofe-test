import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator'

export class FilterOrderDto {
 @ApiProperty({
    type: Number,
    description: 'price',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  priceAll: number

  @ApiProperty({
    type: String,
    description: 'page',
    required:false
  })
  @IsString()
  @IsOptional()
  page: string

  @ApiProperty({
    type: Number,
    description: 'product_id',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  product_id: number

  @ApiProperty({
    type: String,
    description: 'limit',
    required:false
  })
  @IsString()
  @IsOptional()
  limit: string

  @ApiProperty({
    type: String,
    description: 'date YYY-MM-DD',
    required: false,
  })
  @IsString()
  @IsOptional()
  date: string
}
