"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const REPL = require("repl");
const commander = require("commander");
const core = require("@strapi/core");
const helpers = require("../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const REPL__default = /* @__PURE__ */ _interopDefault(REPL);
const action = async () => {
  const appContext = await core.compileStrapi();
  const app = await core.createStrapi(appContext).load();
  app.start().then(() => {
    const repl = REPL__default.default.start(app.config.info.name + " > " || "strapi > ");
    repl.on("exit", (err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.server.destroy();
      process.exit(0);
    });
  });
};
const command = () => {
  return commander.createCommand("console").description("Open the Strapi framework console").action(helpers.runAction("console", action));
};
exports.action = action;
exports.command = command;
//# sourceMappingURL=console.js.map
