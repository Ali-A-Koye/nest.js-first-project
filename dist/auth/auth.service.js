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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../user/user.service");
const sha1 = require('sha1');
let AuthService = class AuthService {
    constructor(knex, userService) {
        this.knex = knex;
        this.userService = userService;
    }
    async login(username, password) {
        const db = this.knex;
        return db.transaction(async (trx) => {
            const [user] = await trx('user')
                .select()
                .where('username', username)
                .andWhere('active', 1)
                .andWhere('deleted', 0)
                .limit(1);
            if (!user || !user.id)
                throw new common_1.UnauthorizedException('Invalid Username');
            const [userWithPassword] = await trx('user')
                .where('user.id', user.id)
                .andWhere('password', sha1(user.salt + password))
                .limit(1);
            if (!userWithPassword || !userWithPassword.id)
                throw new common_1.UnauthorizedException('Invalid Password');
            const token = jwt.sign(Object.assign({}, userWithPassword), process.env.JWT_SECRET, {
                expiresIn: '362d',
            });
            return {
                user: userWithPassword,
                token: token,
            };
        });
    }
    async signup(data) {
        const salt = 'erf3443rr44r';
        let { name, username, password } = data;
        password = sha1(salt + password);
        await this.userService.create({
            name,
            username,
            password,
            active: true,
            salt,
        });
        const token = jwt.sign({ name, username }, process.env.JWT_SECRET, {
            expiresIn: '362d',
        });
        return {
            user: { name, username },
            token: token,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function, user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map