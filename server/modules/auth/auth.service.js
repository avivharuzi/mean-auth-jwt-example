const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const config = require('./../../config');
const Token = require('./token');

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

    await Token.create({
      userId,
      refreshToken,
    });

    return refreshToken;
  }

  static async verifyRefreshToken(userId, refreshToken) {
    const refreshTokenExist = await Token.findOne({
      userId,
      refreshToken,
    });

    return !!refreshTokenExist;
  }

  static async deleteRefreshToken(refreshToken) {
    return Token.deleteMany({
      refreshToken,
    });
  }
}

module.exports = AuthService;
