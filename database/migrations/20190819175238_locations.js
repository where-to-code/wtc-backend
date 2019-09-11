exports.up = knex =>
  knex.schema.createTable('locations', table => {
    table.increments();
    table.text('name', 100).notNullable();
    table.text('description').notNullable();
    table.string('image_url').notNullable();
    table.string('address', 250).notNullable();
    table.string('longitude', 100).notNullable();
    table.string('latitude', 100).notNullable();
    table.string('place_id', 100);
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });

exports.down = knex => knex.schema.dropTableIfExists('locations');
