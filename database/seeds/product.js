exports.seed = (knex) => knex('product').del()
	.then(() => knex('product').insert([
		{
			id: 1,
			name: 'product',
		},
	]));
