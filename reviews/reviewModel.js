const db = require('../database/dbConfig');

const addReview = reviews => {
  return db('reviews')
    .returning('*')
    .insert(reviews);
};

const updateReview = (id, description) =>
  db('reviews')
    .returning('*')
    .update({ description })
    .where({ id });

module.exports = { addReview, updateReview };
