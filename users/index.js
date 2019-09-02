// export the route from here

const express = require('express');
const user = require('./userController');
const validate = require('../middleware/validations');
const verifyToken = require('../middleware/authentication');

const router = express.Router();

router.post('/auth/login', validate.validateLogin, user.login);
router.post('/auth/register', validate.validateRegister, user.register);
router.post(
  '/auth/verify',
  verifyToken,
  validate.validateEmail,
  user.verifyMail,
);
router.get('/auth/confirm/:token', user.confirmMail);
router.post('/auth/forgot', validate.validateEmail, user.forgotPassword);
router.get('/auth/reset/:token', user.verifyPasswordResetToken);
router.post('/auth/change/:id', user.resetPassword);

module.exports = router;
