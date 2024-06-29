import { ProductEntity } from "src/product/entities/product.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { BaseEntity } from 'src/common/database/base.entity'
import { Column, Entity, ManyToOne } from "typeorm";

@Entity("orders")
export class OrdersEntity extends BaseEntity {
    @Column({ type: "int"})
    quantity: number

    @Column({ type: "int" })
    priceAll: number

    @ManyToOne(()=>ProductEntity, (product)=>product.orders)
    product: ProductEntity

    @ManyToOne(()=>UserEntity, (user)=>user.orders)
    user: UserEntity
}
