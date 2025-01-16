"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const inquirer = require("inquirer");
const commander = require("commander");
const chalk = require("chalk");
const fp = require("lodash/fp");
const helpers = require("./helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const inquirer__default = /* @__PURE__ */ _interopDefault(inquirer);
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const parseList = (value) => {
  try {
    return value.split(",").map((item) => item.trim());
  } catch (e) {
    helpers.exitWith(1, `Unrecognized input: ${value}`);
  }
  return [];
};
const getParseListWithChoices = (choices, errorMessage = "Invalid options:") => {
  return (value) => {
    const list = parseList(value);
    const invalid = list.filter((item) => {
      return !choices.includes(item);
    });
    if (invalid.length > 0) {
      helpers.exitWith(1, `${errorMessage}: ${invalid.join(",")}`);
    }
    return list;
  };
};
const parseInteger = (value) => {
  const parsedValue = parseInt(value, 10);
  if (fp.isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError(`Not an integer: ${value}`);
  }
  return parsedValue;
};
const parseURL = (value) => {
  try {
    const url = new URL(value);
    if (!url.host) {
      throw new commander.InvalidOptionArgumentError(`Could not parse url ${value}`);
    }
    return url;
  } catch (e) {
    throw new commander.InvalidOptionArgumentError(`Could not parse url ${value}`);
  }
};
const promptEncryptionKey = async (thisCommand) => {
  const opts = thisCommand.opts();
  if (!opts.encrypt && opts.key) {
    return helpers.exitWith(1, "Key may not be present unless encryption is used");
  }
  if (opts.encrypt && !(opts.key && opts.key.length > 0)) {
    try {
      const answers = await inquirer__default.default.prompt([
        {
          type: "password",
          message: "Please enter an encryption key",
          name: "key",
          validate(key) {
            if (key.length > 0) return true;
            return "Key must be present when using the encrypt option";
          }
        }
      ]);
      opts.key = answers.key;
    } catch (e) {
      return helpers.exitWith(1, "Failed to get encryption key");
    }
    if (!opts.key) {
      return helpers.exitWith(1, "Failed to get encryption key");
    }
  }
};
const getCommanderConfirmMessage = (message, { failMessage } = {}) => {
  return async (command) => {
    const confirmed = await confirmMessage(message, { force: command.opts().force });
    if (!confirmed) {
      helpers.exitWith(1, failMessage);
    }
  };
};
const confirmMessage = async (message, { force } = {}) => {
  if (force === true) {
    console.log(`${chalk__default.default.green("?")} ${chalk__default.default.bold(message)} ${chalk__default.default.cyan("Yes")}`);
    return true;
  }
  const answers = await inquirer__default.default.prompt([
    {
      type: "confirm",
      message,
      name: `confirm`,
      default: false
    }
  ]);
  return answers.confirm;
};
const forceOption = new commander.Option(
  "--force",
  `Automatically answer "yes" to all prompts, including potentially destructive requests, and run non-interactively.`
);
exports.confirmMessage = confirmMessage;
exports.forceOption = forceOption;
exports.getCommanderConfirmMessage = getCommanderConfirmMessage;
exports.getParseListWithChoices = getParseListWithChoices;
exports.parseInteger = parseInteger;
exports.parseList = parseList;
exports.parseURL = parseURL;
exports.promptEncryptionKey = promptEncryptionKey;
//# sourceMappingURL=commander.js.map
