const chalk = require('chalk');
const httpMethods = require('http-methods-constants');
const httpStatusCodes = require('http-status-codes');

const config = require('./../config');
const ErrorHandler = require('./../utils/error-handler');
const errors = require('./../errors');

module.exports = () => (req, res, next) => {
  res.locals.success = (data) => {
    let statusCode;

    switch (req.method) {
      case httpMethods.DELETE:
        statusCode = httpStatusCodes.NO_CONTENT;
        break;
      case httpMethods.GET:
      case httpMethods.PATCH:
      case httpMethods.PUT:
        statusCode = httpStatusCodes.OK;
        break;
      case httpMethods.POST:
        statusCode = httpStatusCodes.CREATED;
        break;
      default:
        statusCode = httpStatusCodes.OK;
        break;
    }

    res.status(statusCode);

    res.send(data);
  };

  res.locals.error = (err) => {
    if (!config.server.isProduction) {
      console.log(chalk.red(`Error occurred in request process, err: ${err}`));
    }

    let errorHandler;

    if (!err || err.constructor.name !== 'ErrorHandler') {
      errorHandler = new ErrorHandler(errors.unknown);
    } else {
      errorHandler = err;
    }

    res.status(errorHandler.statusCode);

    res.send({
      message: errorHandler.message,
      errors: errorHandler.errors,
    });
  };

  next();
};
