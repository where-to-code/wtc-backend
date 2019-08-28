/* eslint-disable consistent-return */
const Model = require('./userModel');
const statusHandler = require('../helpers/statusHandler');
const { hashPassword, comparePassword } = require('../helpers/bcryptHelper');
const emailExists = require('../helpers/emailHelper')
};
const register = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    if (emailExists(email)) {
      return statusHandler(res, 400, 'Email already exists');
    }
    const password = await hashPassword(req.body.password);
    const user = {
      firstname,
      lastname,
      email,
      password,
    };
    const newUser = await Model.registerUser(user);
    if (newUser.rowCount === 1) {
      return statusHandler(res, 201, user);
    }
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = emailExists(email);
    if (!result) {
      return statusHandler(res, 404, 'Email does not exist');
    }
    const checkPassword = await comparePassword(password, result.password);
    if (!checkPassword) {
      return statusHandler(res, 400, 'Password Mismatch');
    }

  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { register, login };
