import { CanActivate, ExecutionContext } from '@nestjs/common';
import { debuglog } from 'util';

export class UserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    //here for Validating or Role System , and you have acess to current User

    if (!request.user) return false;
    return true;
  }
}
