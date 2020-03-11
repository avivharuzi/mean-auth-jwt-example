const AuthService = require('./auth.service');
const ErrorHandler = require('./../../utils/error-handler');
const errors = require('./../../errors');
const users = require('./../users');

class AuthHandler {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await users.service.login(email, password);
      const accessToken = await AuthService.createAccessToken(user);
      const refreshToken = await AuthService.createRefreshToken(user.id);

      res.locals.success({ accessToken, refreshToken });
    } catch (err) {
      res.locals.error(err);
    }
  }

  static async refresh(req, res) {
    const { email, refreshToken } = req.body;

    try {
      const user = await users.service.getByEmail(email);
      const isVerified = await AuthService.verifyRefreshToken(email, refreshToken);

      if (!isVerified) {
        // noinspection ExceptionCaughtLocallyJS
        throw new ErrorHandler(errors.unauthorized);
      }

      const accessToken = await AuthService.createAccessToken(user);

      res.locals.success({ accessToken });
    } catch (err) {
      res.locals.error(err);
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.body;

    try {
      await AuthService.deleteRefreshToken(refreshToken);
    } catch (err) {
      res.locals.error(err);
    }

    res.locals.success();
  }
}

module.exports = AuthHandler;
