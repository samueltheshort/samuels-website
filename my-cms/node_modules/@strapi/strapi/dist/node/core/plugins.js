"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const os = require("node:os");
const path = require("node:path");
const fs = require("node:fs");
const camelCase = require("lodash/camelCase");
const utils = require("@strapi/utils");
const dependencies = require("./dependencies.js");
const files = require("./files.js");
const errors = require("./errors.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const os__default = /* @__PURE__ */ _interopDefault(os);
const path__default = /* @__PURE__ */ _interopDefault(path);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const camelCase__default = /* @__PURE__ */ _interopDefault(camelCase);
const validatePackageHasStrapi = (pkg) => "strapi" in pkg && typeof pkg.strapi === "object" && !Array.isArray(pkg.strapi) && pkg.strapi !== null;
const validatePackageIsPlugin = (pkg) => validatePackageHasStrapi(pkg) && pkg.strapi.kind === "plugin";
const getEnabledPlugins = async ({
  cwd,
  logger,
  runtimeDir,
  strapi
}) => {
  const plugins = {};
  const deps = strapi.config.get("info.dependencies", {});
  logger.debug("Dependencies from user's project", os__default.default.EOL, deps);
  for (const dep of Object.keys(deps)) {
    const pkg = await dependencies.getModule(dep, cwd);
    if (pkg && validatePackageIsPlugin(pkg)) {
      const name = pkg.strapi.name || pkg.name;
      if (!name) {
        throw Error(
          "You're trying to import a plugin that doesn't have a name – check the package.json of that plugin!"
        );
      }
      plugins[name] = {
        name,
        importName: camelCase__default.default(name),
        type: "module",
        modulePath: dep
      };
    }
  }
  const userPluginsFile = await loadUserPluginsFile(strapi.dirs.app.config);
  logger.debug("User's plugins file", os__default.default.EOL, userPluginsFile);
  for (const [userPluginName, userPluginConfig] of Object.entries(userPluginsFile)) {
    if (userPluginConfig.enabled && userPluginConfig.resolve) {
      const sysPath = files.convertModulePathToSystemPath(userPluginConfig.resolve);
      plugins[userPluginName] = {
        name: userPluginName,
        importName: camelCase__default.default(userPluginName),
        type: "local",
        /**
         * User plugin paths are resolved from the entry point
         * of the app, because that's how you import them.
         */
        modulePath: files.convertSystemPathToModulePath(path__default.default.relative(runtimeDir, sysPath)),
        path: sysPath
      };
    }
  }
  return plugins;
};
const PLUGIN_CONFIGS = ["plugins.js", "plugins.mjs", "plugins.ts"];
const loadUserPluginsFile = async (root) => {
  for (const file of PLUGIN_CONFIGS) {
    const filePath = path__default.default.join(root, file);
    const configFile = await files.loadFile(filePath);
    if (configFile) {
      return typeof configFile === "function" ? configFile({ env: utils.env }) : configFile;
    }
  }
  return {};
};
const getMapOfPluginsWithAdmin = (plugins) => {
  const pluginImportPaths = {};
  return Object.values(plugins).filter((plugin) => {
    if (!plugin) {
      return false;
    }
    try {
      const localPluginPath = plugin.path;
      if (localPluginPath) {
        const packageJsonPath = path__default.default.join(localPluginPath, "package.json");
        if (fs__default.default.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs__default.default.readFileSync(packageJsonPath, "utf-8"));
          const localAdminPath = packageJson?.exports?.["./strapi-admin"]?.import;
          if (localAdminPath) {
            pluginImportPaths[plugin.modulePath] = localAdminPath;
            return true;
          }
        }
        if (fs__default.default.existsSync(path__default.default.join(localPluginPath, "strapi-admin.js"))) {
          pluginImportPaths[plugin.modulePath] = "strapi-admin";
          return true;
        }
      }
      if (require.resolve(`${plugin.modulePath}/strapi-admin`)) {
        pluginImportPaths[plugin.modulePath] = "strapi-admin";
        return true;
      }
      return false;
    } catch (err) {
      if (errors.isError(err) && "code" in err && (err.code === "MODULE_NOT_FOUND" || err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED")) {
        return false;
      }
      throw err;
    }
  }).map((plugin) => ({
    ...plugin,
    modulePath: `${plugin.modulePath}/${pluginImportPaths[plugin.modulePath]}`
  }));
};
exports.getEnabledPlugins = getEnabledPlugins;
exports.getMapOfPluginsWithAdmin = getMapOfPluginsWithAdmin;
//# sourceMappingURL=plugins.js.map
