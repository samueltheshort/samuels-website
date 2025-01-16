"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const chalk = require("chalk");
const CLITable = require("cli-table3");
const fp = require("lodash/fp");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const CLITable__default = /* @__PURE__ */ _interopDefault(CLITable);
const fp__default = /* @__PURE__ */ _interopDefault(fp);
const createStartupLogger = (app) => {
  return {
    logStats() {
      const columns = Math.min(process.stderr.columns, 80) - 2;
      console.log();
      console.log(chalk__default.default.black.bgWhite(fp__default.default.padEnd(columns, " Project information")));
      console.log();
      const infoTable = new CLITable__default.default({
        colWidths: [20, 50],
        chars: { mid: "", "left-mid": "", "mid-mid": "", "right-mid": "" }
      });
      const dbInfo = app.db?.getInfo();
      infoTable.push(
        [chalk__default.default.blue("Time"), `${/* @__PURE__ */ new Date()}`],
        [chalk__default.default.blue("Launched in"), `${Date.now() - app.config.launchedAt} ms`],
        [chalk__default.default.blue("Environment"), app.config.environment],
        [chalk__default.default.blue("Process PID"), process.pid],
        [chalk__default.default.blue("Version"), `${app.config.info.strapi} (node ${process.version})`],
        [chalk__default.default.blue("Edition"), app.EE ? "Enterprise" : "Community"],
        [chalk__default.default.blue("Database"), dbInfo?.client],
        [chalk__default.default.blue("Database name"), dbInfo?.displayName]
      );
      if (dbInfo?.schema) {
        infoTable.push([chalk__default.default.blue("Database schema"), dbInfo.schema]);
      }
      console.log(infoTable.toString());
      console.log();
      console.log(chalk__default.default.black.bgWhite(fp__default.default.padEnd(columns, " Actions available")));
      console.log();
    },
    logFirstStartupMessage() {
      if (!strapi.config.get("server.logger.startup.enabled")) {
        return;
      }
      this.logStats();
      console.log(chalk__default.default.bold("One more thing..."));
      console.log(
        chalk__default.default.grey("Create your first administrator 💻 by going to the administration panel at:")
      );
      console.log();
      const addressTable = new CLITable__default.default();
      const adminUrl = strapi.config.get("admin.absoluteUrl");
      addressTable.push([chalk__default.default.bold(adminUrl)]);
      console.log(`${addressTable.toString()}`);
      console.log();
    },
    logDefaultStartupMessage() {
      if (!strapi.config.get("server.logger.startup.enabled")) {
        return;
      }
      this.logStats();
      console.log(chalk__default.default.bold("Welcome back!"));
      if (app.config.get("admin.serveAdminPanel") === true) {
        console.log(chalk__default.default.grey("To manage your project 🚀, go to the administration panel at:"));
        const adminUrl = strapi.config.get("admin.absoluteUrl");
        console.log(chalk__default.default.bold(adminUrl));
        console.log();
      }
      console.log(chalk__default.default.grey("To access the server ⚡️, go to:"));
      const serverUrl = strapi.config.get("server.absoluteUrl");
      console.log(chalk__default.default.bold(serverUrl));
      console.log();
    },
    logStartupMessage({ isInitialized }) {
      if (!strapi.config.get("server.logger.startup.enabled")) {
        return;
      }
      if (!isInitialized) {
        this.logFirstStartupMessage();
      } else {
        this.logDefaultStartupMessage();
      }
    }
  };
};
exports.createStartupLogger = createStartupLogger;
//# sourceMappingURL=startup-logger.js.map
