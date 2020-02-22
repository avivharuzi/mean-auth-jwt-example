const User = require('./user');

class UserService {
  static async login(email, password) {
    try {
      const user = await User.findOne({ email });

      await user.comparePassword(password);

      return user;
    } catch (err) {
      throw new Error('The email or password are invalid');
    }
  }

  static async getById(id) {
    return User.findById(id);
  }

  static async getByEmail(email) {
    return User.findOne({ email });
  }

  static async create(user) {
    return User.create({
      ...user,
    });
  }
}

module.exports = UserService;
