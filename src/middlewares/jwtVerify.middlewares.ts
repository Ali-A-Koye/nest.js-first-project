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
  async use(req: any, res: Response, next: NextFunction) {

    try {
      const { authorization } = req.headers;
      if (!authorization)
        return next(new UnauthorizedException('Invalid Token Provided!')); // It's necessary to return here. Otherwise, code excution will continue and will throw an error.

      const parts = authorization.split(' ');
      if (parts[1]) {
        try {
          const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
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
      next(err); // Just throw the exception that you instantiated above instead of Internal Server Error.
    }
  }
}
