const express = require('express');
const locations = require('./locationController');

const router = express.Router();
const validate = require('../middleware/validations')
router.get('/locations', validate.validateQuery, locations.getAllLocationsCloseToUser);

module.exports = router;
