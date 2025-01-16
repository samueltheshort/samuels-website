"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const cloudCli = require("@strapi/cloud-cli");
const createUser = require("./admin/create-user.js");
const resetUserPassword = require("./admin/reset-user-password.js");
const list = require("./components/list.js");
const dump = require("./configuration/dump.js");
const restore = require("./configuration/restore.js");
const list$1 = require("./content-types/list.js");
const list$2 = require("./controllers/list.js");
const list$3 = require("./hooks/list.js");
const list$4 = require("./middlewares/list.js");
const list$5 = require("./policies/list.js");
const list$6 = require("./routes/list.js");
const list$7 = require("./services/list.js");
const disable = require("./telemetry/disable.js");
const enable = require("./telemetry/enable.js");
const generate$1 = require("./templates/generate.js");
const generateTypes = require("./ts/generate-types.js");
const build = require("./build.js");
const console = require("./console.js");
const develop = require("./develop.js");
const generate = require("./generate.js");
const report = require("./report.js");
const start = require("./start.js");
const version = require("./version.js");
const command = require("./export/command.js");
const command$1 = require("./import/command.js");
const command$2 = require("./transfer/command.js");
const commands = [
  createUser.command,
  resetUserPassword.command,
  list.command,
  dump.command,
  restore.command,
  console.command,
  list$1.command,
  list$2.command,
  generate.command,
  list$3.command,
  list$4.command,
  list$5.command,
  report.command,
  list$6.command,
  list$7.command,
  start.command,
  disable.command,
  enable.command,
  generate$1.command,
  generateTypes.command,
  version.command,
  build.command,
  develop.command,
  command,
  command$1,
  command$2,
  /**
   * Cloud
   */
  cloudCli.buildStrapiCloudCommands
];
exports.commands = commands;
//# sourceMappingURL=index.js.map
