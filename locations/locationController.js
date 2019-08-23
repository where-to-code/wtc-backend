const Model = require('./locationModel');
const statusHandler = require('../helpers/statusHandler');

// eslint-disable-next-line consistent-return
const getAllLocationsCloseToUser = async (req, res) => {
  const { lat, long } = req.query;

  try {
    const data = await Model.getLocations(lat, long);

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
    location.averageRating = null;
    location.reviews = [];

    return statusHandler(res, 200, location);
  } catch (error) {
    return statusHandler(res, 500, error.toString());
  }
};

module.exports = { getAllLocationsCloseToUser, getSingleLocation };