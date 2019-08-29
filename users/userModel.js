const db = require('../database/dbConfig');

const getUsers = db('users');

const getAUser = id =>
  db('users')
    .where({ id })
    .first();
const getUserByEmail = email =>
  db('users')
    .where({ email })
    .first();
const registerUser = user => db('users').insert(user);

module.exports = {
  getAUser,
  registerUser,
  getUserByEmail,
  getUsers,
};
