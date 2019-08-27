const db = require('../database/dbConfig');

const getAUser = id => db('users')
  .where({ id })
  .first();

const registerUser = user => db('users')
  .insert(user)
  .then(ids => getAUser(ids[0]));

module.exports = {
  getAUser,
  registerUser,
};
