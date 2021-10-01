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
exports.DataGridDto = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DataGridDto {
    constructor() {
        this.pageSize = 10;
        this.page = 0;
        this.filters = [];
        this.sortArray = [];
    }
}
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!(0, class_validator_1.isInt)(+value))
            return 10;
        else
            return value > 0 ? +value : 10;
    }),
    __metadata("design:type", Number)
], DataGridDto.prototype, "pageSize", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!(0, class_validator_1.isInt)(+value))
            return 0;
        return value > 0 ? +value : 0;
    }),
    __metadata("design:type", Number)
], DataGridDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        return value.map((val) => {
            val = val.split(':');
            if (!val[0] || !val[1])
                throw new common_1.UnprocessableEntityException("Invalid Filter Format should be columnName:value");
            else
                return { column: val[0], value: val[1] };
        });
    }),
    __metadata("design:type", Array)
], DataGridDto.prototype, "filters", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        return value.map((val) => {
            val = val.split(':');
            if (!val[0] || !val[1])
                return;
            return { column: val[0], value: val[1] };
        });
    }),
    __metadata("design:type", Array)
], DataGridDto.prototype, "sortArray", void 0);
exports.DataGridDto = DataGridDto;
//# sourceMappingURL=common.dto.js.map