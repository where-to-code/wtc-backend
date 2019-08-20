exports.up = knex =>
  knex.schema.createTable('users', table => {
    table.increments();
    table.string('firstname', 30).notNullable();
    table.string('lastname', 30).notNullable();
    table
      .string('email', 50)
      .notNullable()
      .unique();
    table.string('password', 250).notNullable();
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });

exports.down = knex => knex.schema.dropTableIfExists('users');
