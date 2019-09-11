const Model = require('./reviewModel');
const statusHandler = require('../helpers/statusHandler');

const addReview = async (req, res) => {
  const { id } = req.params;
  const {
    quietness,
    wifi_speed,
    community,
    accessibility,
    description,
    user_id
  } = req.body;
  try {
    const newReview = await Model.addReview({
      location_id: id,
      quietness,
      wifi_speed,
      community,
      accessibility,
      description,
      user_id
    });
    return statusHandler(res, 201, newReview);
  } catch (error) {
    return statusHandler(res, 500, error.toString());
  }
};

module.exports = { addReview };
