const nodemailer = require('nodemailer');
const statusHandler = require('../helpers/statusHandler');

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass,
  },
});

const mailer = Message => {
  transporter.sendMail(Message, (err, info) => {
    if (err) {
      return statusHandler(res, 400, err.toString);
    }
    return statusHandler(res, 200, info);
  });
};
module.exports = mailer