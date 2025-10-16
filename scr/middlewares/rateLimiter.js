const rateLimit = require('express-rate-limit');
const config = require('../config/env');

module.exports = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW,
  max: config.RATE_LIMIT_MAX,
  message: { status: false, error: 'Rate limit exceeded' }
});