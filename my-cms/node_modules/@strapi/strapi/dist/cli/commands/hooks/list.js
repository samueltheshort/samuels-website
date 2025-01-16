"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const CLITable = require("cli-table3");
const chalk = require("chalk");
const core = require("@strapi/core");
const helpers = require("../../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const CLITable__default = /* @__PURE__ */ _interopDefault(CLITable);
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const action = async () => {
  const appContext = await core.compileStrapi();
  const app = await core.createStrapi(appContext).register();
  const list = app.get("hooks").keys();
  const infoTable = new CLITable__default.default({
    head: [chalk__default.default.blue("Name")]
  });
  list.forEach((name) => infoTable.push([name]));
  console.log(infoTable.toString());
  await app.destroy();
};
const command = () => {
  return commander.createCommand("hooks:list").description("List all the application hooks").action(helpers.runAction("hooks:list", action));
};
exports.action = action;
exports.command = command;
//# sourceMappingURL=list.js.map
