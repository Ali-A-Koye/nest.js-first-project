import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';
export declare class CurrentUserMiddleware implements NestMiddleware {
    private readonly userService;
    constructor(userService: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
