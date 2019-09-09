exports.up = knex =>
  knex.schema.createTable('locations', table => {
    table.increments();
    table.string('a', 100).notNullable();
    table.text('description').notNullable();
    table.string('image_url', 250).notNullable();
    table.string('address', 250).notNullable();
    table.string('longitude', 30).notNullable();
    table.string('latitude', 30).notNullable();
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });

exports.down = knex => knex.schema.dropTableIfExists('locations');
