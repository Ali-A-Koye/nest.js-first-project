import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserService } from 'src/user/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtVerifyMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;

      if (!authorization)
        next(new UnauthorizedException('Invalid Token Provided!'));
      const parts = authorization.split(' ');
      if (parts[1]) {
        try {
          const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
          // @ts-ignore
          req.user = decoded;
          next();
        } catch (err) {
          next(
            new UnauthorizedException("You don't have access to this Route!"),
          );
        }
      } else {
        next(new UnauthorizedException('invalid token provided!'));
      }
    } catch (err) {
      next(new InternalServerErrorException());
    }
  }
}
