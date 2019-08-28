// export the route from here

const express = require('express');
const user = require('./userController');
const validate = require('../middleware/validations');

const router = express.Router();

router.post('/auth/login', validate.validateLogin, user.loginUser);
router.post('/auth/register', validate.validateRegister, user.register);

module.exports = router;
