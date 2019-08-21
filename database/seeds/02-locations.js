const locations = require('../seedStore/locations');

exports.seed = knex =>
  knex.schema
    .raw('TRUNCATE TABLE locations, reviews CASCADE')
    .then(() => knex.batchInsert('locations', locations));
