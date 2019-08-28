const db = require('../database/dbConfig');

const getAUser = id => db('users')
  .where({ id })
  .first();

const registerUser = user => db('users')
  .insert(user);

module.exports = {
  getAUser,
  registerUser,
};
