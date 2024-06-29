import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { UserService } from 'src/user/user.service'
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    readonly jwtService: JwtService,
    readonly reflector: Reflector,
    readonly userService: UserService
  ) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    const user = request?.user
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    const findUser = await this.userService.findPhone(user)
    const checkRole = roles.some((role) => role == findUser.role)
    if (checkRole) {
      return true
    }
    return false
  }
}
