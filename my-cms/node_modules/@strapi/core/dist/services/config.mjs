import { get, set, has, isString, isArray, isNumber } from "lodash";
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
    if (isString(path)) {
      return transformPathString(path);
    }
    if (isArray(path)) {
      if (path.some((part) => !(isString(part) || isNumber(part)))) {
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
      return get(state.config, transformDeprecatedPaths(path), defaultValue);
    },
    set(path, val) {
      set(state.config, transformDeprecatedPaths(path), val);
      return this;
    },
    has(path) {
      return has(state.config, transformDeprecatedPaths(path));
    }
  };
};
export {
  createConfigProvider
};
//# sourceMappingURL=config.mjs.map
