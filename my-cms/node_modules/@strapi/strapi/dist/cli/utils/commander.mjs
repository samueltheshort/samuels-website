import inquirer from "inquirer";
import { Option, InvalidOptionArgumentError } from "commander";
import chalk from "chalk";
import { isNaN } from "lodash/fp";
import { exitWith } from "./helpers.mjs";
const parseList = (value) => {
  try {
    return value.split(",").map((item) => item.trim());
  } catch (e) {
    exitWith(1, `Unrecognized input: ${value}`);
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
      exitWith(1, `${errorMessage}: ${invalid.join(",")}`);
    }
    return list;
  };
};
const parseInteger = (value) => {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new InvalidOptionArgumentError(`Not an integer: ${value}`);
  }
  return parsedValue;
};
const parseURL = (value) => {
  try {
    const url = new URL(value);
    if (!url.host) {
      throw new InvalidOptionArgumentError(`Could not parse url ${value}`);
    }
    return url;
  } catch (e) {
    throw new InvalidOptionArgumentError(`Could not parse url ${value}`);
  }
};
const promptEncryptionKey = async (thisCommand) => {
  const opts = thisCommand.opts();
  if (!opts.encrypt && opts.key) {
    return exitWith(1, "Key may not be present unless encryption is used");
  }
  if (opts.encrypt && !(opts.key && opts.key.length > 0)) {
    try {
      const answers = await inquirer.prompt([
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
      return exitWith(1, "Failed to get encryption key");
    }
    if (!opts.key) {
      return exitWith(1, "Failed to get encryption key");
    }
  }
};
const getCommanderConfirmMessage = (message, { failMessage } = {}) => {
  return async (command) => {
    const confirmed = await confirmMessage(message, { force: command.opts().force });
    if (!confirmed) {
      exitWith(1, failMessage);
    }
  };
};
const confirmMessage = async (message, { force } = {}) => {
  if (force === true) {
    console.log(`${chalk.green("?")} ${chalk.bold(message)} ${chalk.cyan("Yes")}`);
    return true;
  }
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      message,
      name: `confirm`,
      default: false
    }
  ]);
  return answers.confirm;
};
const forceOption = new Option(
  "--force",
  `Automatically answer "yes" to all prompts, including potentially destructive requests, and run non-interactively.`
);
export {
  confirmMessage,
  forceOption,
  getCommanderConfirmMessage,
  getParseListWithChoices,
  parseInteger,
  parseList,
  parseURL,
  promptEncryptionKey
};
//# sourceMappingURL=commander.mjs.map
