"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const command = () => {
  return commander.createCommand("version").description("Output the version of Strapi").action(() => {
    const { version } = require("../../../package.json");
    process.stdout.write(`${version}
`);
    process.exit(0);
  });
};
exports.command = command;
//# sourceMappingURL=version.js.map
