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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const data_service_1 = require("../utils/data/data.service");
let UserService = class UserService {
    constructor(knex, dataService) {
        this.knex = knex;
        this.dataService = dataService;
    }
    readDataGridQuery(pageSize, page, filters = [], sortArray = []) {
        const db = this.knex;
        const filter = this.dataService.filter;
        const sorter = this.dataService.sorter;
        const records = db('user')
            .select('user.*')
            .where('user.deleted', 0)
            .offset(pageSize * page)
            .limit(pageSize);
        filter(filters, records);
        if (sortArray.length === 0)
            records.orderBy('user.id', 'desc');
        sorter(sortArray, records);
        const recordsCount = db('user')
            .count({ count: 'user.id' })
            .where('user.deleted', 0);
        filter(filters, recordsCount);
        return [records, recordsCount];
    }
    readListQuery(limit, offset) {
        const db = this.knex;
        return db('user')
            .select('user.*')
            .where('user.deleted', 0)
            .limit(limit)
            .offset(offset);
    }
    readSingleQuery(id) {
        const db = this.knex;
        return db('user')
            .select('user.*')
            .where('user.deleted', 0)
            .andWhere('user.id', id);
    }
    create(body) {
        const db = this.knex;
        return db('user').insert({
            name: body.name,
            username: body.username,
            password: body.password,
            active: body.active,
            created_at: db.fn.now(),
            salt: body.salt,
            created_by: 1,
        });
    }
    update(id, body) {
        const db = this.knex;
        return db('user')
            .update({
            name: body.name,
            username: body.username,
            password: body.password,
            active: body.active,
            salt: body.salt,
            created_at: db.fn.now(),
            created_by: 1,
        })
            .where('id', id);
    }
    patch(id, body) {
        const db = this.knex;
        const updateOb = {};
        if (body.deleted !== undefined)
            updateOb.deleted = body.deleted;
        if (body.active !== undefined)
            updateOb.active = body.active;
        if (Object.entries(body).length === 0)
            throw new common_1.UnprocessableEntityException();
        return db('user')
            .update(updateOb)
            .where('id', id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function, data_service_1.DataService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map