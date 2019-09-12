const express = require('express');
const reviews = require('./reviewController');
const validate = require('../middleware/validations');

const router = express.Router();

router.post(
  '/locations/:id/review',
  validate.validateId,
  validate.validateReviewInput,
  reviews.addReview,
);
router.put('/locations/:id/review/:reviewId', reviews.updateReview);

module.exports = router;
