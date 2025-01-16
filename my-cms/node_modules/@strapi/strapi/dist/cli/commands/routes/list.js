"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const CLITable = require("cli-table3");
const chalk = require("chalk");
const fp = require("lodash/fp");
const core = require("@strapi/core");
const helpers = require("../../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const CLITable__default = /* @__PURE__ */ _interopDefault(CLITable);
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const action = async () => {
  const appContext = await core.compileStrapi();
  const app = await core.createStrapi(appContext).load();
  const list = app.server.mount().listRoutes();
  const infoTable = new CLITable__default.default({
    head: [chalk__default.default.blue("Method"), chalk__default.default.blue("Path")],
    colWidths: [20]
  });
  list.filter((route) => route.methods.length).forEach((route) => {
    infoTable.push([route.methods.map(fp.toUpper).join("|"), route.path]);
  });
  console.log(infoTable.toString());
  await app.destroy();
};
const command = () => {
  return commander.createCommand("routes:list").description("List all the application routes").action(helpers.runAction("routes:list", action));
};
exports.action = action;
exports.command = command;
//# sourceMappingURL=list.js.map
