const httpStatusCodes = require('http-status-codes');

module.exports = Object.freeze({
  validation: {
    statusCode: httpStatusCodes.BAD_REQUEST,
    message: 'One or more of the input values you entered are invalid',
  },
  login: {
    statusCode: httpStatusCodes.UNAUTHORIZED,
    message: 'The email or password are invalid',
  },
  unauthorized: {
    statusCode: httpStatusCodes.UNAUTHORIZED,
    message: 'Not authorized, please login to gain access',
  },
  unknown: {
    statusCode: httpStatusCodes.INTERNAL_SERVER_ERROR,
    message: 'An error has occurred, please try again later',
  },
});
