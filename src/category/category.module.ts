import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { ProductModule } from 'src/product/product.module'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
import { CategoryEntity } from './entities/category.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    JwtModule.register({}),
    UserModule,
    ProductModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
