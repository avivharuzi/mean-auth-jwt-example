const auth = require('./modules/auth');
const middlewares = require('./middlewares');
const users = require('./modules/users');

const routes = (app) => {
  app.use('/auth', auth.router);

  app.use('/users', middlewares.authenticatedUser, users.router);
};

module.exports = routes;
