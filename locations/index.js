const express = require('express');
const locations = require('./locationController');
const validate = require('../middleware/validations');


const router = express.Router();

router.get(
  '/locations',
  validate.validateQuery,
  locations.getAllLocationsCloseToUser,
);
router.get('/locations/:id', validate.validateId, locations.getSingleLocation);
router.post('/locations', validate.validateLocationInput, locations.addLocation);


module.exports = router;
