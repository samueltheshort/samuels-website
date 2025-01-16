"use strict";
const path = require("path");
const fs = require("fs");
const loadConfigFile = require("../utils/load-config-file.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const VALID_EXTENSIONS = [".js", ".json"];
const MISTAKEN_FILENAMES = {
  middleware: "middlewares",
  plugin: "plugins"
};
const RESTRICTED_FILENAMES = [
  // existing env vars
  "uuid",
  "hosting",
  "license",
  "enforce",
  "disable",
  "enable",
  "telemetry",
  // reserved for future internal use
  "strapi",
  "internal",
  // root level config options
  // TODO: it would be better to move these out of the root config and allow them to be loaded
  "launchedAt",
  "serveAdminPanel",
  "autoReload",
  "environment",
  "packageJsonStrapi",
  "info",
  "autoReload",
  "dirs",
  // probably mistaken/typo filenames
  ...Object.keys(MISTAKEN_FILENAMES)
];
const STRAPI_CONFIG_FILENAMES = [
  "admin",
  "server",
  "api",
  "database",
  "middlewares",
  "plugins",
  "features"
];
const logWarning = (message) => {
  console.warn(message);
};
const loadConfigDir = (dir) => {
  if (!fs__default.default.existsSync(dir)) return {};
  const allFiles = fs__default.default.readdirSync(dir, { withFileTypes: true });
  const seenFilenames = /* @__PURE__ */ new Set();
  const configFiles = allFiles.reduce((acc, file) => {
    const baseName = path__default.default.basename(file.name, path__default.default.extname(file.name));
    const baseNameLower = baseName.toLowerCase();
    const extension = path__default.default.extname(file.name);
    const extensionLower = extension.toLowerCase();
    if (!file.isFile()) {
      return acc;
    }
    if (!VALID_EXTENSIONS.includes(extensionLower)) {
      logWarning(
        `Config file not loaded, extension must be one of ${VALID_EXTENSIONS.join(",")}): ${file.name}`
      );
      return acc;
    }
    if (RESTRICTED_FILENAMES.includes(baseNameLower)) {
      logWarning(`Config file not loaded, restricted filename: ${file.name}`);
      if (baseNameLower in MISTAKEN_FILENAMES) {
        console.log(
          `Did you mean ${MISTAKEN_FILENAMES[baseNameLower]}]} ?`
        );
      }
      return acc;
    }
    const restrictedPrefix = [...RESTRICTED_FILENAMES, ...STRAPI_CONFIG_FILENAMES].find(
      (restrictedName) => restrictedName.startsWith(baseNameLower) && restrictedName !== baseNameLower
    );
    if (restrictedPrefix) {
      logWarning(
        `Config file not loaded, filename cannot start with ${restrictedPrefix}: ${file.name}`
      );
    }
    if (seenFilenames.has(baseNameLower)) {
      logWarning(
        `Config file not loaded, case-insensitive name matches other config file: ${file.name}`
      );
      return acc;
    }
    seenFilenames.add(baseNameLower);
    acc.push(file);
    return acc;
  }, []);
  return configFiles.reduce(
    (acc, file) => {
      const key = path__default.default.basename(file.name, path__default.default.extname(file.name));
      acc[key] = loadConfigFile.loadConfigFile(path__default.default.resolve(dir, file.name));
      return acc;
    },
    {}
  );
};
module.exports = loadConfigDir;
//# sourceMappingURL=config-loader.js.map
