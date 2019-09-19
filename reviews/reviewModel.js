const db = require('../database/dbConfig');

const addReview = reviews => {
  return db('reviews')
    .returning('*')
    .insert(reviews);
};

const getReviewById = location_id =>
  db('reviews')
    .select('*')
    .from('reviews')
    .where({ location_id });

const updateReview = (id, description) =>
  db('reviews')
    .returning('*')
    .update({ description })
    .where({ id });

const getSingleReview = id =>
  db('reviews')
    .where({ id })
    .first();

module.exports = { addReview, updateReview, getSingleReview, getReviewById };
