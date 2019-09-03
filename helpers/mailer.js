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
const mailer = (Message, res) => {
  transporter.sendMail(Message, (err, info) => {
    if (err) {
      console.log(err)
      return statusHandler(res, 400, err);
    }
    return statusHandler(res, 200, { message: 'Mail  Sent Succesfully', info });
  });
};
module.exports = mailer;
