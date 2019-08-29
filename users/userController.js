/* eslint-disable consistent-return */

const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const Model = require('./userModel');
const statusHandler = require('../helpers/statusHandler');
const { hashPassword, comparePassword } = require('../helpers/bcryptHelper');
const emailExists = require('../helpers/emailChecker');
const mailer = require('../helpers/mailer');

const generateToken = (res, id, firstname) => {
  const token = jwt.sign({ id, firstname }, process.env.JWT_SECRET);
  return res.setHeader('Set-Cookie', cookie.serialize('token', token), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    secure: false,
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
    if (newUser.rowCount === 1) {
      await generateToken(res, newUser.id, newUser.firstname);
      await verifyMail(newUser.id ,email)
      return statusHandler(res, 201, user);
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
const verifyMail = (id, email) => {
  const token = jwt.sign({id} ,process.env.EMAIL_SECRET,  { expiresIn: '1d' },)
  const message = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Welcome to Where-To-Code',
    html: `<b> Welcome to Where-To-Code </b>
           <p> For better support kindly verify your email address by clicking on verify link below</p>
              <p><b><a href="/verify/${token}"> Comfirm Email</a></b>
              <p>This link expires in 24 hrs </p>`
  };
  mailer(message)
};

module.exports = { register, login };
