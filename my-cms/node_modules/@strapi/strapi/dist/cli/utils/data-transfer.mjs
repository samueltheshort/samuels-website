import chalk from "chalk";
import CLITable from "cli-table3";
import { Option } from "commander";
import { createLogger, configs, formats } from "@strapi/logger";
import { compileStrapi, createStrapi } from "@strapi/core";
import ora from "ora";
import { merge } from "lodash/fp";
import { engine } from "@strapi/data-transfer";
import { readableBytes, exitWith } from "./helpers.mjs";
import { parseInteger, getParseListWithChoices, confirmMessage } from "./commander.mjs";
const {
  errors: { TransferEngineInitializationError }
} = engine;
const exitMessageText = (process2, error = false) => {
  const processCapitalized = process2[0].toUpperCase() + process2.slice(1);
  if (!error) {
    return chalk.bold(
      chalk.green(`${processCapitalized} process has been completed successfully!`)
    );
  }
  return chalk.bold(chalk.red(`${processCapitalized} process failed.`));
};
const pad = (n) => {
  return (n < 10 ? "0" : "") + String(n);
};
const yyyymmddHHMMSS = () => {
  const date = /* @__PURE__ */ new Date();
  return date.getFullYear() + pad(date.getMonth() + 1) + pad(date.getDate()) + pad(date.getHours()) + pad(date.getMinutes()) + pad(date.getSeconds());
};
const getDefaultExportName = () => {
  return `export_${yyyymmddHHMMSS()}`;
};
const buildTransferTable = (resultData) => {
  if (!resultData) {
    return;
  }
  const table = new CLITable({
    head: ["Type", "Count", "Size"].map((text) => chalk.bold.blue(text))
  });
  let totalBytes = 0;
  let totalItems = 0;
  Object.keys(resultData).forEach((stage) => {
    const item = resultData[stage];
    if (!item) {
      return;
    }
    table.push([
      { hAlign: "left", content: chalk.bold(stage) },
      { hAlign: "right", content: item.count },
      { hAlign: "right", content: `${readableBytes(item.bytes, 1, 11)} ` }
    ]);
    totalBytes += item.bytes;
    totalItems += item.count;
    if (item.aggregates) {
      Object.keys(item.aggregates).sort().forEach((subkey) => {
        if (!item.aggregates) {
          return;
        }
        const subitem = item.aggregates[subkey];
        table.push([
          { hAlign: "left", content: `-- ${chalk.bold.grey(subkey)}` },
          { hAlign: "right", content: chalk.grey(subitem.count) },
          { hAlign: "right", content: chalk.grey(`(${readableBytes(subitem.bytes, 1, 11)})`) }
        ]);
      });
    }
  });
  table.push([
    { hAlign: "left", content: chalk.bold.green("Total") },
    { hAlign: "right", content: chalk.bold.green(totalItems) },
    { hAlign: "right", content: `${chalk.bold.green(readableBytes(totalBytes, 1, 11))} ` }
  ]);
  return table;
};
const DEFAULT_IGNORED_CONTENT_TYPES = [
  "admin::permission",
  "admin::user",
  "admin::role",
  "admin::api-token",
  "admin::api-token-permission",
  "admin::transfer-token",
  "admin::transfer-token-permission",
  "admin::audit-log",
  "plugin::content-releases.release",
  "plugin::content-releases.release-action"
];
const abortTransfer = async ({
  engine: engine2,
  strapi: strapi2
}) => {
  try {
    await engine2.abortTransfer();
    await strapi2.destroy();
  } catch (e) {
    return false;
  }
  return true;
};
const setSignalHandler = async (handler, signals = ["SIGINT", "SIGTERM", "SIGQUIT"]) => {
  signals.forEach((signal) => {
    process.removeAllListeners(signal);
    process.on(signal, handler);
  });
};
const createStrapiInstance = async (opts = {}) => {
  try {
    const appContext = await compileStrapi();
    const app = createStrapi({ ...opts, ...appContext });
    app.log.level = opts.logLevel || "error";
    return await app.load();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ECONNREFUSED") {
      throw new Error("Process failed. Check the database connection with your Strapi project.");
    }
    throw error;
  }
};
const transferDataTypes = Object.keys(engine.TransferGroupPresets);
const throttleOption = new Option(
  "--throttle <delay after each entity>",
  `Add a delay in milliseconds between each transferred entity`
).argParser(parseInteger).hideHelp();
const excludeOption = new Option(
  "--exclude <comma-separated data types>",
  `Exclude data using comma-separated types. Available types: ${transferDataTypes.join(",")}`
).argParser(getParseListWithChoices(transferDataTypes, 'Invalid options for "exclude"'));
const onlyOption = new Option(
  "--only <command-separated data types>",
  `Include only these types of data (plus schemas). Available types: ${transferDataTypes.join(",")}`
).argParser(getParseListWithChoices(transferDataTypes, 'Invalid options for "only"'));
const validateExcludeOnly = (command) => {
  const { exclude, only } = command.opts();
  if (!only || !exclude) {
    return;
  }
  const choicesInBoth = only.filter((n) => {
    return exclude.indexOf(n) !== -1;
  });
  if (choicesInBoth.length > 0) {
    exitWith(
      1,
      `Data types may not be used in both "exclude" and "only" in the same command. Found in both: ${choicesInBoth.join(
        ","
      )}`
    );
  }
};
const errorColors = {
  fatal: chalk.red,
  error: chalk.red,
  silly: chalk.yellow
};
const formatDiagnostic = (operation, info) => {
  let logger;
  const getLogger = () => {
    if (!logger) {
      logger = createLogger(
        configs.createOutputFileConfiguration(`${operation}_${Date.now()}.log`, {
          level: "info",
          format: formats?.detailedLogs
        })
      );
    }
    return logger;
  };
  return ({ details, kind }) => {
    try {
      if (kind === "error") {
        const { message, severity = "fatal" } = details;
        const colorizeError = errorColors[severity];
        const errorMessage = colorizeError(`[${severity.toUpperCase()}] ${message}`);
        getLogger().error(errorMessage);
      }
      if (kind === "info" && info) {
        const { message, params, origin } = details;
        const msg = `[${origin ?? "transfer"}] ${message}
${params ? JSON.stringify(params, null, 2) : ""}`;
        getLogger().info(msg);
      }
      if (kind === "warning") {
        const { origin, message } = details;
        getLogger().warn(`(${origin ?? "transfer"}) ${message}`);
      }
    } catch (err) {
      getLogger().error(err);
    }
  };
};
const loadersFactory = (defaultLoaders = {}) => {
  const loaders = defaultLoaders;
  const updateLoader = (stage, data) => {
    if (!(stage in loaders)) {
      createLoader(stage);
    }
    const stageData = data[stage];
    const elapsedTime = stageData?.startTime ? (stageData?.endTime || Date.now()) - stageData.startTime : 0;
    const size = `size: ${readableBytes(stageData?.bytes ?? 0)}`;
    const elapsed = `elapsed: ${elapsedTime} ms`;
    const speed = elapsedTime > 0 ? `(${readableBytes((stageData?.bytes ?? 0) * 1e3 / elapsedTime)}/s)` : "";
    loaders[stage].text = `${stage}: ${stageData?.count ?? 0} transfered (${size}) (${elapsed}) ${!stageData?.endTime ? speed : ""}`;
    return loaders[stage];
  };
  const createLoader = (stage) => {
    Object.assign(loaders, { [stage]: ora() });
    return loaders[stage];
  };
  const getLoader = (stage) => {
    return loaders[stage];
  };
  return {
    updateLoader,
    createLoader,
    getLoader
  };
};
const getTransferTelemetryPayload = (engine2) => {
  return {
    eventProperties: {
      source: engine2?.sourceProvider?.name,
      destination: engine2?.destinationProvider?.name
    }
  };
};
const getDiffHandler = (engine2, {
  force,
  action
}) => {
  return async (context, next) => {
    setSignalHandler(async () => {
      await abortTransfer({ engine: engine2, strapi });
      exitWith(1, exitMessageText(action, true));
    });
    let workflowsStatus;
    const source = "Schema Integrity";
    Object.entries(context.diffs).forEach(([uid, diffs]) => {
      for (const diff of diffs) {
        const path = [uid].concat(diff.path).join(".");
        const endPath = diff.path[diff.path.length - 1];
        if (uid === "plugin::review-workflows.workflow" || uid === "plugin::review-workflows.workflow-stage" || endPath?.startsWith("strapi_stage") || endPath?.startsWith("strapi_assignee")) {
          workflowsStatus = diff.kind;
        } else if (diff.kind === "added") {
          engine2.reportWarning(chalk.red(`${chalk.bold(path)} does not exist on source`), source);
        } else if (diff.kind === "deleted") {
          engine2.reportWarning(
            chalk.red(`${chalk.bold(path)} does not exist on destination`),
            source
          );
        } else if (diff.kind === "modified") {
          engine2.reportWarning(chalk.red(`${chalk.bold(path)} has a different data type`), source);
        }
      }
    });
    if (workflowsStatus === "added") {
      engine2.reportWarning(chalk.red(`Review workflows feature does not exist on source`), source);
    } else if (workflowsStatus === "deleted") {
      engine2.reportWarning(
        chalk.red(`Review workflows feature does not exist on destination`),
        source
      );
    } else if (workflowsStatus === "modified") {
      engine2.panic(
        new TransferEngineInitializationError("Unresolved differences in schema [review workflows]")
      );
    }
    const confirmed = await confirmMessage(
      "There are differences in schema between the source and destination, and the data listed above will be lost. Are you sure you want to continue?",
      {
        force
      }
    );
    setSignalHandler(() => abortTransfer({ engine: engine2, strapi }));
    if (confirmed) {
      context.ignoredDiffs = merge(context.diffs, context.ignoredDiffs);
    }
    return next(context);
  };
};
const getAssetsBackupHandler = (engine2, {
  force,
  action
}) => {
  return async (context, next) => {
    setSignalHandler(async () => {
      await abortTransfer({ engine: engine2, strapi });
      exitWith(1, exitMessageText(action, true));
    });
    console.warn(
      "The backup for the assets could not be created inside the public directory. Ensure Strapi has write permissions on the public directory."
    );
    const confirmed = await confirmMessage(
      "Do you want to continue without backing up your public/uploads files?",
      {
        force
      }
    );
    if (confirmed) {
      context.ignore = true;
    }
    setSignalHandler(() => abortTransfer({ engine: engine2, strapi }));
    return next(context);
  };
};
const shouldSkipStage = (opts, dataKind) => {
  if (opts.exclude?.includes(dataKind)) {
    return true;
  }
  if (opts.only) {
    return !opts.only.includes(dataKind);
  }
  return false;
};
const parseRestoreFromOptions = (opts) => {
  const entitiesOptions = {
    exclude: DEFAULT_IGNORED_CONTENT_TYPES,
    include: void 0
  };
  if (opts.only && !opts.only.includes("content") || opts.exclude?.includes("content")) {
    entitiesOptions.include = [];
  }
  const restoreConfig = {
    entities: entitiesOptions,
    assets: !shouldSkipStage(opts, "files"),
    configuration: {
      webhook: !shouldSkipStage(opts, "config"),
      coreStore: !shouldSkipStage(opts, "config")
    }
  };
  return restoreConfig;
};
export {
  DEFAULT_IGNORED_CONTENT_TYPES,
  abortTransfer,
  buildTransferTable,
  createStrapiInstance,
  excludeOption,
  exitMessageText,
  formatDiagnostic,
  getAssetsBackupHandler,
  getDefaultExportName,
  getDiffHandler,
  getTransferTelemetryPayload,
  loadersFactory,
  onlyOption,
  parseRestoreFromOptions,
  setSignalHandler,
  shouldSkipStage,
  throttleOption,
  validateExcludeOnly
};
//# sourceMappingURL=data-transfer.mjs.map
