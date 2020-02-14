const bluebird = require('bluebird');
const chalk = require('chalk');
const mongoose = require('mongoose');

const config = require('./config');

const connect = async () => {
  mongoose.Promise = bluebird;

  try {
    await mongoose.connect(`mongodb://${config.database.username}:${config.database.password}@${config.database.hostname}:${config.database.port}/${config.database.name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      chalk.green('Connected to Database successfully on hostname'),
      chalk.yellow(config.database.hostname),
      chalk.green('at port'),
      chalk.yellow(config.database.port),
    );
  } catch (error) {
    console.log(chalk.red(`Error in Database connection, ${error}`));
    process.exit();
  }
};

module.exports = {
  connect,
};
