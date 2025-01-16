"use strict";
const inquirer = require("inquirer");
const commander = require("commander");
const commander$1 = require("../../utils/commander.js");
const helpers = require("../../utils/helpers.js");
const dataTransfer = require("../../utils/data-transfer.js");
const action = require("./action.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const inquirer__default = /* @__PURE__ */ _interopDefault(inquirer);
const command = () => {
  return commander.createCommand("transfer").description("Transfer data from one source to another").allowExcessArguments(false).addOption(
    new commander.Option(
      "--from <sourceURL>",
      `URL of the remote Strapi instance to get data from`
    ).argParser(commander$1.parseURL)
  ).addOption(new commander.Option("--from-token <token>", `Transfer token for the remote Strapi source`)).addOption(
    new commander.Option(
      "--to <destinationURL>",
      `URL of the remote Strapi instance to send data to`
    ).argParser(commander$1.parseURL)
  ).addOption(
    new commander.Option("--to-token <token>", `Transfer token for the remote Strapi destination`)
  ).addOption(new commander.Option("--verbose", "Enable verbose logs")).addOption(commander$1.forceOption).addOption(dataTransfer.excludeOption).addOption(dataTransfer.onlyOption).addOption(dataTransfer.throttleOption).hook("preAction", dataTransfer.validateExcludeOnly).hook(
    "preAction",
    helpers.ifOptions(
      (opts) => !(opts.from || opts.to) || opts.from && opts.to,
      async () => helpers.exitWith(
        1,
        "Exactly one remote source (from) or destination (to) option must be provided"
      )
    )
  ).hook(
    "preAction",
    helpers.ifOptions(
      (opts) => opts.from,
      async (thisCommand) => {
        helpers.assertUrlHasProtocol(thisCommand.opts().from, ["https:", "http:"]);
        if (!thisCommand.opts().fromToken) {
          const answers = await inquirer__default.default.prompt([
            {
              type: "password",
              message: "Please enter your transfer token for the remote Strapi source",
              name: "fromToken"
            }
          ]);
          if (!answers.fromToken?.length) {
            helpers.exitWith(1, "No token provided for remote source, aborting transfer.");
          }
          thisCommand.opts().fromToken = answers.fromToken;
        }
        await commander$1.getCommanderConfirmMessage(
          "The transfer will delete all the local Strapi assets and its database. Are you sure you want to proceed?",
          { failMessage: "Transfer process aborted" }
        )(thisCommand);
      }
    )
  ).hook(
    "preAction",
    helpers.ifOptions(
      (opts) => opts.to,
      async (thisCommand) => {
        helpers.assertUrlHasProtocol(thisCommand.opts().to, ["https:", "http:"]);
        if (!thisCommand.opts().toToken) {
          const answers = await inquirer__default.default.prompt([
            {
              type: "password",
              message: "Please enter your transfer token for the remote Strapi destination",
              name: "toToken"
            }
          ]);
          if (!answers.toToken?.length) {
            helpers.exitWith(1, "No token provided for remote destination, aborting transfer.");
          }
          thisCommand.opts().toToken = answers.toToken;
        }
        await commander$1.getCommanderConfirmMessage(
          "The transfer will delete existing data from the remote Strapi! Are you sure you want to proceed?",
          { failMessage: "Transfer process aborted" }
        )(thisCommand);
      }
    )
  ).action(action);
};
module.exports = command;
//# sourceMappingURL=command.js.map
