import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Between, FindOptionsWhere, Repository } from 'typeorm'
import { OrdersEntity } from './entities/orders.entity'
import { CreateOrderDto } from './dto/create-order'
import { FilterOrderDto } from './dto/filter.dto'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly orderRepository: Repository<OrdersEntity>
  ) {}

  async findAll(findOrderDto: FilterOrderDto) {
    const { page, limit, priceAll, product_id, date } = findOrderDto
    const startDate = date ? new Date(date) : null
    const endDate = date ? new Date(date) : null

    if (startDate && endDate) {
      startDate.setHours(0, 0, 0, 0)
      endDate.setHours(23, 59, 59, 999)
    }
    const filter:
      | FindOptionsWhere<OrdersEntity>
      | FindOptionsWhere<OrdersEntity>[] = {
      ...(priceAll ? { priceAll: priceAll } : {}),
      ...(product_id ? { product_id: product_id } : {}),
      ...(date ? { createdAt: Between(startDate, endDate) } : {}),
    }
    let pagination = {}
    if (page && limit) {
      pagination = { skip: (+page - 1) * +limit, take: +limit }
    }

    const orders = await this.orderRepository.find({
      where: filter,
      ...pagination,relations:{user:true,product:true}
    })
    return orders
  }

  findOneById(id: number) {
    return this.orderRepository.findOne({
      where: { id },
      relations: { product: true, user: true },
    })
  }

  create(data: CreateOrderDto) {
    const order = this.orderRepository.create(data)
    return this.orderRepository.save(order)
  }

  async update(id: number, attrs: Partial<OrdersEntity>) {
    const orders = await this.orderRepository.findOneBy({ id })

    if (!orders) {
      throw new NotFoundException('orders not found')
    }

    Object.assign(orders, attrs)
    return this.orderRepository.save(orders)
  }

  async delete(id: number) {
    const order = await this.orderRepository.findOneBy({ id })

    if (!order) {
      throw new NotFoundException('order not found')
    }

    return this.orderRepository.remove(order)
  }
}
