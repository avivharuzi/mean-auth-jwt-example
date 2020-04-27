const UserHandler = require('./user.handler');
const userRouter = require('./user.router');
const UserService = require('./user.service');

module.exports = {
  handler: UserHandler,
  router: userRouter,
  service: UserService,
};
