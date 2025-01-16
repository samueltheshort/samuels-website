"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const Strapi = require("./Strapi.js");
require("open");
require("lodash/fp");
require("path");
require("./ee/license.js");
const index = require("./utils/update-notifier/index.js");
require("undici");
require("chalk");
require("cli-table3");
require("@paralleldrive/cuid2");
require("node:assert");
const signals = require("./utils/signals.js");
const resolveWorkingDirs = require("./utils/resolve-working-dirs.js");
const compile = require("./compile.js");
const factories = require("./factories.js");
const createStrapi = (options = {}) => {
  const strapi = new Strapi({
    ...options,
    ...resolveWorkingDirs.resolveWorkingDirectories(options)
  });
  signals.destroyOnSignal(strapi);
  index.createUpdateNotifier(strapi);
  global.strapi = strapi;
  return strapi;
};
exports.compileStrapi = compile;
exports.factories = factories;
exports.createStrapi = createStrapi;
//# sourceMappingURL=index.js.map
