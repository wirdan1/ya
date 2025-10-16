const morgan = require('morgan');
const logger = require('../config/logger');

module.exports = morgan((tokens, req, res) => {
  const log = `${tokens.method(req, res)} ${tokens.url(req, res)} ${tokens.status(req, res)} - ${tokens['response-time'](req, res)} ms`;
  logger.info(log);
  return null;
});