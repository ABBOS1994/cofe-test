import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNotEmpty, IsNumber } from 'class-validator'

export class FilterProductDto {
  @ApiProperty({
    type: String,
    description: 'name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({
    type: Number,
    description: 'price',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  price: number

  @ApiProperty({
    type: String,
    description: 'page',
    required: false,
  })
  @IsString()
  @IsOptional()
  page: string

  @ApiProperty({
    type: Number,
    description: 'category_id',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  category_id: number

  @ApiProperty({
    type: String,
    description: 'limit',
    required: false,
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
