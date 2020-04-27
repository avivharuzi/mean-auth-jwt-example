const AuthHandler = require('./auth.handler');
const authRouter = require('./auth.router');
const AuthService = require('./auth.service');

module.exports = {
  handler: AuthHandler,
  service: AuthService,
  router: authRouter,
};
