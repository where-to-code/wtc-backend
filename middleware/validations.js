const joi = require('joi');
const schema = require('../helpers/schemas/location');

const validate = (value, scheme, res, next) => {
  joi.validate(
    value,
    scheme,
    { abortEarly: false, stripUnknown: true },
    err => {
      if (err) {
        const errMsg = [];
        for (let i = 0; i < err.details.length; i++) {
          errMsg.push(err.details[i].message);
        }
        return res.status(400).json({
          status: 400,
          error: errMsg,
        });
      } else {
        next();
      }
    },
  );
};
const validateQuery = (req, res, next) => {
  validate(req.query, schema.querySchema, res, next);
};

module.exports = {
  validateQuery,
};
