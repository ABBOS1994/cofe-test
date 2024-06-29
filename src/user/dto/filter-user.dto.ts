import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Roles } from 'src/common/types/type'

export class FilterDto {
  @ApiProperty({
    type: String,
    description: 'firstName',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName?: string

  @ApiProperty({
    type: String,
    description: 'LastName',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName?: string

  @ApiProperty({
    type: String,
    description: 'phone',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string

  @ApiProperty({
    type: String,
    description: 'role',
    required: false,
  })
  @IsString()
  @IsEnum(Roles)
  @IsOptional()
  role?: Roles
}
