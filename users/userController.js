/* eslint-disable consistent-return */

const jwt = require('jsonwebtoken');
const Model = require('./userModel');
const statusHandler = require('../helpers/statusHandler');
const { hashPassword, comparePassword } = require('../helpers/bcryptHelper');
const emailExists = require('../helpers/emailChecker');
const mailer = require('../helpers/mailer');

const generateToken = (res, id, firstname) => {
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return res.cookie('token', token, {
    expires: new Date(Date.now() + 900000),
    secure: false,
    httpOnly: true,
  });
};

const register = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  try {
    const emailExist = await emailExists(email);
    if (emailExist) {
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
    if (newUser.length === 1) {
      await generateToken(res, newUser[0].id, newUser[0].firstname);
      return statusHandler(res, 201, newUser[0]);
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
    await generateToken(res, result.id, result.firstname);
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
const resetPassword = async (req, res) => {
  const { password } = req.body;
  try {
    const { id } = await jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    if (!id) {
      return statusHandler(res, 403, 'Invalid Token');
    }
    res.redirect(`${process.env.FRONT_URL}/change`);
    await Model.updatePassword(id, password);
    res.redirect(`${process.env.FRONT_URL}`);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

const verify = async (req, res, usermessage, button) => {
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
        message: usermessage,
        urlMessage: button,
      },
    };
    mailer(message, res);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const message1 =
  'Thanks for getting started on WhereToCode! We need a little more information to provide you better support,including the confirmation of your email address.';
const message2 = 'We got a request to reset your password on WhereToCode! If you ignore this message your password wont be changed.';
const verifyMail = async (req, res) => {
  await verify(req, res, message1, 'Confirm Email');
};
const forgotPassword = async (req, res) => {
  await verify(req, res, message2, 'Reset Password');
};

module.exports = {
  register,
  login,
  verifyMail,
  confirmMail,
  resetPassword,
  forgotPassword,
};
