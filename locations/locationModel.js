const db = require('../database/dbConfig');

function getLocationByQuery(lat, long) {
  return db('locations')
    .where(function () {
      this
        .where('latitude', '<=', lat + 0.1350)
        .orWhere('latitude', '>=', lat - 0.1350);
    })
    .andWhere(function () {
      this
        .where('longitude', '<=', long + 0.1350)
        .orWhere('longitude', '>=', long - 0.1350);
    });
}


module.exports = {
  getLocationByQuery,
};
