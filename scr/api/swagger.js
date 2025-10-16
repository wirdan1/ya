const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Modern REST API', version: '1.0.0', description: 'Canggih & Modern' },
    servers: [{ url: '/api' }]
  },
  apis: ['../../plugins/**/*.js', './*.js']
};

module.exports = swaggerJsdoc(options);