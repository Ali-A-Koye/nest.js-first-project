module.exports = (table) => {
	table.boolean('active').notNullable().defaultTo(1);
	table.boolean('deleted').notNullable().defaultTo(0);
	table.datetime('created_at', { precision: 6 });
	table.datetime('updated_at', { precision: 6 });
	table.integer('created_by').notNullable().defaultTo(0);
	table.integer('updated_by').notNullable().defaultTo(0);
	table.charset('utf8mb4');
	// table.collate('utf8mb4_0900_ai_ci');
	return table;
};
