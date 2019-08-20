exports.up = knex =>
  knex.schema.createTable('reviews', table => {
    table.increments();
    table.integer('quietness').notNullable();
    table.integer('wifi_speed').notNullable();
    table.integer('close_late').notNullable();
    table.integer('community').notNullable();
    table.integer('accessibility').notNullable();
    table.text('description').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('location_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('locations')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.datetime('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
  });

exports.down = knex => knex.schema.dropTableIfExists('reviews');
