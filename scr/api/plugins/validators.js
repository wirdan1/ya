const Joi = require('joi');

module.exports.createSchema = (params = []) => Joi.object(
  params.reduce((obj, param) => ({ ...obj, [param]: Joi.string().required() }), {})
);