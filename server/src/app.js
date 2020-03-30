import 'dotenv/config';
import express from 'express';
import connectDB from './initializers/mongoose';
import loadExpress from './initializers/express';
import Logger from './initializers/logger';
import chalk from 'chalk';
import config from './config';

const app = express();

// Application-Level Middleware

async function startServer() {
  try {
    await connectDB();
    loadExpress(app);
    app.listen(config.port, () => {
      Logger.info(
        chalk.yellowBright('Connected to database successfully.'),
      );
      Logger.info(
        chalk.yellow(`
          Running server in ${chalk.yellow.bold(
            process.env.NODE_ENV,
          )} mode.
          ${chalk.yellow.bold(
            'Local:',
          )} http://${'localhost'}:${chalk.yellow.bold(config.port)}
        `),
      );
    });
  } catch (error) {
    Logger.error(chalk.red(error));
    process.exit(1);
    return;
  }
}

startServer();
