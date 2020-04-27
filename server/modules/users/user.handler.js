const UserService = require('./user.service');

class UserHandler {
  static async settingsProfile(req, res) {
    try {
      const { id } = req.locals && req.locals.user;

      const userProfile = await UserService.getProfile(id);

      res.locals.success(userProfile);
    } catch (error) {
      res.locals.error(error);
    }
  }
}

module.exports = UserHandler;
