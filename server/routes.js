const auth = require('./modules/auth');

const routes = (app) => {
  app.use('/auth', auth.router);
};

module.exports = routes;
