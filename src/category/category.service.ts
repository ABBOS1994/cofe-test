import { Injectable, NotFoundException } from '@nestjs/common'
import { Between, FindOptionsWhere, ILike, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToClass } from 'class-transformer'
import { CategoryEntity } from './entities/category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { FilterCategoryDto } from './dto/filter.dto'
import { UserService } from 'src/user/user.service'
import { ProductService } from 'src/product/product.service'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = plainToClass(CategoryEntity, createCategoryDto)
    const category = await this.categoryRepository.save(newCategory)
    return category
  }

  async findAll(findCategoryDto: FilterCategoryDto) {
    const { name, page, limit,date} = findCategoryDto
    const startDate = date ? new Date(date) : null
    const endDate = date ? new Date(date) : null

    if (startDate && endDate) {
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
    }

    const filter: FindOptionsWhere<CategoryEntity> = {
      ...(name ? { name: ILike(`%${name}%`) } : {}),
      ...(date ? { createdAt: Between(startDate, endDate) } : {}),
    }
    let pagination = {};
    if (page && limit) {
      pagination = { skip: (+page - 1) * +limit, take: +limit };
    }

    const categories = await this.categoryRepository.find({
      where: filter,
      ...pagination
    })

    return categories
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id, isDeleted: false },
    })

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }

    return category
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateData = plainToClass(CategoryEntity, updateCategoryDto)
    await this.categoryRepository.update(id, updateData)

    return this.findOne(id)
  }

  async remove(id: number) {
     await this.categoryRepository.update(id, { isDeleted: true })
    return "ok"
  }
}
