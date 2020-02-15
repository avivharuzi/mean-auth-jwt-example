const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

class Password {
  static async generateHash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, (saltErr, salt) => {
        if (saltErr) {
          reject(saltErr);
        }

        bcrypt.hash(password, salt, (hashErr, hashPassword) => {
          if (hashErr) {
            reject(hashErr);
          }

          resolve(hashPassword);
        });
      });
    });
  }

  static async compare(password, hashPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashPassword, (err, hasMatch) => {
        if (err) {
          reject(err);
        } else if (hasMatch) {
          resolve(hasMatch);
        } else {
          reject();
        }
      });
    });
  }
}

module.exports = Password;
