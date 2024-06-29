import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNotEmpty } from 'class-validator'

export class FilterCategoryDto {
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
    description: 'page',
    required: false,
  })
  @IsString()
  @IsOptional()
  page: string

  @ApiProperty({
    type: String,
    description: 'limit',
    required: false,
  })
  @IsString()
  @IsOptional()
  limit: number

  @ApiProperty({
    type: String,
    description: 'date YYY-MM-DD',
    required: false,
  })
  @IsString()
  @IsOptional()
  date: string
}
