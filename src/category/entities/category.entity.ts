import { ProductEntity } from 'src/product/entities/product.entity'
import { BaseEntity } from 'src/common/database/base.entity'
import { Column, Entity, OneToMany } from 'typeorm'

@Entity('Category')
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 128, nullable: true })
  name: string

  @OneToMany(() => ProductEntity, (member) => member.category, {
    cascade: true,
  })
  products: ProductEntity[]
}
