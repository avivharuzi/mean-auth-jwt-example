const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const db = require('./db');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.connect().then(); // Connect to Database.

routes(app); // Configure all our application routes.

module.exports = app;
