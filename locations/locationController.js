/* eslint-disable camelcase */
const Model = require('./locationModel');
const statusHandler = require('../helpers/statusHandler');
const {
  getReviews,
  findCummulativeAverageRating,
  attachAverageRatingsToLocationObject,
} = require('./locationHelper');

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

    const ratedLocations = await attachAverageRatingsToLocationObject(data);

    return Promise.all(ratedLocations)
      .then(places => statusHandler(res, 200, places))
      .catch(error => statusHandler(res, 500, error.toString()));
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

    const reviews = await getReviews(id);
    const averageRating = await findCummulativeAverageRating(id);

    location.reviews = reviews;
    location.averageRating = averageRating;

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
    place_id,
  } = req.body;

  try {
    const location = {
      name,
      description,
      image_url,
      address,
      latitude,
      longitude,
      place_id,
    };

    const newLocation = await Model.insert(location);
    if (newLocation.length === 1) {
      return statusHandler(res, 201, newLocation);
    }
  } catch (err) {
    const error = Object.values(err);
    if (error.includes('locations_place_id_unique')) {
      return statusHandler(res, 409, 'location already exists');
    }
    return statusHandler(res, 500, error.toString());
  }
};

const updateLocation = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    const location = await Model.getSingleLocation(id);

    if (location) {
      const newLocation = await Model.updateLocation(id, description);

      return statusHandler(res, 200, newLocation);
    }

    return statusHandler(res, 404, 'This location does not exist');
  } catch (error) {
    return statusHandler(res, 500, error.toString());
  }
};

module.exports = {
  getAllLocationsCloseToUser,
  getSingleLocation,
  addLocation,
  updateLocation,
}