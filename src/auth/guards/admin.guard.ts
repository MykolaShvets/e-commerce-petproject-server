import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

import { configs } from '../../core/configs';
import { IJwtPayload } from '../dto/jwt.interface';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const token = context
        .switchToHttp()
        .getRequest()
        .headers.authorization.split(' ')[1];

      const tokenData = jwt.verify(
        token,
        configs.ACCESS_TOKEN_SECRET,
      ) as IJwtPayload;

      if (tokenData.role !== 'admin') {
        return false;
      }

      return false;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
