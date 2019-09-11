const Review = require('./reviewModel');
const Location = require('../locations/locationModel');
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
    const location = await Location.getSingleLocation(id);
    if (location) {
      const newReview = await Review.addReview({
        location_id: id,
        quietness,
        wifi_speed,
        community,
        accessibility,
        description,
        user_id
      });
      return statusHandler(res, 201, newReview);
    }
    return statusHandler(res, 404, 'This location does not exist');
  } catch (error) {
    if (error.routine === '_bt_check_unique') {
      return statusHandler(res, 500, 'You have already reviewed this location.');
    }
    return statusHandler(res, 500, error.toString());
  }
};

module.exports = { addReview };
