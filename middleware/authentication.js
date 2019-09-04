/* eslint-disable consistent-return */
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const statusHandler = require('../helpers/statusHandler');

dotenv.config();
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || '';
  try {
    if (!token) {
      return statusHandler(res, 401, 'You need to Login');
    }
    const decrypt = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decrypt.id,
      firstname: decrypt.firstname,
    };
    next();
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = verifyToken;
