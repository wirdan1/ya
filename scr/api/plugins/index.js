const fs = require('fs-extra');
const path = require('path');
const Router = require('express').Router();
const Joi = require('joi');
const logger = require('../../config/logger');

class PluginLoader {
  constructor() {
    this.router = Router();
    this.loadedPlugins = [];
    this.loadPlugins();
  }

  loadPlugins() {
    const pluginsDir = path.join(__dirname, '../../../plugins');
    if (!fs.existsSync(pluginsDir)) return;

    fs.readdirSync(pluginsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .forEach(catDir => {
        const category = catDir.name;
        const catPath = path.join(pluginsDir, category);
        fs.readdirSync(catPath)
          .filter(f => f.endsWith('.js'))
          .forEach(file => {
            const pluginPath = path.join(catPath, file);
            const plugin = require(pluginPath);
            if (plugin.name && plugin.run) {
              this.register(plugin, category);
              logger.info(`Loaded: ${plugin.name}`);
            }
          });
      });
  }

  register(plugin, category) {
    const route = `/${category}/${plugin.name.toLowerCase()}`;
    const schema = Joi.object(plugin.params.reduce((obj, p) => ({ ...obj, [p]: Joi.string().required() }), {}));

    this.router.get(route, async (req, res, next) => {
      const { error } = schema.validate(req.query);
      if (error) return res.status(400).json({ status: false, error: error.details[0].message });
      try {
        await plugin.run(req, res);
      } catch (err) {
        next(err);
      }
    });

    this.loadedPlugins.push({ name: plugin.name, category, route: `/api/plugins${route}` });
  }

  getLoadedPlugins() {
    return this.loadedPlugins;
  }
}

module.exports = new PluginLoader();