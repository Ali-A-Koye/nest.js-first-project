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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const knex_1 = require("knex");
const nest_knexjs_1 = require("nest-knexjs");
const data_service_1 = require("../utils/data/data.service");
let ProductService = class ProductService {
    constructor(knex, dataService) {
        this.knex = knex;
        this.dataService = dataService;
    }
    readDataGridQuery(pageSize, page, filters = [], sortArray = []) {
        const db = this.knex;
        const filter = this.dataService.filter;
        const sorter = this.dataService.sorter;
        const records = db('product')
            .select('product.*', 'user.name as created_by_who')
            .leftJoin('user', 'user.id', 'product.created_by')
            .where('product.deleted', 0)
            .offset(pageSize * page)
            .limit(pageSize);
        filter(filters, records);
        if (sortArray.length === 0)
            records.orderBy('product.id', 'desc');
        sorter(sortArray, records);
        const recordsCount = db('product')
            .count({ count: 'product.id' })
            .where('product.deleted', 0);
        filter(filters, recordsCount);
        return [records, recordsCount];
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nest_knexjs_1.InjectConnection)()),
    __metadata("design:paramtypes", [Function, data_service_1.DataService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map