const AuthService = require('./auth.service');
const users = require('./../users');

const refreshTokens = {};

class AuthHandler {
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await users.service.login(email, password);
      const accessToken = await AuthService.createAccessToken(user);
      const refreshToken = AuthService.createRefreshToken();
      refreshTokens[refreshToken] = user.id;
      res.send({ accessToken, refreshToken });
    } catch (err) {
      res.sendStatus(401);
    }
  }

  static async refresh(req, res) {
    const { id, refreshToken } = req.body;

    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] === id)) {
      try {
        const user = await users.service.getById(id);

        const accessToken = await AuthService.createAccessToken(user);
        res.send({ accessToken });
      } catch (err) {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  }

  static logout(req, res) {
    const { refreshToken } = req.body;

    if (refreshToken in refreshTokens) {
      delete refreshTokens[refreshToken];
    }

    res.sendStatus(204);
  }
}

module.exports = AuthHandler;
