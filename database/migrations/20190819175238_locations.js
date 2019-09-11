exports.up = knex =>
  knex.schema.createTable('locations', table => {
    table.increments();
    table.text('name', 100).notNullable();
    table.text('description').notNullable();
    table.text('image_url').notNullable();
    table.text('address', 250).notNullable();
    table.string('longitude').notNullable();
    table.string('latitude').notNullable();
    table.string('place_id');
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });

exports.down = knex => knex.schema.dropTableIfExists('locations');
