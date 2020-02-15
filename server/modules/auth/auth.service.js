const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const config = require('./../../config');
const RefreshToken = require('./refresh.token');

class AuthService {
  static async createAccessToken({ id, email, role }) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id, email, role },
        config.accessToken.secret,
        { expiresIn: config.accessToken.expiresIn },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        },
      );
    });
  }

  static async verifyAccessToken(accessToken) {
    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, config.accessToken.secret, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }

  static async createRefreshToken(userId) {
    const refreshToken = randToken.uid(256);

    await RefreshToken.create({
      userId,
      refreshToken,
    });

    return refreshToken;
  }

  static async verifyRefreshToken(userId, refreshToken) {
    const refreshTokenExist = await RefreshToken.findOne({
      userId,
      refreshToken,
    });

    return !!refreshTokenExist;
  }

  static async deleteRefreshToken(refreshToken) {
    return RefreshToken.delete({
      refreshToken,
    });
  }
}

module.exports = AuthService;
