import { isObject } from "lodash/fp";
import chalk from "chalk";
import { file, strapi as strapi$1, engine } from "@strapi/data-transfer";
import { createStrapiInstance, DEFAULT_IGNORED_CONTENT_TYPES, parseRestoreFromOptions, formatDiagnostic, getDiffHandler, getTransferTelemetryPayload, setSignalHandler, abortTransfer, buildTransferTable, exitMessageText, loadersFactory } from "../../utils/data-transfer.mjs";
import { exitWith } from "../../utils/helpers.mjs";
const {
  providers: { createLocalFileSourceProvider }
} = file;
const {
  providers: { createLocalStrapiDestinationProvider, DEFAULT_CONFLICT_STRATEGY }
} = strapi$1;
const { createTransferEngine, DEFAULT_VERSION_STRATEGY, DEFAULT_SCHEMA_STRATEGY } = engine;
const action = async (opts) => {
  if (!isObject(opts)) {
    exitWith(1, "Could not parse arguments");
  }
  const sourceOptions = getLocalFileSourceOptions(opts);
  const source = createLocalFileSourceProvider(sourceOptions);
  const strapiInstance = await createStrapiInstance();
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
            return !DEFAULT_IGNORED_CONTENT_TYPES.includes(link.left.type) && !DEFAULT_IGNORED_CONTENT_TYPES.includes(link.right.type);
          }
        }
      ],
      entities: [
        {
          filter: (entity) => !DEFAULT_IGNORED_CONTENT_TYPES.includes(entity.type)
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
    restore: parseRestoreFromOptions(engineOptions)
  };
  const destination = createLocalStrapiDestinationProvider(destinationOptions);
  destination.onWarning = (message) => console.warn(`
${chalk.yellow("warn")}: ${message}`);
  const engine2 = createTransferEngine(source, destination, engineOptions);
  engine2.diagnostics.onDiagnostic(formatDiagnostic("import", opts.verbose));
  const progress = engine2.progress.stream;
  const { updateLoader } = loadersFactory();
  engine2.onSchemaDiff(getDiffHandler(engine2, { force: opts.force, action: "import" }));
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
      getTransferTelemetryPayload(engine2)
    );
  });
  let results;
  try {
    setSignalHandler(() => abortTransfer({ engine: engine2, strapi }));
    results = await engine2.transfer();
    try {
      const table = buildTransferTable(results.engine);
      console.log(table?.toString());
    } catch (e) {
      console.error("There was an error displaying the results of the transfer.");
    }
    await strapiInstance.telemetry.send(
      "didDEITSProcessFinish",
      getTransferTelemetryPayload(engine2)
    );
    await strapiInstance.destroy();
    exitWith(0, exitMessageText("import"));
  } catch (e) {
    await strapiInstance.telemetry.send("didDEITSProcessFail", getTransferTelemetryPayload(engine2));
    exitWith(1, exitMessageText("import", true));
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
export {
  action as default
};
//# sourceMappingURL=action.mjs.map
