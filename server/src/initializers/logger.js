import winston, { format } from 'winston';
import config from '../config';

const path = require('path');
const transports = [];

if (config.isDev) {
  transports.push(
    new winston.transports.Console({
      format: format.combine(format.cli(), format.splat()),
    }),
    new winston.transports.File({
      filename: path.join('logs', 'development.log'),
    }),
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: format.combine(format.cli(), format.splat()),
    }),
    new winston.transports.File({
      filename: path.join('logs', 'production.log'),
    }),
  );
}

const LoggerInstance = winston.createLogger({
  levels: winston.config.npm.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports,
});

export default LoggerInstance;
