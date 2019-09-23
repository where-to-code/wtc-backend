const express = require('express');
const reviews = require('./reviewController');
const validate = require('../middleware/validations');
const verifyToken = require('../middleware/authentication');
const router = express.Router();

router.post(
  '/locations/:id/review',
  verifyToken,
  validate.validateId,
  validate.validateReviewInput,
  reviews.addReview,
);

module.exports = router;
