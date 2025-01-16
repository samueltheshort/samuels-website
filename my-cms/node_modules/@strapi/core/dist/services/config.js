"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _ = require("lodash");
const createConfigProvider = (initialConfig = {}, strapi) => {
  const state = {
    config: { ...initialConfig }
    // not deep clone because it would break some config
  };
  const transformPathString = (path) => {
    if (path.startsWith("plugin.")) {
      const newPath = path.replace("plugin.", "plugin::");
      (strapi?.log?.warn ?? console.warn)(
        `Using dot notation for model config namespaces is deprecated, for example "plugin::myplugin" should be used instead of "plugin.myplugin". Modifying requested path ${path} to ${newPath}`
      );
      return newPath;
    }
    return path;
  };
  const transformDeprecatedPaths = (path) => {
    if (_.isString(path)) {
      return transformPathString(path);
    }
    if (_.isArray(path)) {
      if (path.some((part) => !(_.isString(part) || _.isNumber(part)))) {
        return path;
      }
      return transformPathString(path.join("."));
    }
    return path;
  };
  return {
    ...state.config,
    // TODO: to remove
    get(path, defaultValue) {
      return _.get(state.config, transformDeprecatedPaths(path), defaultValue);
    },
    set(path, val) {
      _.set(state.config, transformDeprecatedPaths(path), val);
      return this;
    },
    has(path) {
      return _.has(state.config, transformDeprecatedPaths(path));
    }
  };
};
exports.createConfigProvider = createConfigProvider;
//# sourceMappingURL=config.js.map
