import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order';
import { UpdateOrderDto } from './dto/update-order';
import { FilterOrderDto } from './dto/filter.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    getAll(@Query() findOrderDto?: FilterOrderDto) {
        return this.orderService.findAll(findOrderDto)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.orderService.findOneById(parseInt(id))
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    create(@Body() body: CreateOrderDto) {
        return this.orderService.create(body)
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch('/:id')
    updateSubCategory(@Param('id') id: string, @Body() body: UpdateOrderDto) {
        return this.orderService.update(parseInt(id), body);
    }


    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('/:id')
    dleteCategory(@Param('id') id: string) {
        return this.orderService.delete(parseInt(id));
    }

}
