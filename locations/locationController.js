const Model = require('./locationModel');
const statusHandler = require('../helpers/statusHandler');
const {
  getReview,
  addAverageRatings,
} = require('../helpers/generateReviewsAndAverageRating');

// eslint-disable-next-line consistent-return
const getAllLocationsCloseToUser = async (req, res) => {
  const { lat, long } = req.query;
  const range = Number(req.body.range) || 0.135;

  try {
    const data = await Model.getLocations(lat, long, range);
    if (data.length === 0) {
      return statusHandler(
        res,
        404,
        'There is currently no locations around you',
      );
    }

    return statusHandler(res, 200, addAverageRatings(data));
  } catch (error) {
    return statusHandler(res, 500, error.toString());
  }
};

const getSingleLocation = async (req, res) => {
  const { id } = req.params;

  try {
    const location = await Model.getSingleLocation(id);

    if (!location) {
      return statusHandler(res, 404, 'No location matches the id provided');
    }

    // this averageRating and reviews properties and keys are placeholders
    const reviewDetail = getReview();
    // eslint-disable-next-line
    location.averageRating = reviewDetail[1];
    // eslint-disable-next-line
    location.reviews = reviewDetail[0];

    return statusHandler(res, 200, location);
  } catch (error) {
    return statusHandler(res, 500, error.toString());
  }
};

// eslint-disable-next-line consistent-return
const addLocation = async (req, res) => {
  // eslint-disable-next-line camelcase
  const {
    name,
    description,
    image_url,
    address,
    latitude,
    longitude,
  } = req.body;

  try {
    const location = {
      name,
      description,
      image_url,
      address,
      latitude,
      longitude,
    };

    const newLocation = await Model.insert(location);
    if (newLocation.length === 1) {
      return statusHandler(res, 201, newLocation);
    }
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { getAllLocationsCloseToUser, getSingleLocation, addLocation };
