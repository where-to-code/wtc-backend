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
  return res.setHeader('Set-Cookie', cookie.serialize('token', `${token}`), {
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
const confirmMail = async (req, res) => {
  try {
    const { id } = await jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    if (!id) {
      return statusHandler(res, 403, 'Invalid Token');
    }
    const result = await Model.updateVerifiedStatus(id, true);
    return statusHandler(res, 200, {
      id: result.id,
      isVerified: result.isVerified,
    });
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const verifyMail = async (req, res) => {
  const { email } = req.body;
  try {
    const token = await jwt.sign(
      { id: req.user.id },
      process.env.EMAIL_SECRET,
      {
        expiresIn: '1d',
      },
    );
    const name = req.user.firstname.charAt(0).toUpperCase() + req.user.firstname.slice(1);
    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Where-To-Code',
      html: `
              <div style="width:100%, height:100%">
                <div style="width:60%, height:70%, margin:5% 20% ,border-radius:10px , box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2)">
                  <div style="width:100%, height:30%, background:grey "><img style="width:30%, height:80%, float:center" src='' alt='' />
                  </div>
                  <div style = "width:100% , height:70%",margin:0 20%>
                      <h1 style= "color:seagreen, font-size:30px"> Hi ${name} </h1>
                      <p style ="line-height:14px">Thanks for get started on whereToCode! We need a little more information to provide you better support,including the confirmation of your email address</p>
                      <button style="border-radius:5px, background:orange, width:30% ,height:20% ,margin:5% 30%" ><a style="width:100%, color:white " href="${process.env.URL}/api/auth/confirm/${token}"> Confirm Email</a></button>
                  </div>
                </div>
              <div style="width:60%, height:30%, background:inherit">
              <div style="width:60%, height:70% ,background:inherit">
              <h3 style="text-align:center, font-family:Arial ,color:orange ">Stay in touch </h3>
              <a style="width:50px, height:50px" href='mailto:admin@wheretocode.com'><img style="width:50px, height:50px" src='https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/256x256/mail.png' alt=""/></a>
              </div>
              <div>
              <p>Thanks, WhereToCode Team </p>
              <p> Copyright &copy 2019 WhereToCode Team, Lambda Schools. All Rights Reserved </p>
              </div>
              </div>
          `,
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
};
