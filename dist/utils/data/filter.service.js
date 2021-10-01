"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (filters = [], query, op = 'like') => {
    filters.map((filter) => query.andWhere(filter.column, op, `${filter.value}`));
};
//# sourceMappingURL=filter.service.js.map