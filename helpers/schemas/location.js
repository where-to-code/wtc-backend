/* eslint-disable camelcase */
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
const name = joi.string().invalid('').required().error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case 'any.required':
        err.message = 'name field is required';
      case 'any.empty':
        err.message = 'name cannot be empty';
      case 'string.base':
        err.message = 'name must be a string';
      default:
        break;
    }
  });
  return errors;
});

const description = joi.string().invalid('').required().error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case 'any.required':
        err.message = 'description field is required';
      case 'any.empty':
        err.message = 'description cannot be empty';
      case 'string.base':
        err.message = 'description must be a string';
      default:
        break;
    }
  });
  return errors;
});

// eslint-disable-next-line camelcase
const image_url = joi.string().invalid('').required().error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case 'any.required':
        err.message = 'image_url field is required';
      case 'any.empty':
        err.message = 'image_url cannot be empty';
      case 'string.base':
        err.message = 'image_url must be a string';
      default:
        break;
    }
  });
  return errors;
});

const address = joi.string().invalid('').required().error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case 'any.required':
        err.message = 'address field is required';
      case 'any.empty':
        err.message = 'address cannot be empty';
      case 'string.base':
        err.message = 'address must be a string';
      default:
        break;
    }
  });
  return errors;
});

const place_id = joi.string().allow('').required().error(errors => {
  errors.forEach(err => {
    switch (err.type) {
      case 'string.base':
        err.message = 'place_id must be a string';
      case 'any.required':
        err.message = 'place_id key is required, but value can be empty';
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
const addLocationSchema = joi.object().keys({
  latitude: lat,
  longitude: long,
  name,
  description,
  image_url,
  address,
  place_id,
});

module.exports = {
  querySchema,
  queryId,
  addLocationSchema,
};
