import { ApiProperty } from '@nestjs/swagger'
import {
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator'
import { Roles } from 'src/common/types/type'

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'firstName',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty({
    type: String,
    description: 'lastName',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty({
    type: String,
    description: 'phone',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string

  @ApiProperty({
    type: String,
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string

  @ApiProperty({
    type: String,
    description: 'role',
  })
  @IsString()
  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles
}
