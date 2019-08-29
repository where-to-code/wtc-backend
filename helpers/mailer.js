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

const mailer = (Message, res) => {
  transporter.sendMail(Message, (err, info) => {
    if (err) {
      return statusHandler(res, 400, err.toString);
    }
    return statusHandler(res, 200, { message: 'Mail  Sent Succesfully', info });
  });
};
module.exports = mailer;
