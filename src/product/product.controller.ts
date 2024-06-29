import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { diskStorage } from 'multer';
import { CreateProductDto } from './dto/create-product.dto'
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { RoleGuard } from 'src/common/guards/role.guard'
import { Roles } from 'src/decorators/role'
import { ProductService } from './product.service'
import { UpdateProductDto } from './dto/update-product.dto'
import { FilterProductDto } from './dto/filter.dto'
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express'
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
let imagePath:string;

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileName = file.originalname.slice(-4);
          imagePath = `${uuidv4()}_${fileName}`;
          cb(null, imagePath);
        },
      }),
    }),
  )
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string'},
        amount:{type:'number'},
        price:{type:'number'},
        category_id:{type:'number'},
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File,) {
    createProductDto.image=`http://localhost:3001/uploads/${imagePath}`
    return this.productService.create(createProductDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Query() findProductDto?: FilterProductDto) {
    return this.productService.findAll(findProductDto)
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id)
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string'},
        amount:{type:'number'},
        price:{type:'number'},
        category_id:{type:'number'},
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const fileName = file.originalname.slice(-4);
          imagePath = `${uuidv4()}_${fileName}`;
          cb(null, imagePath);
        },
      }),
    }),
  )
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@UploadedFile() file: Express.Multer.File) {
    if (file) {
      const existingEvent = await this.productService.findOne(parseInt(id));
      if (existingEvent && existingEvent.image) {
        const oldImagePath = existingEvent.image.replace(
          'http://localhost:3001/uploads/',
          '',
        );
        const oldImageFullPath = join(process.cwd(), 'uploads', oldImagePath);
        if (existsSync(oldImageFullPath)) {
          unlinkSync(oldImageFullPath);
        }
      }
      updateProductDto.image = `http://localhost:3001/uploads/${imagePath}`;
    }
    return this.productService.update(+id, updateProductDto)
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}

