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
exports.userSerializeDTO = exports.userPatchDTO = exports.PostorPutDTO = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PostorPutDTO {
}
__decorate([
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], PostorPutDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], PostorPutDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(10),
    __metadata("design:type", String)
], PostorPutDTO.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PostorPutDTO.prototype, "active", void 0);
exports.PostorPutDTO = PostorPutDTO;
class userPatchDTO {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], userPatchDTO.prototype, "active", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], userPatchDTO.prototype, "deleted", void 0);
exports.userPatchDTO = userPatchDTO;
class userSerializeDTO {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], userSerializeDTO.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], userSerializeDTO.prototype, "username", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], userSerializeDTO.prototype, "created_at", void 0);
exports.userSerializeDTO = userSerializeDTO;
//# sourceMappingURL=user.dto.js.map