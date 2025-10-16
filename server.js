require('dotenv').config();
const express = require('express');
const app = express();
const config = require('./src/config/env');
const logger = require('./src/config/logger');
const apiRouter = require('./src/api/index');

// Middlewares
app.use(require('./src/middlewares/requestLogger'));
app.use(require('./src/middlewares/rateLimiter'));

// API Routes
app.use('/api', apiRouter);

// Static for error pages
app.use(express.static('public'));

// Health Check
app.get('/health', (req, res) => res.json({ status: 'up', time: new Date().toISOString() }));

// Error Handler
app.use(require('./src/middlewares/error'));

const port = config.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => logger.info(`🚀 API ready on port ${port}`));
}

module.exports = app;