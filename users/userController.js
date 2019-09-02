/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
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

    // the github access token to get user details
    const accessToken = response.data.access_token;

    const userDetails = await axios({
      url: 'https://api.github.com/user',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    // eslint-disable-next-line
    const { id, name, email, login } = userDetails.data;

    let firstname;
    let lastname;

    if (name.split(' ').length === 1) {
      firstname = name;
      lastname = name;
    } else {
      // eslint-disable-next-line
      firstname = name.split(' ')[0];
      // eslint-disable-next-line
      lastname = name.split(' ')[1];
    }

    const user = await emailExists(email || login);

    if (user) {
      if (comparePassword('GitHub', user.password)) {
        await generateToken(res, id, name);
        return statusHandler(res, 200, {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email || login,
          isVerified: user.isVerified,
        });
      }
    }

    const newUser = await Model.registerUser({
      firstname,
      lastname,
      email: email || login,
      password: hashPassword('GitHub'),
      isVerified: true,
    });

    await generateToken(res, id, name);
    return statusHandler(res, 201, {
      id: newUser[0].id,
      firstname,
      lastname,
      email: email || login,
      isVerified: newUser[0].isVerified,
    });
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const confirmMail = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    if (!id) {
      return statusHandler(res, 403, 'Invalid Token');
    }
    const result = await Model.updateVerifiedStatus(id, true);
    res.redirect(`${process.env.FRONT_URL}/verified`);
    return statusHandler(res, 200, result);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const confirmMail = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    if (!id) {
      return statusHandler(res, 403, 'Invalid Token');
    }
    const result = await Model.updateVerifiedStatus(id, true);
    res.redirect(`${process.env.FRONT_URL}/verified`);
    return statusHandler(res, 200, result);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const verifyMail = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await emailExists(email);
    if (result.isVerified) {
      res.redirect(`${process.env.FRONT_URL}`);
      return statusHandler(res, 201, 'This account is already verified');
    }
    const token = await jwt.sign(
      { id: req.user.id },
      process.env.EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
    );
    const name =
      req.user.firstname.charAt(0).toUpperCase() + req.user.firstname.slice(1);
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Where-To-Code',
      template: 'index',
      context: {
        name,
        url: `${process.env.URL}/api/auth/confirm/${token}`,
      },
    };
    mailer(message, res);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
module.exports = {
  register,
  login,
  verifyMail,
  confirmMail,
  gitHubAuth ,
};

