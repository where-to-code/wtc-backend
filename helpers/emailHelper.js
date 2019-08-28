const Model = require('../users/userModel');

const emailExists = async email => {
  const result = await Model.getUserByEmail(email);
  return result;
};
module.exports = emailExists;
