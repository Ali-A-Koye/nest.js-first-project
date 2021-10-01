exports.seed = (knex) => knex('user').del()
	.then(() => knex('user').insert([
		{
			id: 1,
			name: 'First User',
			username:"first@user",
			password:"---",
			active:1,
			deleted:0,
			created_at:knex.fn.now(),
			created_by:0
		},
	]));
