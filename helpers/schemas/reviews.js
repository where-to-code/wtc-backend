const joi = require('joi');

const quietness = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'Quietness field is required';
          break;
        case 'any.empty':
          err.message = 'Quietness field cannot be empty';
          break;
        case 'number.base':
          err.message = 'Quietness field must be a number';
        default:
          break;
      }
    });
    return errors;
  });

const wifi = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'Wifi field is required';
          break;
        case 'any.empty':
          err.message = 'Wifi field cannot be empty';
          break;
        case 'number.base':
          err.message = 'Wifi field must be a number';
        default:
          break;
      }
    });
    return errors;
  });

const community = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'Community field is required';
          break;
        case 'any.empty':
          err.message = 'Community field cannot be empty';
          break;
        case 'number.base':
          err.message = 'Community field must be a number';
        default:
          break;
      }
    });
    return errors;
  });

const accessibility = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'Accessibility field is required';
          break;
        case 'any.empty':
          err.message = 'Accessibility field cannot be empty';
          break;
        case 'number.base':
          err.message = 'Accessibility field must be a number';
        default:
          break;
      }
    });
    return errors;
  });

const description = joi
  .string()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case 'any.required':
          err.message = 'Description field is required';
        case 'any.empty':
          err.message = 'Description cannot be empty';
        case 'string.base':
          err.message = 'Description must be a string';
        default:
          break;
      }
    });
    return errors;
  });

const user = joi
  .number()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.empty':
          err.message = 'User ID field cannot be empty';
          break;
        case 'number.base':
          err.message = 'User ID field must be a number';
          break;
        default:
          err.message = 'User ID field is required';
      }
    });
    return errors;
  });

const queryId = joi.number().error(() => 'Id must be a number');

const addReviewSchema = joi.object().keys({
  quietness,
  wifi_speed: wifi,
  community,
  accessibility,
  description,
  user_id: user
});

module.exports = { addReviewSchema, queryId };
