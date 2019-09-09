const db = require('../database/dbConfig');

const getLocations = async (lat, long, range) => {
  const dbResults = await db('locations');
  return dbResults.filter(
    location =>
      Number(location.latitude) >= Number(lat) - range &&
      Number(location.latitude) <= Number(lat) + range &&
      (Number(location.longitude) >= Number(long) - range &&
        Number(location.longitude) <= Number(long) + range),
  );
};

const getSingleLocation = id =>
  db('locations')
    .where({ id })
    .first();


const insert = location => {
  return db('locations')
    .returning('*')
    .insert(location);
};

module.exports = {
  getLocations,
  getSingleLocation,
  insert,
};
