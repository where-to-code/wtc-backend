const model = require('./locationModel');
const statusHandler = require('../helpers/statusHandler');

// eslint-disable-next-line consistent-return
const getAllLocationsCloseToUser = async (req, res) => {
  const { lat, long } = req.query;
  try {
    const data = await model.getLocationByQuery(lat, long);
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

module.exports = { getAllLocationsCloseToUser };
