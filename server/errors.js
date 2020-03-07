const HttpStatus = require('http-status-codes');

module.exports = Object.freeze({
  validation: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'One or more of the input values you entered are invalid',
  },
  unauthorized: {
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Not authorized, please login to gain access',
  },
  unknown: {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An error has occurred, please try again later',
  },
});
