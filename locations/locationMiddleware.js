const statusHandler = require('../helpers/statusHandler');

// eslint-disable-next-line consistent-return
const validateLocationId = (req, res, next) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return statusHandler(res, 400, 'Request parameter must be a string');
  }

  next();
};

module.exports = validateLocationId;
