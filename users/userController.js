/* eslint-disable consistent-return */
const axios = require('axios');
const Model = require('./userModel');
const statusHandler = require('../helpers/statusHandler');
const { hashPassword, comparePassword } = require('../helpers/bcryptHelper');
const emailExists = require('../helpers/emailChecker');
const generateToken = require('../helpers/generateToken');

const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

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

const gitHubAuth = async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`,
      headers: {
        accept: 'application/json',
      },
    });

    const accessToken = response.data.access_token;

    const userDetails = await axios({
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const { id, name, email } = userDetails.data;

    const user = await emailExists(email);

    if (user) {
      if (comparePassword('GitHub', user.password)) {
        await generateToken(res, id, name);
        return statusHandler(res, 200, {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          isVerified: user.isVerified,
        });
      }
    }

    const newUser = await Model.registerUser({
      firstname: name.split(' ')[0],
      lastname: name.split(' ')[1],
      email,
      password: hashPassword('GitHub'),
      isVerified: true,
    });

    await generateToken(res, id, name);
    return statusHandler(res, 201, {
      id: newUser[0].id,
      firstname: name.split(' ')[0],
      lastname: name.split(' ')[1],
      email,
      isVerified: newUser[0].isVerified,
    });
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { register, login, gitHubAuth };
