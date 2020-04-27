const errors = require('./../../errors');
const User = require('./user');
const utils = require('./../../utils');

class UserService {
  static async login(email, password) {
    try {
      const user = await User.findOne({ email });

      await user.comparePassword(password);

      return user;
    } catch (error) {
      throw new utils.ErrorHandler(errors.login);
    }
  }

  static async getById(id) {
    return User.findById(id);
  }

  static async getProfile(id) {
    return User.findById(id).select('-password');
  }

  static async getByEmail(email) {
    return User.findOne({ email });
  }

  static async create(user) {
    const isEmailAlreadyExist = await this.isEmailExistAlready(user.email);

    if (isEmailAlreadyExist) {
      throw new utils.ErrorHandler(errors.emailAlreadyExist);
    }

    return User.create({
      ...user,
    });
  }

  static async isEmailExistAlready(email) {
    try {
      const user = await this.getByEmail(email);

      return !!user;
    } catch (error) {
      return true; // If there was an error treat like its already exist.
    }
  }
}

module.exports = UserService;
