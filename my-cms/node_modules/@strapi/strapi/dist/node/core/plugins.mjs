import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import camelCase from "lodash/camelCase";
import { env } from "@strapi/utils";
import { getModule } from "./dependencies.mjs";
import { convertModulePathToSystemPath, convertSystemPathToModulePath, loadFile } from "./files.mjs";
import { isError } from "./errors.mjs";
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
  logger.debug("Dependencies from user's project", os.EOL, deps);
  for (const dep of Object.keys(deps)) {
    const pkg = await getModule(dep, cwd);
    if (pkg && validatePackageIsPlugin(pkg)) {
      const name = pkg.strapi.name || pkg.name;
      if (!name) {
        throw Error(
          "You're trying to import a plugin that doesn't have a name – check the package.json of that plugin!"
        );
      }
      plugins[name] = {
        name,
        importName: camelCase(name),
        type: "module",
        modulePath: dep
      };
    }
  }
  const userPluginsFile = await loadUserPluginsFile(strapi.dirs.app.config);
  logger.debug("User's plugins file", os.EOL, userPluginsFile);
  for (const [userPluginName, userPluginConfig] of Object.entries(userPluginsFile)) {
    if (userPluginConfig.enabled && userPluginConfig.resolve) {
      const sysPath = convertModulePathToSystemPath(userPluginConfig.resolve);
      plugins[userPluginName] = {
        name: userPluginName,
        importName: camelCase(userPluginName),
        type: "local",
        /**
         * User plugin paths are resolved from the entry point
         * of the app, because that's how you import them.
         */
        modulePath: convertSystemPathToModulePath(path.relative(runtimeDir, sysPath)),
        path: sysPath
      };
    }
  }
  return plugins;
};
const PLUGIN_CONFIGS = ["plugins.js", "plugins.mjs", "plugins.ts"];
const loadUserPluginsFile = async (root) => {
  for (const file of PLUGIN_CONFIGS) {
    const filePath = path.join(root, file);
    const configFile = await loadFile(filePath);
    if (configFile) {
      return typeof configFile === "function" ? configFile({ env }) : configFile;
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
        const packageJsonPath = path.join(localPluginPath, "package.json");
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
          const localAdminPath = packageJson?.exports?.["./strapi-admin"]?.import;
          if (localAdminPath) {
            pluginImportPaths[plugin.modulePath] = localAdminPath;
            return true;
          }
        }
        if (fs.existsSync(path.join(localPluginPath, "strapi-admin.js"))) {
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
      if (isError(err) && "code" in err && (err.code === "MODULE_NOT_FOUND" || err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED")) {
        return false;
      }
      throw err;
    }
  }).map((plugin) => ({
    ...plugin,
    modulePath: `${plugin.modulePath}/${pluginImportPaths[plugin.modulePath]}`
  }));
};
export {
  getEnabledPlugins,
  getMapOfPluginsWithAdmin
};
//# sourceMappingURL=plugins.mjs.map
