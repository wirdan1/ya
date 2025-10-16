const logger = require('../config/logger');

module.exports = (err, req, res, next) => {
  logger.error(err.stack);
  const status = err.status || 500;
  const isApi = req.path.startsWith('/api');
  if (isApi) {
    res.status(status).json({ status: false, error: err.message });
  } else {
    res.status(status).sendFile(status === 404 ? '404.html' : 'error.html', { root: 'public' });
  }
};