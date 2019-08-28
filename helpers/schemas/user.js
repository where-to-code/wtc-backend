const joi = require('joi');

const firstname = joi
  .string()
  .invalid('')
  .required()
  .error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'firstname field is required';
          break;
        case 'any.empty':
          err.message = 'firstname cannot be empty';
          break;
        case 'string.base':
          err.message = 'firstname must be a string';
        default:
          break;
      }
    });
    return errors;
  });

const lastname = joi
  .string()       
  .invalid('')
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
        default:
          break;
      }
    });
    return errors;
  });
const  email= joi
  .string()
  .email()
  .number()
  .invalid('')
  .required().error(errors => {
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
        default:
          break;
      }
    });
    return errors;
  });


const  password= joi
  .string()
  .number()
  .invalid('')
  .required().error(errors => {
    errors.forEach(err => {
      // eslint-disable-next-line default-case
      switch (err.type) {
        case 'any.required':
          err.message = 'password field is required';
          break;
        case 'any.empty':
          err.message = 'password cannot be empty';
          break;
        case 'string.base':
          err.message = 'password must be a number';
        default:
          break;
      }
    });
    return errors;
  });

const querySchema = joi.object().keys({
  firstname,
  lastname,
  email,
  password,
});


module.exports = {
  querySchema,
};
