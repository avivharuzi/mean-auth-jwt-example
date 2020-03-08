const chalk = require('chalk');
const HttpStatus = require('http-status-codes');

const config = require('./../config');
const ErrorHandler = require('./../utils/error-handler');
const errors = require('./../errors');

module.exports = () => (req, res, next) => {
  res.locals.success = (data) => {
    let statusCode;

    switch (req.method) {
      case 'DELETE':
        statusCode = HttpStatus.NO_CONTENT;
        break;
      case 'GET':
      case 'PATCH':
      case 'PUT':
        statusCode = HttpStatus.OK;
        break;
      case 'POST':
        statusCode = HttpStatus.CREATED;
        break;
      default:
        statusCode = HttpStatus.OK;
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
