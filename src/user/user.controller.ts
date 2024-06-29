import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FilterDto } from './dto/filter-user.dto'
import { RoleGuard } from 'src/common/guards/role.guard'
import { AuthGuard } from 'src/common/guards/auth.guard'
import { Roles } from 'src/decorators/role'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { LoginDto } from './dto/login.dto'

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto)
  }

  // @ApiBearerAuth()
  // @UseGuards(RoleGuard)
  // @UseGuards(AuthGuard)
  // @Roles('admin')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Get()
  findAll(@Query() findUserDto?: FilterDto) {
    return this.userService.findAll(findUserDto)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @ApiBearerAuth()
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
