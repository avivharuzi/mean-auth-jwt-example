require('dotenv').config();

const chalk = require('chalk');

const app = require('./app');
const config = require('./config');

const hostname = config.server.hostname || '127.0.0.1';
const port = config.server.port || 8080;

app.listen(port, hostname, () => {
  console.log(chalk.blue(`Server running at: http://${hostname}:${port}`));
});
