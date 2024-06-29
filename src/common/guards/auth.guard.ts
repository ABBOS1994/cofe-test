import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1]
    const bearer = request.headers.authorization?.split(' ')[0]
    if (!bearer && !token) {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED)
    }
    const decodedToken = this.jwtService.decode(token)
    if (decodedToken == null) {
      throw new HttpException('invalid token', HttpStatus.UNAUTHORIZED)
    }
    request.user = decodedToken['sub']
    return true
  }
}
