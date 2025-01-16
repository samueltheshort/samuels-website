"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const tsUtils = require("@strapi/typescript-utils");
const core = require("@strapi/core");
const helpers = require("../../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const tsUtils__default = /* @__PURE__ */ _interopDefault(tsUtils);
const action = async ({ debug, silent, verbose, outDir }) => {
  if ((debug || verbose) && silent) {
    console.error("Flags conflict: both silent and debug mode are enabled, exiting...");
    process.exit(1);
  }
  const appContext = await core.compileStrapi({ ignoreDiagnostics: true });
  const app = await core.createStrapi(appContext).register();
  await tsUtils__default.default.generators.generate({
    strapi: app,
    pwd: appContext.appDir,
    rootDir: outDir ?? void 0,
    logger: {
      silent,
      debug
    },
    artifacts: { contentTypes: true, components: true }
  });
  await app.destroy();
};
const command = () => {
  return commander.createCommand("ts:generate-types").description(`Generate TypeScript typings for your schemas`).option("-d, --debug", `Run the generation with debug messages`, false).option("-s, --silent", `Run the generation silently, without any output`, false).option(
    "-o, --out-dir <outDir>",
    "Specify a relative root directory in which the definitions will be generated. Changing this value might break types exposed by Strapi that relies on generated types."
  ).action(helpers.runAction("ts:generate-types", action));
};
exports.action = action;
exports.command = command;
//# sourceMappingURL=generate-types.js.map
