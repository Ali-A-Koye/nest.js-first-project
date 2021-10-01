const defualts = require('../extra/defualtColumns');

exports.up = (knex) => knex.schema.createTable('product', (table) => {
	table.increments('id').primary();
	table.text('name', 350).notNullable();
	table.text('price', 350).notNullable();
  table.boolean('is_sold').notNullable().defaultTo(0);
	table.datetime('sold_at', { precision: 6 });
  table.integer('sold_by').notNullable().defaultTo(0);
	defualts(table);
});

exports.down = (knex) => knex.schema.dropTable('user');
