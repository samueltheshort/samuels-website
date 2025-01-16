"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const getUserPluginsConfig = require("./get-user-plugins-config.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const ___default = /* @__PURE__ */ _interopDefault(_);
const INTERNAL_PLUGINS = [
  "@strapi/content-manager",
  "@strapi/content-type-builder",
  "@strapi/email",
  "@strapi/upload",
  "@strapi/i18n",
  "@strapi/content-releases",
  "@strapi/review-workflows"
];
const isStrapiPlugin = (info) => fp.get("strapi.kind", info) === "plugin";
const validatePluginName = (pluginName) => {
  if (!strapiUtils.strings.isKebabCase(pluginName)) {
    throw new Error(`Plugin name "${pluginName}" is not in kebab (an-example-of-kebab-case)`);
  }
};
const toDetailedDeclaration = (declaration) => {
  if (typeof declaration === "boolean") {
    return { enabled: declaration };
  }
  const detailedDeclaration = {
    enabled: declaration.enabled
  };
  if (declaration?.resolve) {
    let pathToPlugin = "";
    if (declaration.isModule) {
      pathToPlugin = path.join(declaration.resolve, "..");
    } else {
      try {
        pathToPlugin = path.dirname(require.resolve(declaration.resolve));
      } catch (e) {
        pathToPlugin = path.resolve(strapi.dirs.app.root, declaration.resolve);
        if (!fs.existsSync(pathToPlugin) || !fs.statSync(pathToPlugin).isDirectory()) {
          throw new Error(`${declaration.resolve} couldn't be resolved`);
        }
      }
    }
    detailedDeclaration.pathToPlugin = pathToPlugin;
  }
  return detailedDeclaration;
};
const getEnabledPlugins = async (strapi2, { client } = { client: false }) => {
  const internalPlugins = {};
  for (const dep of INTERNAL_PLUGINS) {
    const packagePath = path.join(dep, "package.json");
    const packageModulePath = require.resolve(packagePath, {
      paths: [require.resolve("@strapi/strapi/package.json"), process.cwd()]
    });
    const packageInfo = require(packageModulePath);
    validatePluginName(packageInfo.strapi.name);
    internalPlugins[packageInfo.strapi.name] = {
      ...toDetailedDeclaration({ enabled: true, resolve: packageModulePath, isModule: client }),
      info: packageInfo.strapi,
      packageInfo
    };
  }
  const installedPlugins = {};
  const dependencies = strapi2.config.get("info.dependencies", {});
  for (const dep of Object.keys(dependencies)) {
    const packagePath = path.join(dep, "package.json");
    let packageInfo;
    try {
      packageInfo = require(packagePath);
    } catch {
      continue;
    }
    if (isStrapiPlugin(packageInfo)) {
      validatePluginName(packageInfo.strapi.name);
      installedPlugins[packageInfo.strapi.name] = {
        ...toDetailedDeclaration({ enabled: true, resolve: packagePath, isModule: client }),
        info: {
          ...packageInfo.strapi,
          packageName: packageInfo.name
        },
        packageInfo
      };
    }
  }
  const declaredPlugins = {};
  const userPluginsConfig = await getUserPluginsConfig.getUserPluginsConfig();
  ___default.default.forEach(userPluginsConfig, (declaration, pluginName) => {
    validatePluginName(pluginName);
    declaredPlugins[pluginName] = {
      ...toDetailedDeclaration(declaration),
      info: {}
    };
    const { pathToPlugin } = declaredPlugins[pluginName];
    if (pathToPlugin) {
      const packagePath = path.join(pathToPlugin, "package.json");
      const packageInfo = require(packagePath);
      if (isStrapiPlugin(packageInfo)) {
        declaredPlugins[pluginName].info = packageInfo.strapi || {};
        declaredPlugins[pluginName].packageInfo = packageInfo;
      }
    }
  });
  const declaredPluginsResolves = fp.map(fp.prop("pathToPlugin"), declaredPlugins);
  const installedPluginsNotAlreadyUsed = fp.pickBy(
    (p) => !declaredPluginsResolves.includes(p.pathToPlugin),
    installedPlugins
  );
  const enabledPlugins = fp.pipe(
    fp.defaultsDeep(declaredPlugins),
    fp.defaultsDeep(installedPluginsNotAlreadyUsed),
    fp.pickBy((p) => p.enabled)
  )(internalPlugins);
  return enabledPlugins;
};
exports.getEnabledPlugins = getEnabledPlugins;
//# sourceMappingURL=get-enabled-plugins.js.map
