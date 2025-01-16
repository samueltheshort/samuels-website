"use strict";
const fp = require("lodash/fp");
const chalk = require("chalk");
const dataTransfer$1 = require("@strapi/data-transfer");
const dataTransfer = require("../../utils/data-transfer.js");
const helpers = require("../../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const {
  providers: { createLocalFileSourceProvider }
} = dataTransfer$1.file;
const {
  providers: { createLocalStrapiDestinationProvider, DEFAULT_CONFLICT_STRATEGY }
} = dataTransfer$1.strapi;
const { createTransferEngine, DEFAULT_VERSION_STRATEGY, DEFAULT_SCHEMA_STRATEGY } = dataTransfer$1.engine;
const action = async (opts) => {
  if (!fp.isObject(opts)) {
    helpers.exitWith(1, "Could not parse arguments");
  }
  const sourceOptions = getLocalFileSourceOptions(opts);
  const source = createLocalFileSourceProvider(sourceOptions);
  const strapiInstance = await dataTransfer.createStrapiInstance();
  const engineOptions = {
    versionStrategy: DEFAULT_VERSION_STRATEGY,
    schemaStrategy: DEFAULT_SCHEMA_STRATEGY,
    exclude: opts.exclude,
    only: opts.only,
    throttle: opts.throttle,
    transforms: {
      links: [
        {
          filter(link) {
            return !dataTransfer.DEFAULT_IGNORED_CONTENT_TYPES.includes(link.left.type) && !dataTransfer.DEFAULT_IGNORED_CONTENT_TYPES.includes(link.right.type);
          }
        }
      ],
      entities: [
        {
          filter: (entity) => !dataTransfer.DEFAULT_IGNORED_CONTENT_TYPES.includes(entity.type)
        }
      ]
    }
  };
  const destinationOptions = {
    async getStrapi() {
      return strapiInstance;
    },
    autoDestroy: false,
    strategy: opts.conflictStrategy || DEFAULT_CONFLICT_STRATEGY,
    restore: dataTransfer.parseRestoreFromOptions(engineOptions)
  };
  const destination = createLocalStrapiDestinationProvider(destinationOptions);
  destination.onWarning = (message) => console.warn(`
${chalk__default.default.yellow("warn")}: ${message}`);
  const engine = createTransferEngine(source, destination, engineOptions);
  engine.diagnostics.onDiagnostic(dataTransfer.formatDiagnostic("import", opts.verbose));
  const progress = engine.progress.stream;
  const { updateLoader } = dataTransfer.loadersFactory();
  engine.onSchemaDiff(dataTransfer.getDiffHandler(engine, { force: opts.force, action: "import" }));
  progress.on(`stage::start`, ({ stage, data }) => {
    updateLoader(stage, data).start();
  });
  progress.on("stage::finish", ({ stage, data }) => {
    updateLoader(stage, data).succeed();
  });
  progress.on("stage::progress", ({ stage, data }) => {
    updateLoader(stage, data);
  });
  progress.on("transfer::start", async () => {
    console.log("Starting import...");
    await strapiInstance.telemetry.send(
      "didDEITSProcessStart",
      dataTransfer.getTransferTelemetryPayload(engine)
    );
  });
  let results;
  try {
    dataTransfer.setSignalHandler(() => dataTransfer.abortTransfer({ engine, strapi }));
    results = await engine.transfer();
    try {
      const table = dataTransfer.buildTransferTable(results.engine);
      console.log(table?.toString());
    } catch (e) {
      console.error("There was an error displaying the results of the transfer.");
    }
    await strapiInstance.telemetry.send(
      "didDEITSProcessFinish",
      dataTransfer.getTransferTelemetryPayload(engine)
    );
    await strapiInstance.destroy();
    helpers.exitWith(0, dataTransfer.exitMessageText("import"));
  } catch (e) {
    await strapiInstance.telemetry.send("didDEITSProcessFail", dataTransfer.getTransferTelemetryPayload(engine));
    helpers.exitWith(1, dataTransfer.exitMessageText("import", true));
  }
};
const getLocalFileSourceOptions = (opts) => {
  const options = {
    file: { path: opts.file ?? "" },
    compression: { enabled: !!opts.decompress },
    encryption: { enabled: !!opts.decrypt, key: opts.key }
  };
  return options;
};
module.exports = action;
//# sourceMappingURL=action.js.map
