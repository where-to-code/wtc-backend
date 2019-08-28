/* eslint-disable no-param-reassign */
const joi = require('joi');

const firstname = joi
  .string()
  .trim()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case 'any.required':
          err.message = 'firstname field is required';
          break;
        case 'any.empty':
          err.message = 'firstname cannot be empty';
          break;
        case 'string.base':
          err.message = 'firstname must be a string';
          break;
        default:
          break;
      }
    });
    return errors;
  });

const lastname = joi
  .string()
  .invalid('')
  .trim()
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'lastname field is required';
          break;
        case 'any.empty':
          err.message = 'lastname cannot be empty';
          break;
        case 'string.base':
          err.message = 'lastname must be a string';
          break;
        default:
          break;
      }
    });
    return errors;
  });
const email = joi
  .string()
  .email()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'email field is required';
          break;
        case 'any.empty':
          err.message = 'email cannot be empty';
          break;
        case 'number.base':
          err.message = 'email must be a number';
          break;
        default:
          break;
      }
    });
    return errors;
  });

const password = joi
  .string()
  .trim()
  .invalid('')
  .regex(/(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/)
  .required()
  .error(errors => {
    errors.forEach(err => {
      switch (err.type) {
        case 'any.required':
          err.message = 'password field is required';
          break;
        case 'any.empty':
          err.message = 'password cannot be empty';
          break;
        case 'string.base':
          err.message = 'password must be a number';
          break;
        case 'string.regex.base':
          err.message =
            'Password must be beween 6 and 15 characters and contain letters and numbers ';
          break;
        default:
          break;
      }
    });
    return errors;
  });

const registerSchema = joi.object().keys({
  firstname,
  lastname,
  email,
  password,
});
const loginSchema = joi.object().keys({
  email,
  password,
});

module.exports = {
  registerSchema,
  loginSchema,
};
