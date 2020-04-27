const AuthService = require('./auth.service');
const errors = require('./../../errors');
const joiSchemas = require('./../../joi-schemas');
const users = require('./../users');
const utils = require('./../../utils');

class AuthHandler {
  static async signup(req, res) {
    try {
      const userBody = utils.validateJoiSchema(req.body, joiSchemas.userBodySchema);

      await users.service.create(userBody);

      res.locals.success({});
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await users.service.login(email, password);
      const accessToken = await AuthService.createAccessToken(user);
      const refreshToken = await AuthService.createRefreshToken(user.id);

      res.locals.success({ accessToken, refreshToken });
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async refresh(req, res) {
    const { email, refreshToken } = req.body;

    try {
      const user = await users.service.getByEmail(email);

      const isVerified = await AuthService.verifyRefreshToken(user.id, refreshToken);

      if (!isVerified) {
        // noinspection ExceptionCaughtLocallyJS
        throw new utils.ErrorHandler(errors.unauthorized);
      }

      const accessToken = await AuthService.createAccessToken(user);

      res.locals.success({ accessToken });
    } catch (error) {
      res.locals.error(error);
    }
  }

  static async logout(req, res) {
    const { refreshToken } = req.body;

    try {
      await AuthService.deleteRefreshToken(refreshToken);
    } catch (error) {
      res.locals.error(error);
    }

    res.locals.success();
  }
}

module.exports = AuthHandler;
