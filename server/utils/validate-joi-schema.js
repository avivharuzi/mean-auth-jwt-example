const Joi = require('joi');

const ErrorHandler = require('./error-handler');
const errors = require('./../errors');

module.exports = (value, schema) => {
  try {
    const result = Joi.validate(value, schema, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (result.error) {
      throw result.error;
    }

    return result.value;
  } catch (error) {
    throw new ErrorHandler(errors.validation, error);
  }
};
