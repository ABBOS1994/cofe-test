import { BaseEntity } from 'src/common/database/base.entity'
import { CategoryEntity } from 'src/category/entities/category.entity'
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { OrdersEntity } from 'src/orders/entities/orders.entity'

@Entity('Product')
export class ProductEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 64, nullable: true })
  name: string

  @Column({ type: 'int', nullable: true })
  price: number

  @Column({ type: 'int', nullable: true })
  amount: number

  @Column({ type: 'int', nullable: true })
  @Index()
  category_id: number

  @Column({ type: 'varchar', nullable: true })
  image: string

  @ManyToOne(() => CategoryEntity, (category_id) => category_id.products, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: CategoryEntity

  @OneToMany(()=>OrdersEntity,(orders)=>orders.product)
  orders:OrdersEntity[]
}
