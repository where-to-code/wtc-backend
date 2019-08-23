const express = require('express');
const locations = require('./locationController');
const validate = require('../middleware/validations');
const validateLocationId = require('./locationMiddleware');

const router = express.Router();

router.get(
  '/locations',
  validate.validateQuery,
  locations.getAllLocationsCloseToUser,
);
router.get('/locations/:id', validateLocationId, locations.getSingleLocation);

module.exports = router;
