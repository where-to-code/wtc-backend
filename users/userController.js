/* eslint-disable consistent-return */
const Model = require('./userModel');
const statusHandler = require('../helpers/statusHandler');
const { hashPassword, comparePassword } = require('../helpers/bcryptHelper');
const emailExists = require('../helpers/emailChecker');
const generateToken = require('../helpers/generateToken');

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const emailExist = await emailExists(email);

    if (emailExist) {
      return statusHandler(res, 400, 'Email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };

    const newUser = await Model.registerUser(user);
    const { id, isVerified } = newUser[0];

    if (newUser.length === 1) {
      await generateToken(res, newUser.id, firstname);
      return statusHandler(res, 201, {
        id,
        firstname,
        lastname,
        email,
        isVerified,
      });
    }
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await emailExists(email);

    if (!result) {
      return statusHandler(res, 404, 'Email does not exist');
    }

    const checkPassword = await comparePassword(password, result.password);

    if (!checkPassword) {
      return statusHandler(res, 400, 'Password Mismatch');
    }

    const { id, firstname, lastname, isVerified } = result;

    await generateToken(res, result.id, firstname);
    return statusHandler(res, 200, {
      id,
      firstname,
      lastname,
      email,
      isVerified,
    });
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { register, login };
