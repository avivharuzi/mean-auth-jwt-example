const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');

const config = require('./config');
const db = require('./db');
const routes = require('./routes');
const middlewares = require('./middlewares');

const app = express();

app.use(cors());
app.use(helmet());
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression({ threshold: 0 }));

if (!config.server.isProduction) {
  app.use(morgan('dev')); // Log requests on development.
}

app.use(middlewares.response()); // res.locals.success, res.locals.error

db.connect().then(); // Connect to Database.

routes(app); // Configure all our application routes.

module.exports = app;
