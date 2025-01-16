"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const command = () => {
  return commander.createCommand("templates:generate <directory>").description("(deprecated) Generate template from Strapi project").action(() => {
    console.warn("This command is deprecated and will be removed in the next major release.");
    console.warn("You can now copy an existing app and use it as a template.");
  });
};
exports.command = command;
//# sourceMappingURL=generate.js.map
