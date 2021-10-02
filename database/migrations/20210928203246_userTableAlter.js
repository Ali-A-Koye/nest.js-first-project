exports.up = (knex) => knex.schema.alterTable('user', (table) => {
    table.text('salt',350).notNullable();

});

exports.down = (knex) => knex.schema.alterTable('user', (table) => {
	table.dropColumn('salt');
});