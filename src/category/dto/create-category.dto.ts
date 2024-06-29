import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { ProductEntity } from 'src/product/entities/product.entity'

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'name',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  products: ProductEntity[]
}
