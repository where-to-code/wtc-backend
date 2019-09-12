const db = require('../database/dbConfig');

const addReview = reviews => {
  return db('reviews')
    .returning('*')
    .insert(reviews);
};

module.exports = { addReview };
