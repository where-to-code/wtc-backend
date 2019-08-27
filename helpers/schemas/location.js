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
  .string()
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case 'any.required':
          err.message = 'id is required';
          break;
        case 'any.empty':
          err.message = 'id cannot be empty';
          break;
        default:
          break;
      }
    });
  });
const email = joi.string().trim().email().invalid('')
  .required()
  .error(
    (errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'Email field is required';
            break;
          case 'any.empty':
            err.message = 'email cannot be empty';
            break;
          case 'string.email':
            err.message = 'incorrect email format. e.g example@mymail.com';
            break;
          default:
            break;
        }
      });
      return errors;
    },
  );

const password = joi.string().trim().invalid('').regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
  .required()
  .error(
    (errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case 'any.required':
            err.message = 'password field is required';
            break;
          case 'any.empty':
            err.message = 'password cannot be empty';
            break;
          case 'string.regex.base':
            err.message = 'Password must be beween 6 and 15 characters and contain letters and numbers ';
            break;
          default:
            break;
        }
      });
      return errors;
    },
  );
const queryLogin = joi.object().keys({
  password,
  email,
});
const querySchema = joi.object().keys({
  lat,
  long,
});

module.exports = {
  querySchema,
  queryId,
  queryLogin,
};
