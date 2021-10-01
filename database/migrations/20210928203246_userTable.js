const defualts = require('../extra/defualtColumns');

exports.up = (knex) => knex.schema.createTable('user', (table) => {
	table.increments('id').primary();
	table.text('name', 350).notNullable();
	table.text('username', 350).notNullable();
	table.text('password',350).notNullable();
    
	defualts(table);
});

exports.down = (knex) => knex.schema.dropTable('user');
