const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const statusHandler = require('../helpers/statusHandler');

const user = process.env.EMAIL;
const pass = process.env.PASSWORD;
let mailConfig;
if (process.env.DB_ENV === 'testing') {
  mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'kelton.macejkovic63@ethereal.email',
      pass: 'FqYaRa2nsCPChnkjFm',
    },
  };
} else {
  mailConfig = {
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user,
      pass,
    },
  };
}
const transporter = nodemailer.createTransport(mailConfig);
transporter.use(
  'compile',
  hbs({
    viewEngine: {
      extName: '.handlebars',
      partialsDir: './',
      layoutsDir: './views',
      defaultLayout: 'index.hbs',
    },
    viewPath: './views',
    extName: '.hbs',
  }),
);
const mailer = (Message, res) => {
  transporter.sendMail(Message, (err, info) => {
    if (err) {
      return statusHandler(res, 400, err.toString());
    }
    return statusHandler(res, 200, { message: 'Mail  Sent Succesfully', info });
  });
};
module.exports = mailer;
