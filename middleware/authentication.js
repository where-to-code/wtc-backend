const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const emailExists = require('../helpers/emailHelper');
dotenv.config();
const generateToken = (id, firstname) => {
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET);
  return token;
};

module.exports = { generateToken };
