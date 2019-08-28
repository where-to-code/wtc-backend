/* eslint-disable no-fallthrough */
/* eslint-disable no-param-reassign */
const joi = require('joi');

const lat = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'Lat field is required';
          break;
        case 'any.empty':
          err.message = 'Latitude cannot be empty';
          break;
        case 'number.base':
          err.message = 'Latitude must be a number';
        default:
          break;
      }
    });
    return errors;
  });
const long = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'Long field is required';
          break;
        case 'any.empty':
          err.message = 'Longitude cannot be empty';
          break;
        case 'number.base':
          err.message = 'Longitude must be a number';
        default:
          break;
      }
    });
    return errors;
  });

const queryId = joi
  .number()
  .error(() => 'Id must be a number');

const querySchema = joi.object().keys({
  lat,
  long,
});

module.exports = {
  querySchema,
  queryId,
};
