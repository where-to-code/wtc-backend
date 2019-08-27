/* eslint-disable no-undef */
const db = require('../database/dbConfig');
const User = require('./userModel');

describe('Model for users', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterEach(() => db.migrate.rollback());
});


describe('/POST auth.register test suite', () => {
  it('should accepts an object as argument with keys and values', async () => {
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'johndoe@me.com',
      password: '12345678',
    };
    expect(user).toEqual(user);
    expect(user).toHaveProperty('firstname', 'John');
    expect(user).toHaveProperty('lastname', 'Doe');
    expect(user).toHaveProperty('email', 'johndoe@me.com');
    expect(user).toHaveProperty('password', '12345678');
  });
});
