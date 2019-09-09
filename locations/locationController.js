const Model = require('./locationModel');
const statusHandler = require('../helpers/statusHandler');
const getReview = require('../helpers/generateReviewsAndAverageRating');

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

    return statusHandler(res, 200, data);
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

const addLocation = async (req, res) => {
  const { name, description, imgUrl, address, longitude, latitude } = req.body;

  try {
    const location = {
      name, description, imgUrl, address, longitude, latitude };

    const newLocation = await Model.insert(location);
    if (newLocation.length === 1) {
      return statusHandler(res, 201, {
        name, description, imgUrl, address, longitude, latitude,
      });
    }
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};

module.exports = { getAllLocationsCloseToUser, getSingleLocation, addLocation };
