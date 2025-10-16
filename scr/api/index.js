const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const swaggerUi = require('swagger-ui-express');

const swaggerSpec = require('./swagger');
const pluginLoader = require('./plugins/index');

const router = express.Router();

router.use(helmet());
router.use(compression());
router.use(cors({ origin: '*' }));
router.use(express.json());

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { background-color: #4f46e5; } .swagger-ui .info { color: #fff; }',
  customSiteTitle: 'Modern API Docs'
}));

router.get('/', (req, res) => res.json({
  status: true,
  message: 'Modern Canggih API',
  docs: '/docs',
  plugins: pluginLoader.getLoadedPlugins()
}));

router.use('/plugins', pluginLoader.router);

router.use('*', (req, res, next) => next({ status: 404, message: 'Not Found' }));

module.exports = router;