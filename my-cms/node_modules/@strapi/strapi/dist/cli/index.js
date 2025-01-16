"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const index = require("./commands/index.js");
const logger = require("./utils/logger.js");
const tsconfig = require("./utils/tsconfig.js");
const createCLI = async (argv, command = new commander.Command()) => {
  command.storeOptionsAsProperties(false).allowUnknownOption(true);
  command.helpOption("-h, --help", "Display help for command");
  command.addHelpCommand("help [command]", "Display help for command");
  command.version(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("../../package.json").version,
    "-v, --version",
    "Output the version number"
  );
  const cwd = process.cwd();
  const hasDebug = argv.includes("--debug");
  const hasSilent = argv.includes("--silent");
  const logger$1 = logger.createLogger({ debug: hasDebug, silent: hasSilent, timestamp: false });
  const tsconfig$1 = tsconfig.loadTsConfig({
    cwd,
    path: "tsconfig.json",
    logger: logger$1
  });
  const ctx = {
    cwd,
    logger: logger$1,
    tsconfig: tsconfig$1
  };
  for (const commandFactory of index.commands) {
    try {
      const subCommand = await commandFactory({ command, argv, ctx });
      if (subCommand) {
        command.addCommand(subCommand);
      }
    } catch (e) {
      console.error(`Failed to load command`, e);
    }
  }
  const deprecatedCommands = [
    { name: "plugin:init", message: "Please use `npx @strapi/sdk-plugin init` instead." },
    {
      name: "plugin:verify",
      message: "After migrating your plugin to v5, use `strapi-plugin verify`"
    },
    {
      name: "plugin:watch",
      message: "After migrating your plugin to v5, use `strapi-plugin watch`"
    },
    {
      name: "plugin:watch:link",
      message: "After migrating your plugin to v5, use `strapi-plugin watch:link`"
    },
    {
      name: "plugin:build",
      message: "After migrating your plugin to v5, use `strapi-plugin build`"
    }
  ];
  deprecatedCommands.forEach(({ name, message }) => {
    const deprecated = new commander.Command(name).command(name).description("(deprecated)").action(() => {
      console.warn(
        `The command ${name} has been deprecated. See the Strapi 5 migration guide for more information.`
      );
      if (message) {
        console.warn(message);
      }
    });
    command.addCommand(deprecated, { hidden: true });
  });
  return command;
};
const runCLI = async (argv = process.argv, command = new commander.Command()) => {
  const commands = await createCLI(argv, command);
  await commands.parseAsync(argv);
};
exports.createCLI = createCLI;
exports.runCLI = runCLI;
//# sourceMappingURL=index.js.map
