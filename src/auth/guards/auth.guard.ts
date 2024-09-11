import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { configs } from '../../core/configs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const authHeader = context.switchToHttp().getRequest()
        .headers.authorization;

      if (!authHeader) throw new UnauthorizedException('Unauthorized');

      const token = authHeader.split(' ')[1];

      const tokenData = jwt.verify(token, configs.ACCESS_TOKEN_SECRET);

      return !!tokenData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
