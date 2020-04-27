const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

class Password {
  static async generateHash(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_WORK_FACTOR, (saltError, salt) => {
        if (saltError) {
          reject(saltError);
        }

        bcrypt.hash(password, salt, (hashError, hashPassword) => {
          if (hashError) {
            reject(hashError);
          }

          resolve(hashPassword);
        });
      });
    });
  }

  static async compare(password, hashPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashPassword, (error, hasMatch) => {
        if (error) {
          reject(error);
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
