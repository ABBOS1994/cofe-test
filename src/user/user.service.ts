import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { FindOptionsWhere, ILike, Like, Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { JwtPayloadType } from 'src/common/types/type'
import { JwtService } from '@nestjs/jwt'
import { FilterDto } from './dto/filter-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { phone: createUserDto.phone },
    })

    if (existingUser) {
      throw new HttpException('User already registered', HttpStatus.CONFLICT)
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12)
    const newUser = this.userRepository.create(createUserDto)
    return this.userRepository.save(newUser)
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { phone: loginDto.phone },
    })

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    )

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED)
    }

    const payload: JwtPayloadType = { sub: user.phone }
    return this.jwtService.signAsync(payload, {
      secret: 'salom',
      expiresIn: '24h',
    })
  }

  async findAll(filterDto: FilterDto) {
    const { firstName, lastName, phone, role } = filterDto

    const filter: FindOptionsWhere<UserEntity> = {
      ...(firstName && { firstName: ILike(`%${firstName}%`) }),
      ...(lastName && { lastName: ILike(`%${lastName}%`) }),
      ...(phone && { phone: Like(`%${phone}%`) }),
      ...(role && { role }),
    }

    return this.userRepository.find({ where: filter })
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id, isDeleted: false } })
  }

  async findPhone(phone: string) {
    return this.userRepository.findOne({ where: { phone, isDeleted: false } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, phone, role, isActive, password } =
      updateUserDto

    const updatedData = {
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(phone && { phone }),
      ...(role && { role }),
      ...(isActive !== undefined && { isActive }),
      ...(password && { password: await bcrypt.hash(password, 12) }),
    }

    await this.userRepository.update(id, updatedData)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.userRepository.update(id, { isDeleted: true })
    return { message: 'User deleted successfully' }
  }
}
