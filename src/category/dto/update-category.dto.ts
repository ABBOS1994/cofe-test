import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsBoolean } from 'class-validator'

export class UpdateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'name',
    required: false,
  })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({
    type: Boolean,
    description: 'isActive',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
