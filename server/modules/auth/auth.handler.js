const AuthService = require('./auth.service');
const users = require('./../users');

class AuthHandler {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await users.service.login(email, password);
      const accessToken = await AuthService.createAccessToken(user);
      const refreshToken = await AuthService.createRefreshToken(user.id);
      res.send({ accessToken, refreshToken });
    } catch (err) {
      res.sendStatus(401);
    }
  }

  static async refresh(req, res) {
    const { email, refreshToken } = req.body;

    const user = await users.service.getByEmail(email);
    const isVerified = await AuthService.verifyRefreshToken(email, refreshToken);

    if (isVerified) {
      try {
        const accessToken = await AuthService.createAccessToken(user);
        res.send({ accessToken });
      } catch (err) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
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
