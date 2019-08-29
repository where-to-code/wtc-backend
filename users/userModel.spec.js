/* eslint-disable no-undef */
const db = require('../database/dbConfig');
const User = require('./userModel');

describe('Model for user', () => {
  beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });
  const user = {
    firstname: 'Ken',
    lastname: 'Doe',
    email: 'kenny@m.com',
    password: '12345678j',
  };
  it('should return an object if user exists', async () => {
    const value = await User.getAUser('1');
    expect(value).not.toBeUndefined();
    expect(value).not.toBeNull();
    expect(value.firstname).toEqual('John');
    expect(value.lastname).toEqual('Doe');
    expect(value.email).toEqual('jh@john.com');
  });
  it('should fail if user id does not exist', async () => {
    const value = await User.getAUser('10');
    expect(value).toBeUndefined();
  });
  it('should return an object if user  with email exists', async () => {
    const value = await User.getUserByEmail('jh@john.com');
    expect(value).not.toBeUndefined();
    expect(value).not.toBeNull();
  });
  it('should fail if user email does not exist', async () => {
    const value = await User.getUserByEmail('johndoe@m.com');
    expect(value).toBeUndefined();
  });
  it('should register a user', async () => {
    const initialValue = await User.getUsers;
    expect(initialValue.length).toEqual(5);
    await User.registerUser(user);
    const newValue = await User.getUsers;
    expect(newValue.length).toEqual(6);
  });
});