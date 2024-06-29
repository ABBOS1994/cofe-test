import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductEntity } from './entities/product.entity'
import { FilterProductDto } from './dto/filter.dto'

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto)
    const product = await this.productRepository.save(newProduct)
    return product
  }

  async findAll(findProductDto: FilterProductDto) {
    const { name, page, limit, price, category_id, date } = findProductDto;
  
    const startDate = date ? new Date(date) : null;
    const endDate = date ? new Date(date) : null;
  
    if (startDate && endDate) {
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
    }
  
    const filter: FindOptionsWhere<ProductEntity> = {
      ...(name ? { name: ILike(`%${name}%`) } : {}),
      ...(price ? { price: price } : {}),
      ...(category_id ? { category_id: category_id } : {}),
      ...(date ? { createdAt: Between(startDate, endDate) } : {}),
    };
  
    let pagination = {};
    if (page && limit) {
      pagination = { skip: (+page - 1) * +limit, take: +limit };
    }
  
    const products = await this.productRepository.find({
      where: filter,
      ...pagination,
    });
  
    return products;
  }
  

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id: id, isDeleted: false },
    })
    return product
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    const { category_id, name, amount, price, image, isActive } =
      updateProductDto
    const updateProduct = {
      ...(category_id ? { category_id } : {}),
      ...(name ? { name } : {}),
      ...(amount ? { amount } : {}),
      ...(price ? { price } : {}),
      ...(image ? { image } : {}),
      ...(isActive ? { isActive } : {}),
    }
   await this.productRepository.update(id, updateProduct)
    return this.findOne(id)
  }

  async remove(id: number) {
     await this.productRepository.update(id, { isDeleted: true })
    return "ok";
  }
}
