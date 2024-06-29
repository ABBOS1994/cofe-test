import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator'

export class LoginDto {
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
}
