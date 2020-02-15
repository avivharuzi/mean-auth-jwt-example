const AuthHandler = require('./auth.handler');
const AuthService = require('./auth.service');
const router = require('./auth.router');

module.exports = {
  handler: AuthHandler,
  service: AuthService,
  router,
};
