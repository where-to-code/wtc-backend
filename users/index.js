const express = require('express');
const users = require('./userController');

const router = express.Router();

router.post(
  '/auth/register', users.registerNewUser,
);

module.exports = router;
