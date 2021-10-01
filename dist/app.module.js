"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const nest_knexjs_1 = require("nest-knexjs");
const product_module_1 = require("./product/product.module");
require("dotenv").config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_knexjs_1.KnexModule.forRoot({
                config: {
                    client: 'mysql',
                    version: '5.7',
                    useNullAsDefault: true,
                    connection: {
                        host: process.env.HOST,
                        user: process.env.DB_USER,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                    },
                },
            }),
            product_module_1.ProductModule,
        ],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map