module.exports = (filters = [], query, equality = '%') => {
    filters.map((filter) => query.andWhere(filter.column, 'like', `${filter.value}${equality}`));
};
//# sourceMappingURL=filter.js.map