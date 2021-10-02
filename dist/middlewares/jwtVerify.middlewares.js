"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtVerifyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt = require("jsonwebtoken");
let JwtVerifyMiddleware = class JwtVerifyMiddleware {
    constructor(userService) {
        this.userService = userService;
    }
    async use(req, res, next) {
        try {
            const { authorization } = req.headers;
            if (!authorization)
                next(new common_1.UnauthorizedException('Invalid Token Provided!'));
            const parts = authorization.split(' ');
            if (parts[1]) {
                try {
                    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
                    req.user = decoded;
                    next();
                }
                catch (err) {
                    next(new common_1.UnauthorizedException("You don't have access to this Route!"));
                }
            }
            else {
                next(new common_1.UnauthorizedException('invalid token provided!'));
            }
        }
        catch (err) {
            next(new common_1.InternalServerErrorException());
        }
    }
};
JwtVerifyMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], JwtVerifyMiddleware);
exports.JwtVerifyMiddleware = JwtVerifyMiddleware;
//# sourceMappingURL=jwtVerify.middlewares.js.map