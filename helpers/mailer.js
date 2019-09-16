const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const statusHandler = require('../helpers/statusHandler');

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
const mailer = async (Message, res) => {
  try {
    const info = await transporter.sendMail(Message);
    return { message: 'Mail sent', info };
  } catch (err) {
    return statusHandler(res, 400, err.toString());
  }
};
module.exports = mailer;
