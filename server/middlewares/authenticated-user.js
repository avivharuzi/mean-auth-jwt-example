const _ = require('lodash/core');

const auth = require('./../modules/auth');
const ErrorHandler = require('./../utils/error-handler');
const errors = require('./../errors');

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.end();
  }

  let isAuthenticated = false;

  if (!_.isUndefined(req.headers.authorization)) {
    const accessToken = req.headers.authorization;

    try {
      if (!req.locals) {
        req.locals = {};
      }

      // Verify access token will return decoded data (the user).
      req.locals.user = await auth.service.verifyAccessToken(accessToken);

      isAuthenticated = true;
    } catch (err) {
      // If we got an error do nothing because the default isAuthenticated is false.
    }
  }

  if (isAuthenticated) {
    next();
  } else {
    res.locals.error(new ErrorHandler(errors.unauthorized));
  }
};
