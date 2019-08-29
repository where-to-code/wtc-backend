const db = require('../database/dbConfig');

const getAUser = id =>
  db('users')
    .where({ id })
    .first();

const getUserByEmail = email =>
  db('users')
    .where({ email })
    .first();

const registerUser = user => db('users').insert(user, ['id', 'isVerified']);

module.exports = {
  getAUser,
  registerUser,
  getUserByEmail,
};
