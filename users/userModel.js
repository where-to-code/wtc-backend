const db = require('../database/dbConfig');

const getAUser = id => db('users')
  .where({ id })
  .first();

const registerUser = user => db('users')
  .registerUser(user)
  .then(ids => getAUser(ids[0]));

exports.module = {
  getAUser,
  registerUser,
};
