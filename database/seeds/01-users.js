const { hashPassword } = require('../../helpers/bcryptHelper');

exports.seed = knex =>
  knex.schema.raw('TRUNCATE TABLE users, reviews CASCADE').then(async () =>
    knex('users').insert([
      {
        firstname: 'John',
        lastname: 'Doe',
        email: 'jh@john.com',
        password: await hashPassword('12345'),
      },
      {
        firstname: 'Jane',
        lastname: 'Doe',
        email: 'jn@john.com',
        password: await hashPassword('12345'),
      },
      {
        firstname: 'Will',
        lastname: 'Smith',
        email: 'fresh@prince.com',
        password: await hashPassword('12345'),
      },
      {
        firstname: 'Vin',
        lastname: 'Diesel',
        email: 'vin@diesel.com',
        password: await hashPassword('12345'),
      },
      {
        firstname: 'Van',
        lastname: 'Damme',
        email: 'van@damme.com',
        password: await hashPassword('12345'),
      },
    ]),
  );
