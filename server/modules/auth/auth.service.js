const jwt = require('jsonwebtoken');
const randToken = require('rand-token');

const config = require('./../../config');

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

  static createRefreshToken() {
    return randToken.uid(256);
  }
}

module.exports = AuthService;
