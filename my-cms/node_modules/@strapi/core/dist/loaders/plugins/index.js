"use strict";
const path = require("path");
const fse = require("fs-extra");
const fp = require("lodash/fp");
const resolve = require("resolve.exports");
const strapiUtils = require("@strapi/utils");
const loadConfigFile = require("../../utils/load-config-file.js");
const loadFiles = require("../../utils/load-files.js");
const getEnabledPlugins = require("./get-enabled-plugins.js");
const getUserPluginsConfig = require("./get-user-plugins-config.js");
const index = require("../../domain/content-type/index.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const fse__default = /* @__PURE__ */ _interopDefault(fse);
const resolve__namespace = /* @__PURE__ */ _interopNamespace(resolve);
const defaultPlugin = {
  bootstrap() {
  },
  destroy() {
  },
  register() {
  },
  config: {
    default: {},
    validator() {
    }
  },
  routes: [],
  controllers: {},
  services: {},
  policies: {},
  middlewares: {},
  contentTypes: {}
};
const applyUserExtension = async (plugins) => {
  const extensionsDir = strapi.dirs.dist.extensions;
  if (!await fse__default.default.pathExists(extensionsDir)) {
    return;
  }
  const extendedSchemas = await loadFiles.loadFiles(extensionsDir, "**/content-types/**/schema.json");
  const strapiServers = await loadFiles.loadFiles(extensionsDir, "**/strapi-server.js");
  for (const pluginName of Object.keys(plugins)) {
    const plugin = plugins[pluginName];
    for (const ctName of Object.keys(plugin.contentTypes)) {
      const extendedSchema = fp.get([pluginName, "content-types", ctName, "schema"], extendedSchemas);
      if (extendedSchema) {
        plugin.contentTypes[ctName].schema = {
          ...plugin.contentTypes[ctName].schema,
          ...extendedSchema
        };
      }
    }
    const strapiServer = fp.get([pluginName, "strapi-server"], strapiServers);
    if (strapiServer) {
      plugins[pluginName] = await strapiServer(plugin);
    }
  }
};
const applyUserConfig = async (plugins) => {
  const userPluginsConfig = await getUserPluginsConfig.getUserPluginsConfig();
  for (const pluginName of Object.keys(plugins)) {
    const plugin = plugins[pluginName];
    const userPluginConfig = fp.getOr({}, `${pluginName}.config`, userPluginsConfig);
    const defaultConfig = typeof plugin.config.default === "function" ? plugin.config.default({ env: strapiUtils.env }) : plugin.config.default;
    const config = fp.defaultsDeep(defaultConfig, userPluginConfig);
    try {
      plugin.config.validator(config);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Error regarding ${pluginName} config: ${e.message}`);
      }
      throw e;
    }
    plugin.config = config;
  }
};
async function loadPlugins(strapi2) {
  const plugins = {};
  const enabledPlugins = await getEnabledPlugins.getEnabledPlugins(strapi2);
  strapi2.config.set("enabledPlugins", enabledPlugins);
  for (const pluginName of Object.keys(enabledPlugins)) {
    const enabledPlugin = enabledPlugins[pluginName];
    let serverEntrypointPath;
    let resolvedExport = "./strapi-server.js";
    try {
      resolvedExport = (resolve__namespace.exports(enabledPlugin.packageInfo, "strapi-server", {
        require: true
      }) ?? "./strapi-server.js").toString();
    } catch (e) {
    }
    try {
      serverEntrypointPath = path.join(enabledPlugin.pathToPlugin, resolvedExport);
    } catch (e) {
      throw new Error(
        `Error loading the plugin ${pluginName} because ${pluginName} is not installed. Please either install the plugin or remove it's configuration.`
      );
    }
    if (!await fse__default.default.pathExists(serverEntrypointPath)) {
      continue;
    }
    const pluginServer = loadConfigFile.loadConfigFile(serverEntrypointPath);
    plugins[pluginName] = {
      ...defaultPlugin,
      ...pluginServer,
      contentTypes: formatContentTypes(pluginName, pluginServer.contentTypes ?? {}),
      config: fp.defaults(defaultPlugin.config, pluginServer.config),
      routes: pluginServer.routes ?? defaultPlugin.routes
    };
  }
  await applyUserConfig(plugins);
  await applyUserExtension(plugins);
  for (const pluginName of Object.keys(plugins)) {
    strapi2.get("plugins").add(pluginName, plugins[pluginName]);
  }
}
const formatContentTypes = (pluginName, contentTypes) => {
  Object.values(contentTypes).forEach((definition) => {
    const { schema } = definition;
    Object.assign(schema, {
      plugin: pluginName,
      collectionName: schema.collectionName || `${pluginName}_${schema.info.singularName}`.toLowerCase(),
      globalId: index.getGlobalId(schema, pluginName)
    });
  });
  return contentTypes;
};
module.exports = loadPlugins;
//# sourceMappingURL=index.js.map
