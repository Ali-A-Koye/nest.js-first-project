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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const common_dto_1 = require("../utils/validator/common.dto");
const user_dto_1 = require("./dto/user.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    readDataGrid(query) {
        const readData = this.userService.readDataGridQuery(query.pageSize, query.page, query.filters, query.sortArray);
        return Promise.all(readData).then((result) => {
            const [data, [dataCount]] = result;
            const pages = Math.ceil(dataCount.count / query.pageSize);
            return {
                data,
                pages,
                records: dataCount.count,
            };
        });
    }
    readlist(query) {
        const readData = this.userService.readListQuery(query.limit, query.offset);
        if (query.q) {
            readData.andWhere('user.name', 'like', `%${query.q}%`);
        }
        return Promise.resolve(readData);
    }
    readSingle(param) {
        const readData = this.userService.readSingleQuery(param.id);
        return Promise.resolve(readData);
    }
    create(body) {
        const readData = this.userService.create(body);
        return Promise.resolve(readData);
    }
    update(param, body) {
        const readData = this.userService.update(param.id, body);
        return Promise.resolve(readData);
    }
    patch(param, body) {
        const readData = this.userService.patch(param.id, body);
        return Promise.resolve(readData);
    }
};
__decorate([
    (0, common_1.Get)('/grid'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.DataGridDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readDataGrid", null);
__decorate([
    (0, serialize_interceptor_1.Serialize)(user_dto_1.userSerializeDTO),
    (0, common_1.Get)('/list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.DataListDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readlist", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ReadSingleDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "readSingle", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.PostorPutDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ReadSingleDTO,
        user_dto_1.PostorPutDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [common_dto_1.ReadSingleDTO,
        user_dto_1.userPatchDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "patch", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map