"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const dotenv = require("dotenv");
const files = require("./files.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const dotenv__default = /* @__PURE__ */ _interopDefault(dotenv);
const loadEnv = async (cwd) => {
  const pathToEnv = path__default.default.resolve(cwd, ".env");
  if (await files.pathExists(pathToEnv)) {
    dotenv__default.default.config({ path: pathToEnv });
  }
};
const getStrapiAdminEnvVars = (defaultEnv) => {
  return Object.keys(process.env).filter((key) => key.toUpperCase().startsWith("STRAPI_ADMIN_")).reduce(
    (acc, key) => {
      acc[key] = process.env[key];
      return acc;
    },
    defaultEnv
  );
};
exports.getStrapiAdminEnvVars = getStrapiAdminEnvVars;
exports.loadEnv = loadEnv;
//# sourceMappingURL=env.js.map
