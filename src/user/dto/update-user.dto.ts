import {
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Roles } from 'src/common/types/type'

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    description: 'firstName',
    required: false,
  })
  @IsString()
  @IsOptional()
  firstName: string

  @ApiProperty({
    type: String,
    description: 'lastName',
    required: false,
  })
  @IsString()
  @IsOptional()
  lastName: string

  @ApiProperty({
    type: String,
    description: 'phone',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone: string

  @ApiProperty({
    type: String,
    description: 'password',
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsStrongPassword()
  password: string

  @ApiProperty({
    type: String,
    description: 'role',
    required: false,
  })
  @IsString()
  @IsEnum(Roles)
  @IsOptional()
  role: Roles

  @ApiProperty({
    type: Boolean,
    description: 'isActive',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
