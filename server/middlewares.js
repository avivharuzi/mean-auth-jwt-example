const auth = require('./modules/auth');

const authenticatedUser = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.end();
  }

  let isAuthenticated = false;

  if (req.headers.authorization !== undefined) {
    const accessToken = req.headers.authorization;

    try {
      if (!req.locals) {
        req.locals = {};
      }

      // Verify access token will return decoded data (the user).
      req.locals.user = await auth.service.verifyAccessToken(accessToken);

      isAuthenticated = true;
    } catch (_) {
      // If we got an error do nothing because the default isAuthenticated is false.
    }
  }

  if (isAuthenticated) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authenticatedUser,
};
