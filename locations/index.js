const express = require('express');
const locations = require('./locationController');
const validate = require('../middleware/validations');

const router = express.Router();

router.get(
  '/locations',
  validate.validateQuery,
  locations.getAllLocationsCloseToUser,
);

module.exports = router;
