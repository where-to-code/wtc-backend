/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
const joi = require('joi');
const locationSchema = require('../helpers/schemas/location');
const userSchema = require('../helpers/schemas/user');
const statusHandler = require('../helpers/statusHandler');

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
        return statusHandler(res, 400, errMsg);
      }
      next();
    },
  );
};
const validateQuery = (req, res, next) => {
  return validate(req.query, locationSchema.querySchema, res, next);
};
const validateId = (req, res, next) => {
  return validate(Number(req.params.id), locationSchema.queryId, res, next);
};
const validateLogin = (req, res, next) => {
  return validate(req.body, userSchema.loginSchema, res, next);
};
const validateRegister = (req, res, next) => {
  return validate(req.body, userSchema.registerSchema, res, next);
};

module.exports = {
  validateQuery,
  validateId,
  validateLogin,
  validateRegister,
};
