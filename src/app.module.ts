import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { ProductModule } from './product/product.module'
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    CategoryModule,
    ProductModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
