const nodemailer = require('nodemailer');
const statusHandler = require('../helpers/statusHandler');
const hbs = require('nodemailer-express-handlebars');
const user = process.env.EMAIL;
const pass = process.env.PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});
transporter.use(
  'compile',
  hbs({
    viewEngine: 'express-handlebars',
    viewPath: '../',
  }),
);
const mailer = (Message, res) => {
  transporter.sendMail(Message, (err, info) => {
    if (err) {
      return statusHandler(res, 400, err.toString);
    }
    return statusHandler(res, 200, { message: 'Mail  Sent Succesfully', info });
  });
};
module.exports = mailer;
