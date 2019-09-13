const express = require('express');
const locations = require('./locationController');
const validate = require('../middleware/validations');
const authenticate = require('../middleware/authentication');

const router = express.Router();

router.get(
  '/locations',
  validate.validateQuery,
  locations.getAllLocationsCloseToUser,
);
router.get('/locations/:id', validate.validateId, locations.getSingleLocation);
router.post(
  '/locations',
  authenticate,
  validate.validateLocationInput,
  locations.addLocation,
);
router.put(
  '/locations/:id',
  verifyToken,
  validate.validateId,
  validate.validateLocationDescription,
  locations.updateLocation,
);

module.exports = router;
