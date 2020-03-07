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
      console.log(chalk.red(err));
    }

    if (!err || err.constructor.name !== 'ErrorHandler') {
      // eslint-disable-next-line
        err = new ErrorHandler(errors.unknown);
    }

    res.status(err.statusCode);

    res.send({
      message: err.message,
      errors: err.errors,
    });
  };

  next();
};
