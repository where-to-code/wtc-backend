const db = require('../database/dbConfig');

const getLocations = async (lat, long) => {
  const dbResults = await db('locations');

  return dbResults.filter(
    location =>
      Number(location.latitude) >= Number(lat) - 0.135 &&
      Number(location.latitude) <= Number(lat) + 0.135 &&
      (Number(location.longitude) >= Number(long) - 0.135 &&
        Number(location.longitude) <= Number(long) + 0.135),
  );
};

const getSingleLocation = id =>
  db('locations')
    .where({ id })
    .first();

module.exports = {
  getLocations,
  getSingleLocation,
};
