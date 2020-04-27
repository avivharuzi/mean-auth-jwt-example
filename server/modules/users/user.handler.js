const UserService = require('./user.service');

class UserHandler {
  static async settingsProfile(req, res) {
    try {
      const { id } = res.locals && res.locals.user;

      const userProfile = await UserService.getById(id);

      res.locals.success(userProfile);
    } catch (error) {
      res.locals.error(error);
    }
  }
}

module.exports = UserHandler;
