const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // it will prints to terminal
    new transports.File({ filename: 'app.log' }) // also saves to file
  ],
});

module.exports = logger;