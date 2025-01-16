"use strict";
const path = require("path");
const commander = require("commander");
const inquirer = require("inquirer");
const dataTransfer = require("../../utils/data-transfer.js");
const commander$1 = require("../../utils/commander.js");
const helpers = require("../../utils/helpers.js");
const action = require("./action.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const inquirer__default = /* @__PURE__ */ _interopDefault(inquirer);
const command = () => {
  return commander.createCommand("import").description("Import data from file to Strapi").allowExcessArguments(false).requiredOption(
    "-f, --file <file>",
    "path and filename for the Strapi export file you want to import"
  ).addOption(
    new commander.Option(
      "-k, --key <string>",
      "Provide encryption key in command instead of using the prompt"
    )
  ).addOption(new commander.Option("--verbose", "Enable verbose logs")).addOption(commander$1.forceOption).addOption(dataTransfer.excludeOption).addOption(dataTransfer.onlyOption).addOption(dataTransfer.throttleOption).hook("preAction", dataTransfer.validateExcludeOnly).hook("preAction", async (thisCommand) => {
    const opts = thisCommand.opts();
    const ext = path__default.default.extname(String(opts.file));
    if (ext === ".enc") {
      if (!opts.key) {
        const answers = await inquirer__default.default.prompt([
          {
            type: "password",
            message: "Please enter your decryption key",
            name: "key"
          }
        ]);
        if (!answers.key?.length) {
          helpers.exitWith(1, "No key entered, aborting import.");
        }
        opts.key = answers.key;
      }
    }
  }).hook("preAction", (thisCommand) => {
    const opts = thisCommand.opts();
    const { extname, parse } = path__default.default;
    let file = opts.file;
    if (extname(file) === ".enc") {
      file = parse(file).name;
      thisCommand.opts().decrypt = true;
    } else {
      thisCommand.opts().decrypt = false;
    }
    if (extname(file) === ".gz") {
      file = parse(file).name;
      thisCommand.opts().decompress = true;
    } else {
      thisCommand.opts().decompress = false;
    }
    if (extname(file) !== ".tar") {
      helpers.exitWith(
        1,
        `The file '${opts.file}' does not appear to be a valid Strapi data file. It must have an extension ending in .tar[.gz][.enc]`
      );
    }
  }).hook(
    "preAction",
    commander$1.getCommanderConfirmMessage(
      "The import will delete your existing data! Are you sure you want to proceed?",
      { failMessage: "Import process aborted" }
    )
  ).action(action);
};
module.exports = command;
//# sourceMappingURL=command.js.map
