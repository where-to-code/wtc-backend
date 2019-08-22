const db = require('../database/dbConfig');

function getLocationByQuery(lat, long) {
  const latitude = Math.abs(lat);
  const longitude = Math.abs(long);

  return db('locations')
    .where('latitude', '>', `${(latitude - 0.135).toString()}`)
    .andWhere('latitude', '<', `${(latitude + 0.135).toString()}`)
    .andWhere('longitude', '>', `${(longitude - 0.135).toString()}`)
    .andWhere('longitude', '<', `${(longitude + 0.135).toString()}`)
    .limit(30);
}

module.exports = {
  getLocationByQuery,
};
