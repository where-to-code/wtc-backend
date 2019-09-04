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
const registerUser = user => db('users').insert(user, ['id', 'isVerified']);
const updateVerifiedStatus = id =>
  db('users')
    .update('isVerified', true)
    .where({ id });
const updatePassword = (id, newPassword) =>
  db('users')
    .update('password', newPassword)
    .where({ id })
    .returning(['id', 'isVerified']);

module.exports = {
  getAUser,
  registerUser,
  getUserByEmail,
  getUsers,
  updateVerifiedStatus,
  updatePassword,
};
