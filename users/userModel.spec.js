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
  const user = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@me.com',
    password: '12345678',
  };
  it('should not have null values', () => {
    expect(user.firstname).not.toBeNull();
    expect(user.lastname).not.toBeNull();
    expect(user.email).not.toBeNull();
    expect(user.password).not.toBeNull();
  });
  it('should not have null undefined', () => {
    expect(user.firstname).not.toBeUndefined();
    expect(user.lastname).not.toBeUndefined();
    expect(user.email).not.toBeUndefined();
    expect(user.password).not.toBeUndefined();
  });
  it('should accepts an object as argument with keys and values', async () => {
    expect(user).toEqual(user);
    expect(user).toHaveProperty('firstname', 'John');
    expect(user).toHaveProperty('lastname', 'Doe');
    expect(user).toHaveProperty('email', 'johndoe@me.com');
    expect(user).toHaveProperty('password', '12345678');
  });
});
