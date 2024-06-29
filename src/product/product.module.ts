import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { JwtModule } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { MulterModule } from '@nestjs/platform-express'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    JwtModule.register({}),
    UserModule,
    MulterModule.register({
      dest: join(process.cwd(), 'uploads'),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
