import { Transform, PassThrough, Writable, Readable, Duplex, pipeline } from "stream";
import path, { extname, join, posix } from "path";
import { EOL } from "os";
import { chain } from "stream-chain";
import { isArray, zip, isObject, uniq, isEqual, mapValues, pick, reject as reject$1, capitalize, isNumber, isEmpty, last, set, get, has, pipe, omit, assign, map as map$1, size, isNil, clone, once, castArray, keyBy } from "lodash/fp";
import { diff as diff$1 } from "semver";
import { scryptSync, createCipheriv, createDecipheriv, randomUUID } from "crypto";
import { EventEmitter } from "events";
import * as fse from "fs-extra";
import fse__default, { createReadStream, stat, createWriteStream, rm } from "fs-extra";
import _ from "lodash";
import { contentTypes, async } from "@strapi/utils";
import chalk from "chalk";
import * as webStream from "stream/web";
import { WebSocket } from "ws";
import zip$1 from "zlib";
import tar from "tar";
import { parser } from "stream-json/jsonl/Parser";
import tar$1 from "tar-stream";
import { stringer } from "stream-json/jsonl/Stringer";
const getEncryptionStrategy = (algorithm) => {
  const strategies2 = {
    "aes-128-ecb"(key) {
      const hashedKey = scryptSync(key, "", 16);
      const initVector = null;
      const securityKey = hashedKey;
      return createCipheriv(algorithm, securityKey, initVector);
    },
    aes128(key) {
      const hashedKey = scryptSync(key, "", 32);
      const initVector = hashedKey.slice(16);
      const securityKey = hashedKey.slice(0, 16);
      return createCipheriv(algorithm, securityKey, initVector);
    },
    aes192(key) {
      const hashedKey = scryptSync(key, "", 40);
      const initVector = hashedKey.slice(24);
      const securityKey = hashedKey.slice(0, 24);
      return createCipheriv(algorithm, securityKey, initVector);
    },
    aes256(key) {
      const hashedKey = scryptSync(key, "", 48);
      const initVector = hashedKey.slice(32);
      const securityKey = hashedKey.slice(0, 32);
      return createCipheriv(algorithm, securityKey, initVector);
    }
  };
  return strategies2[algorithm];
};
const createEncryptionCipher = (key, algorithm = "aes-128-ecb") => {
  return getEncryptionStrategy(algorithm)(key);
};
const getDecryptionStrategy = (algorithm) => {
  const strategies2 = {
    "aes-128-ecb"(key) {
      const hashedKey = scryptSync(key, "", 16);
      const initVector = null;
      const securityKey = hashedKey;
      return createDecipheriv(algorithm, securityKey, initVector);
    },
    aes128(key) {
      const hashedKey = scryptSync(key, "", 32);
      const initVector = hashedKey.slice(16);
      const securityKey = hashedKey.slice(0, 16);
      return createDecipheriv(algorithm, securityKey, initVector);
    },
    aes192(key) {
      const hashedKey = scryptSync(key, "", 40);
      const initVector = hashedKey.slice(24);
      const securityKey = hashedKey.slice(0, 24);
      return createDecipheriv(algorithm, securityKey, initVector);
    },
    aes256(key) {
      const hashedKey = scryptSync(key, "", 48);
      const initVector = hashedKey.slice(32);
      const securityKey = hashedKey.slice(0, 32);
      return createDecipheriv(algorithm, securityKey, initVector);
    }
  };
  return strategies2[algorithm];
};
const createDecryptionCipher = (key, algorithm = "aes-128-ecb") => {
  return getDecryptionStrategy(algorithm)(key);
};
const index$9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDecryptionCipher,
  createEncryptionCipher
}, Symbol.toStringTag, { value: "Module" }));
const filter = (predicate, options = { objectMode: true }) => {
  return new Transform({
    ...options,
    async transform(chunk, _encoding, callback) {
      const keep = await predicate(chunk);
      callback(null, keep ? chunk : void 0);
    }
  });
};
const map = (predicate, options = { objectMode: true }) => {
  return new Transform({
    ...options,
    async transform(chunk, _encoding, callback) {
      const mappedValue = await predicate(chunk);
      callback(null, mappedValue);
    }
  });
};
const collect = (stream2, options = { destroy: true }) => {
  const chunks = [];
  return new Promise((resolve, reject2) => {
    stream2.on("close", () => resolve(chunks)).on("error", reject2).on("data", (chunk) => chunks.push(chunk)).on("end", () => {
      if (options.destroy) {
        stream2.destroy();
      }
      resolve(chunks);
    });
  });
};
const stream = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  collect,
  filter,
  map
}, Symbol.toStringTag, { value: "Module" }));
const createContext = () => ({ path: [] });
const diff = (a, b, ctx = createContext()) => {
  const diffs = [];
  const { path: path2 } = ctx;
  const aType = typeof a;
  const bType = typeof b;
  const added = () => {
    diffs.push({ kind: "added", path: path2, type: bType, value: b });
    return diffs;
  };
  const deleted = () => {
    diffs.push({ kind: "deleted", path: path2, type: aType, value: a });
    return diffs;
  };
  const modified = () => {
    diffs.push({
      kind: "modified",
      path: path2,
      types: [aType, bType],
      values: [a, b]
    });
    return diffs;
  };
  if (isArray(a) && isArray(b)) {
    let k = 0;
    for (const [aItem, bItem] of zip(a, b)) {
      const kCtx = { path: [...path2, k.toString()] };
      const kDiffs = diff(aItem, bItem, kCtx);
      diffs.push(...kDiffs);
      k += 1;
    }
    return diffs;
  }
  if (isObject(a) && isObject(b)) {
    const keys = uniq(Object.keys(a).concat(Object.keys(b)));
    for (const key of keys) {
      const aValue = a[key];
      const bValue = b[key];
      const nestedDiffs = diff(aValue, bValue, { path: [...path2, key] });
      diffs.push(...nestedDiffs);
    }
    return diffs;
  }
  if (!isEqual(a, b)) {
    if (aType === "undefined") {
      return added();
    }
    if (bType === "undefined") {
      return deleted();
    }
    return modified();
  }
  return diffs;
};
const json = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diff
}, Symbol.toStringTag, { value: "Module" }));
const VALID_SCHEMA_PROPERTIES = [
  "collectionName",
  "info",
  "options",
  "pluginOptions",
  "attributes",
  "kind",
  "modelType",
  "modelName",
  "uid",
  "plugin",
  "globalId"
];
const mapSchemasValues = (schemas) => {
  return mapValues(pick(VALID_SCHEMA_PROPERTIES), schemas);
};
const schemasToValidJSON = (schemas) => {
  return JSON.parse(JSON.stringify(schemas));
};
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapSchemasValues,
  schemasToValidJSON
}, Symbol.toStringTag, { value: "Module" }));
const createTransaction = (strapi2) => {
  const fns = [];
  let done = false;
  let resume = null;
  const e = new EventEmitter();
  e.on("spawn", (uuid, cb) => {
    fns.push({ fn: cb, uuid });
    resume?.();
  });
  e.on("close", () => {
    e.removeAllListeners("rollback");
    e.removeAllListeners("spawn");
    done = true;
    resume?.();
  });
  strapi2.db.transaction(async ({ trx, rollback }) => {
    e.once("rollback", async () => {
      e.removeAllListeners("close");
      e.removeAllListeners("spawn");
      try {
        await rollback();
        e.emit("rollback_completed");
      } catch {
        e.emit("rollback_failed");
      } finally {
        done = true;
        resume?.();
      }
    });
    while (!done) {
      while (fns.length) {
        const item = fns.shift();
        if (item) {
          const { fn, uuid } = item;
          try {
            const res = await fn(trx);
            e.emit(uuid, { data: res });
          } catch (error) {
            e.emit(uuid, { error });
          }
        }
      }
      if (!done && !fns.length) {
        await new Promise((resolve) => {
          resume = resolve;
        });
      }
    }
  });
  return {
    async attach(callback) {
      const uuid = randomUUID();
      e.emit("spawn", uuid, callback);
      return new Promise((resolve, reject2) => {
        e.on(uuid, ({ data, error }) => {
          if (data) {
            resolve(data);
          }
          if (error) {
            reject2(error);
          }
          resolve(void 0);
        });
      });
    },
    end() {
      return e.emit("close");
    },
    rollback() {
      return new Promise((resolve) => {
        e.emit("rollback");
        e.once("rollback_failed", () => resolve(false));
        e.once("rollback_completed", () => resolve(true));
      });
    }
  };
};
const transaction = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTransaction
}, Symbol.toStringTag, { value: "Module" }));
const runMiddleware = async (context, middlewares) => {
  if (!middlewares.length) {
    return;
  }
  const cb = middlewares[0];
  await cb(context, async (newContext) => {
    await runMiddleware(newContext, middlewares.slice(1));
  });
};
const middleware = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  runMiddleware
}, Symbol.toStringTag, { value: "Module" }));
const createDiagnosticReporter = (options = {}) => {
  const { stackSize = -1 } = options;
  const emitter = new EventEmitter();
  const stack = [];
  const addListener = (event, listener) => {
    emitter.on(event, listener);
  };
  const isDiagnosticValid = (diagnostic2) => {
    if (!diagnostic2.kind || !diagnostic2.details || !diagnostic2.details.message) {
      return false;
    }
    return true;
  };
  return {
    stack: {
      get size() {
        return stack.length;
      },
      get items() {
        return stack;
      }
    },
    report(diagnostic2) {
      if (!isDiagnosticValid(diagnostic2)) {
        return this;
      }
      emitter.emit("diagnostic", diagnostic2);
      emitter.emit(`diagnostic.${diagnostic2.kind}`, diagnostic2);
      if (stackSize !== -1 && stack.length >= stackSize) {
        stack.shift();
      }
      stack.push(diagnostic2);
      return this;
    },
    onDiagnostic(listener) {
      addListener("diagnostic", listener);
      return this;
    },
    on(kind, listener) {
      addListener(`diagnostic.${kind}`, listener);
      return this;
    }
  };
};
const diagnostic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createDiagnosticReporter
}, Symbol.toStringTag, { value: "Module" }));
const index$8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: diagnostic,
  encryption: index$9,
  json,
  middleware,
  schema,
  stream,
  transaction
}, Symbol.toStringTag, { value: "Module" }));
const OPTIONAL_CONTENT_TYPES = ["audit-log"];
const isAttributeIgnorable = (diff2) => {
  return diff2.path.length === 3 && // Root property must be attributes
  diff2.path[0] === "attributes" && // Need a valid string attribute name
  typeof diff2.path[1] === "string" && // The diff must be on ignorable attribute properties
  ["private", "required", "configurable", "default"].includes(diff2.path[2]);
};
const isOptionalAdminType = (diff2) => {
  if ("value" in diff2 && isObject(diff2.value)) {
    const name = diff2?.value?.info?.singularName;
    return OPTIONAL_CONTENT_TYPES.includes(name);
  }
  if ("values" in diff2 && isArray(diff2.values) && isObject(diff2.values[0])) {
    const name = diff2?.values[0]?.info?.singularName;
    return OPTIONAL_CONTENT_TYPES.includes(name);
  }
  return false;
};
const isIgnorableStrict = (diff2) => isAttributeIgnorable(diff2) || isOptionalAdminType(diff2);
const strategies = {
  // No diffs
  exact(diffs) {
    return diffs;
  },
  // Strict: all content types must match except:
  // - the property within a content type is an ignorable one
  // - those that are (not transferrable and optionally available), for example EE features such as audit logs
  strict(diffs) {
    return reject$1(isIgnorableStrict, diffs);
  }
};
const compareSchemas = (a, b, strategy) => {
  const diffs = diff(a, b);
  return strategies[strategy](diffs);
};
const SeverityKind = {
  FATAL: "fatal",
  ERROR: "error",
  SILLY: "silly"
};
class DataTransferError extends Error {
  origin;
  severity;
  details;
  constructor(origin2, severity, message, details) {
    super(message);
    this.origin = origin2;
    this.severity = severity;
    this.details = details ?? null;
  }
}
class TransferEngineError extends DataTransferError {
  constructor(severity, message, details) {
    super("engine", severity, message, details);
  }
}
class TransferEngineInitializationError extends TransferEngineError {
  constructor(message) {
    super(SeverityKind.FATAL, message, { step: "initialization" });
  }
}
class TransferEngineValidationError extends TransferEngineError {
  constructor(message, details) {
    super(SeverityKind.FATAL, message, { step: "validation", details });
  }
}
class TransferEngineTransferError extends TransferEngineError {
  constructor(message, details) {
    super(SeverityKind.FATAL, message, { step: "transfer", details });
  }
}
const errors = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TransferEngineError,
  TransferEngineInitializationError,
  TransferEngineTransferError,
  TransferEngineValidationError
}, Symbol.toStringTag, { value: "Module" }));
const reject = (reason) => {
  throw new TransferEngineValidationError(`Invalid provider supplied. ${reason}`);
};
const validateProvider = (type, provider) => {
  if (!provider) {
    return reject(
      `Expected an instance of "${capitalize(type)}Provider", but got "${typeof provider}" instead.`
    );
  }
  if (provider.type !== type) {
    return reject(
      `Expected the provider to be of type "${type}" but got "${provider.type}" instead.`
    );
  }
};
class ProviderError extends DataTransferError {
  constructor(severity, message, details) {
    super("provider", severity, message, details);
  }
}
class ProviderInitializationError extends ProviderError {
  constructor(message) {
    super(SeverityKind.FATAL, message, { step: "initialization" });
  }
}
class ProviderValidationError extends ProviderError {
  constructor(message, details) {
    super(SeverityKind.SILLY, message, { step: "validation", details });
  }
}
class ProviderTransferError extends ProviderError {
  constructor(message, details) {
    super(SeverityKind.FATAL, message, { step: "transfer", details });
  }
}
const TRANSFER_STAGES = Object.freeze([
  "entities",
  "links",
  "assets",
  "schemas",
  "configuration"
]);
const TransferGroupPresets = {
  content: {
    links: true,
    // Example: content includes the entire links stage
    entities: true
    // TODO: If we need to implement filtering on a running stage, it would be done like this, but we still need to implement it
    // [
    //   // Example: content processes the entities stage, but filters individual entities
    //   {
    //     filter(data) {
    //       return shouldIncludeThisData(data);
    //     },
    //   },
    // ],
  },
  files: {
    assets: true
  },
  config: {
    configuration: true
  }
};
const DEFAULT_VERSION_STRATEGY = "ignore";
const DEFAULT_SCHEMA_STRATEGY = "strict";
class TransferEngine {
  sourceProvider;
  destinationProvider;
  options;
  #metadata = {};
  #schema = {};
  // Progress of the current stage
  progress;
  diagnostics;
  #handlers = {
    schemaDiff: [],
    errors: {}
  };
  onSchemaDiff(handler) {
    this.#handlers?.schemaDiff?.push(handler);
  }
  addErrorHandler(handlerName, handler) {
    if (!this.#handlers.errors[handlerName]) {
      this.#handlers.errors[handlerName] = [];
    }
    this.#handlers.errors[handlerName]?.push(handler);
  }
  async attemptResolveError(error) {
    const context = {};
    if (error instanceof ProviderTransferError && error.details?.details.code) {
      const errorCode = error.details?.details.code;
      if (!this.#handlers.errors[errorCode]) {
        this.#handlers.errors[errorCode] = [];
      }
      await runMiddleware(context ?? {}, this.#handlers.errors[errorCode] ?? []);
    }
    return !!context.ignore;
  }
  // Save the currently open stream so that we can access it at any time
  #currentStream;
  constructor(sourceProvider, destinationProvider, options) {
    this.diagnostics = createDiagnosticReporter();
    validateProvider("source", sourceProvider);
    validateProvider("destination", destinationProvider);
    this.sourceProvider = sourceProvider;
    this.destinationProvider = destinationProvider;
    this.options = options;
    this.progress = { data: {}, stream: new PassThrough({ objectMode: true }) };
  }
  /**
   * Report a fatal error and throw it
   */
  panic(error) {
    this.reportError(error, "fatal");
    throw error;
  }
  /**
   * Report an error diagnostic
   */
  reportError(error, severity) {
    this.diagnostics.report({
      kind: "error",
      details: {
        severity,
        createdAt: /* @__PURE__ */ new Date(),
        name: error.name,
        message: error.message,
        error
      }
    });
  }
  /**
   * Report a warning diagnostic
   */
  reportWarning(message, origin2) {
    this.diagnostics.report({
      kind: "warning",
      details: { createdAt: /* @__PURE__ */ new Date(), message, origin: origin2 }
    });
  }
  /**
   * Report an info diagnostic
   */
  reportInfo(message, params) {
    this.diagnostics.report({
      kind: "info",
      details: { createdAt: /* @__PURE__ */ new Date(), message, params, origin: "engine" }
    });
  }
  /**
   * Create and return a transform stream based on the given stage and options.
   *
   * Allowed transformations includes 'filter' and 'map'.
   */
  #createStageTransformStream(key, options = {}) {
    const { includeGlobal = true } = options;
    const { throttle } = this.options;
    const { global: globalTransforms, [key]: stageTransforms } = this.options?.transforms ?? {};
    let stream2 = new PassThrough({ objectMode: true });
    const applyTransforms = (transforms = []) => {
      const chainTransforms = [];
      for (const transform of transforms) {
        if ("filter" in transform) {
          chainTransforms.push(filter(transform.filter));
        }
        if ("map" in transform) {
          chainTransforms.push(map(transform.map));
        }
      }
      if (chainTransforms.length) {
        stream2 = stream2.pipe(chain(chainTransforms));
      }
    };
    if (includeGlobal) {
      applyTransforms(globalTransforms);
    }
    if (isNumber(throttle) && throttle > 0) {
      stream2 = stream2.pipe(
        new PassThrough({
          objectMode: true,
          async transform(data, _encoding, callback) {
            await new Promise((resolve) => {
              setTimeout(resolve, throttle);
            });
            callback(null, data);
          }
        })
      );
    }
    applyTransforms(stageTransforms);
    return stream2;
  }
  /**
   * Update the Engine's transfer progress data for a given stage.
   *
   * Providing aggregate options enable custom computation to get the size (bytes) or the aggregate key associated with the data
   */
  #updateTransferProgress(stage, data, aggregate) {
    if (!this.progress.data[stage]) {
      this.progress.data[stage] = { count: 0, bytes: 0, startTime: Date.now() };
    }
    const stageProgress = this.progress.data[stage];
    if (!stageProgress) {
      return;
    }
    const size2 = aggregate?.size?.(data) ?? JSON.stringify(data).length;
    const key = aggregate?.key?.(data);
    stageProgress.count += 1;
    stageProgress.bytes += size2;
    if (key) {
      if (!stageProgress.aggregates) {
        stageProgress.aggregates = {};
      }
      const { aggregates } = stageProgress;
      if (!aggregates[key]) {
        aggregates[key] = { count: 0, bytes: 0 };
      }
      aggregates[key].count += 1;
      aggregates[key].bytes += size2;
    }
  }
  /**
   * Create and return a PassThrough stream.
   *
   * Upon writing data into it, it'll update the Engine's transfer progress data and trigger stage update events.
   */
  #progressTracker(stage, aggregate) {
    return new PassThrough({
      objectMode: true,
      transform: (data, _encoding, callback) => {
        this.#updateTransferProgress(stage, data, aggregate);
        this.#emitStageUpdate("progress", stage);
        callback(null, data);
      }
    });
  }
  /**
   * Shorthand method used to trigger transfer update events to every listeners
   */
  #emitTransferUpdate(type, payload) {
    this.progress.stream.emit(`transfer::${type}`, payload);
  }
  /**
   * Shorthand method used to trigger stage update events to every listeners
   */
  #emitStageUpdate(type, transferStage) {
    this.progress.stream.emit(`stage::${type}`, {
      data: this.progress.data,
      stage: transferStage
    });
  }
  /**
   * Run a version check between two strapi version (source and destination) using the strategy given to the engine during initialization.
   *
   * If there is a mismatch, throws a validation error.
   */
  #assertStrapiVersionIntegrity(sourceVersion, destinationVersion) {
    const strategy = this.options.versionStrategy || DEFAULT_VERSION_STRATEGY;
    const reject2 = () => {
      throw new TransferEngineValidationError(
        `The source and destination provide are targeting incompatible Strapi versions (using the "${strategy}" strategy). The source (${this.sourceProvider.name}) version is ${sourceVersion} and the destination (${this.destinationProvider.name}) version is ${destinationVersion}`,
        {
          check: "strapi.version",
          strategy,
          versions: { source: sourceVersion, destination: destinationVersion }
        }
      );
    };
    if (!sourceVersion || !destinationVersion || strategy === "ignore" || destinationVersion === sourceVersion) {
      return;
    }
    let diff2;
    try {
      diff2 = diff$1(sourceVersion, destinationVersion);
    } catch {
      reject2();
    }
    if (!diff2) {
      return;
    }
    const validPatch = ["prelease", "build"];
    const validMinor = [...validPatch, "patch", "prepatch"];
    const validMajor = [...validMinor, "minor", "preminor"];
    if (strategy === "patch" && validPatch.includes(diff2)) {
      return;
    }
    if (strategy === "minor" && validMinor.includes(diff2)) {
      return;
    }
    if (strategy === "major" && validMajor.includes(diff2)) {
      return;
    }
    reject2();
  }
  /**
   * Run a check between two set of schemas (source and destination) using the strategy given to the engine during initialization.
   *
   * If there are differences and/or incompatibilities between source and destination schemas, then throw a validation error.
   */
  #assertSchemasMatching(sourceSchemas, destinationSchemas) {
    const strategy = this.options.schemaStrategy || DEFAULT_SCHEMA_STRATEGY;
    if (strategy === "ignore") {
      return;
    }
    const keys = uniq(Object.keys(sourceSchemas).concat(Object.keys(destinationSchemas)));
    const diffs = {};
    keys.forEach((key) => {
      const sourceSchema = sourceSchemas[key];
      const destinationSchema = destinationSchemas[key];
      const schemaDiffs = compareSchemas(sourceSchema, destinationSchema, strategy);
      if (schemaDiffs.length) {
        diffs[key] = schemaDiffs;
      }
    });
    if (!isEmpty(diffs)) {
      const formattedDiffs = Object.entries(diffs).map(([uid, ctDiffs]) => {
        let msg = `- ${uid}:${EOL}`;
        msg += ctDiffs.sort((a, b) => a.kind > b.kind ? -1 : 1).map((diff2) => {
          const path2 = diff2.path.join(".");
          if (diff2.kind === "added") {
            return `${path2} exists in destination schema but not in source schema and the data will not be transferred.`;
          }
          if (diff2.kind === "deleted") {
            return `${path2} exists in source schema but not in destination schema and the data will not be transferred.`;
          }
          if (diff2.kind === "modified") {
            if (diff2.types[0] === diff2.types[1]) {
              return `Schema value changed at "${path2}": "${diff2.values[0]}" (${diff2.types[0]}) => "${diff2.values[1]}" (${diff2.types[1]})`;
            }
            return `Schema has differing data types at "${path2}": "${diff2.values[0]}" (${diff2.types[0]}) => "${diff2.values[1]}" (${diff2.types[1]})`;
          }
          throw new TransferEngineValidationError(`Invalid diff found for "${uid}"`, {
            check: `schema on ${uid}`
          });
        }).map((line) => `  - ${line}`).join(EOL);
        return msg;
      }).join(EOL);
      throw new TransferEngineValidationError(
        `Invalid schema changes detected during integrity checks (using the ${strategy} strategy). Please find a summary of the changes below:
${formattedDiffs}`,
        {
          check: "schema.changes",
          strategy,
          diffs
        }
      );
    }
  }
  shouldSkipStage(stage) {
    const { exclude, only } = this.options;
    if (stage === "schemas") {
      return false;
    }
    let included = isEmpty(only);
    if (only && only.length > 0) {
      included = only.some((transferGroup) => {
        return TransferGroupPresets[transferGroup][stage];
      });
    }
    if (exclude && exclude.length > 0) {
      if (included) {
        included = !exclude.some((transferGroup) => {
          return TransferGroupPresets[transferGroup][stage];
        });
      }
    }
    return !included;
  }
  async #transferStage(options) {
    const { stage, source, destination, transform, tracker } = options;
    const updateEndTime = () => {
      const stageData = this.progress.data[stage];
      if (stageData) {
        stageData.endTime = Date.now();
      }
    };
    if (!source || !destination || this.shouldSkipStage(stage)) {
      const results = await Promise.allSettled(
        [source, destination].map((stream2) => {
          if (!stream2 || stream2.destroyed) {
            return Promise.resolve();
          }
          return new Promise((resolve, reject2) => {
            stream2.on("close", resolve).on("error", reject2).destroy();
          });
        })
      );
      results.forEach((state) => {
        if (state.status === "rejected") {
          this.reportWarning(state.reason, `transfer(${stage})`);
        }
      });
      this.#emitStageUpdate("skip", stage);
      return;
    }
    this.#emitStageUpdate("start", stage);
    await new Promise((resolve, reject2) => {
      let stream2 = source;
      if (transform) {
        stream2 = stream2.pipe(transform);
      }
      if (tracker) {
        stream2 = stream2.pipe(tracker);
      }
      this.#currentStream = stream2.pipe(destination).on("error", (e) => {
        updateEndTime();
        this.#emitStageUpdate("error", stage);
        this.reportError(e, "error");
        destination.destroy(e);
        reject2(e);
      }).on("close", () => {
        this.#currentStream = void 0;
        updateEndTime();
        resolve();
      });
    });
    this.#emitStageUpdate("finish", stage);
  }
  // Cause an ongoing transfer to abort gracefully
  async abortTransfer() {
    const err = new TransferEngineError("fatal", "Transfer aborted.");
    if (!this.#currentStream) {
      throw err;
    }
    this.#currentStream.destroy(err);
  }
  async init() {
    await this.#resolveProviderResource();
    const { source: sourceMetadata } = this.#metadata;
    if (sourceMetadata) {
      this.destinationProvider.setMetadata?.("source", sourceMetadata);
    }
  }
  /**
   * Run the bootstrap method in both source and destination providers
   */
  async bootstrap() {
    const results = await Promise.allSettled([
      this.sourceProvider.bootstrap?.(this.diagnostics),
      this.destinationProvider.bootstrap?.(this.diagnostics)
    ]);
    results.forEach((result) => {
      if (result.status === "rejected") {
        this.panic(result.reason);
      }
    });
  }
  /**
   * Run the close method in both source and destination providers
   */
  async close() {
    const results = await Promise.allSettled([
      this.sourceProvider.close?.(),
      this.destinationProvider.close?.()
    ]);
    results.forEach((result) => {
      if (result.status === "rejected") {
        this.panic(result.reason);
      }
    });
  }
  async #resolveProviderResource() {
    const sourceMetadata = await this.sourceProvider.getMetadata();
    const destinationMetadata = await this.destinationProvider.getMetadata();
    if (sourceMetadata) {
      this.#metadata.source = sourceMetadata;
    }
    if (destinationMetadata) {
      this.#metadata.destination = destinationMetadata;
    }
  }
  async #getSchemas() {
    if (!this.#schema.source) {
      this.#schema.source = await this.sourceProvider.getSchemas?.();
    }
    if (!this.#schema.destination) {
      this.#schema.destination = await this.destinationProvider.getSchemas?.();
    }
    return {
      sourceSchemas: this.#schema.source,
      destinationSchemas: this.#schema.destination
    };
  }
  async integrityCheck() {
    const sourceMetadata = await this.sourceProvider.getMetadata();
    const destinationMetadata = await this.destinationProvider.getMetadata();
    if (sourceMetadata && destinationMetadata) {
      this.#assertStrapiVersionIntegrity(
        sourceMetadata?.strapi?.version,
        destinationMetadata?.strapi?.version
      );
    }
    const { sourceSchemas, destinationSchemas } = await this.#getSchemas();
    try {
      if (sourceSchemas && destinationSchemas) {
        this.#assertSchemasMatching(sourceSchemas, destinationSchemas);
      }
    } catch (error) {
      if (error instanceof TransferEngineValidationError && error.details?.details?.diffs) {
        const schemaDiffs = error.details?.details?.diffs;
        const context = {
          ignoredDiffs: {},
          diffs: schemaDiffs,
          source: this.sourceProvider,
          destination: this.destinationProvider
        };
        if (isEmpty(this.#handlers.schemaDiff)) {
          throw error;
        }
        await runMiddleware(
          context,
          this.#handlers.schemaDiff
        );
        const unresolvedDiffs = diff(context.diffs, context.ignoredDiffs);
        if (unresolvedDiffs.length) {
          this.panic(
            new TransferEngineValidationError("Unresolved differences in schema", {
              check: "schema.changes",
              unresolvedDiffs
            })
          );
        }
        return;
      }
      throw error;
    }
  }
  async transfer() {
    this.progress.data = {};
    try {
      this.#emitTransferUpdate("init");
      await this.bootstrap();
      await this.init();
      await this.integrityCheck();
      this.#emitTransferUpdate("start");
      await this.beforeTransfer();
      await this.transferSchemas();
      await this.transferEntities();
      await this.transferAssets();
      await this.transferLinks();
      await this.transferConfiguration();
      await this.close();
      this.#emitTransferUpdate("finish");
    } catch (e) {
      this.#emitTransferUpdate("error", { error: e });
      const lastDiagnostic = last(this.diagnostics.stack.items);
      if (e instanceof Error && (!lastDiagnostic || lastDiagnostic.kind !== "error" || lastDiagnostic.details.error !== e)) {
        this.reportError(e, e.severity || "fatal");
      }
      await this.destinationProvider.rollback?.(e);
      throw e;
    }
    return {
      source: this.sourceProvider.results,
      destination: this.destinationProvider.results,
      engine: this.progress.data
    };
  }
  async beforeTransfer() {
    const runWithDiagnostic = async (provider) => {
      try {
        await provider.beforeTransfer?.();
      } catch (error) {
        if (error instanceof Error) {
          const resolved = await this.attemptResolveError(error);
          if (resolved) {
            return;
          }
          this.panic(error);
        } else {
          this.panic(
            new Error(`Unknwon error when executing "beforeTransfer" on the ${origin} provider`)
          );
        }
      }
    };
    await runWithDiagnostic(this.sourceProvider);
    await runWithDiagnostic(this.destinationProvider);
  }
  async transferSchemas() {
    const stage = "schemas";
    if (this.shouldSkipStage(stage)) {
      return;
    }
    const source = await this.sourceProvider.createSchemasReadStream?.();
    const destination = await this.destinationProvider.createSchemasWriteStream?.();
    const transform = this.#createStageTransformStream(stage);
    const tracker = this.#progressTracker(stage, {
      key: (value) => value.modelType
    });
    await this.#transferStage({ stage, source, destination, transform, tracker });
  }
  async transferEntities() {
    const stage = "entities";
    if (this.shouldSkipStage(stage)) {
      return;
    }
    const source = await this.sourceProvider.createEntitiesReadStream?.();
    const destination = await this.destinationProvider.createEntitiesWriteStream?.();
    const transform = chain([
      this.#createStageTransformStream(stage),
      new Transform({
        objectMode: true,
        transform: async (entity2, _encoding, callback) => {
          const { destinationSchemas: schemas } = await this.#getSchemas();
          if (!schemas) {
            return callback(null, entity2);
          }
          const availableContentTypes = Object.entries(schemas).filter(([, schema2]) => schema2.modelType === "contentType").map(([uid]) => uid);
          if (!availableContentTypes.includes(entity2.type)) {
            return callback(null, void 0);
          }
          const { type, data } = entity2;
          const attributes = schemas[type].attributes;
          const attributesToKeep = Object.keys(attributes).concat("documentId");
          const updatedEntity = set("data", pick(attributesToKeep, data), entity2);
          callback(null, updatedEntity);
        }
      })
    ]);
    const tracker = this.#progressTracker(stage, { key: (value) => value.type });
    await this.#transferStage({ stage, source, destination, transform, tracker });
  }
  async transferLinks() {
    const stage = "links";
    if (this.shouldSkipStage(stage)) {
      return;
    }
    const source = await this.sourceProvider.createLinksReadStream?.();
    const destination = await this.destinationProvider.createLinksWriteStream?.();
    const transform = chain([
      this.#createStageTransformStream(stage),
      new Transform({
        objectMode: true,
        transform: async (link2, _encoding, callback) => {
          const { destinationSchemas: schemas } = await this.#getSchemas();
          if (!schemas) {
            return callback(null, link2);
          }
          const availableContentTypes = Object.keys(schemas);
          const isValidType = (uid) => availableContentTypes.includes(uid);
          if (!isValidType(link2.left.type) || !isValidType(link2.right.type)) {
            return callback(null, void 0);
          }
          callback(null, link2);
        }
      })
    ]);
    const tracker = this.#progressTracker(stage);
    await this.#transferStage({ stage, source, destination, transform, tracker });
  }
  async transferAssets() {
    const stage = "assets";
    if (this.shouldSkipStage(stage)) {
      return;
    }
    const source = await this.sourceProvider.createAssetsReadStream?.();
    const destination = await this.destinationProvider.createAssetsWriteStream?.();
    const transform = this.#createStageTransformStream(stage);
    const tracker = this.#progressTracker(stage, {
      size: (value) => value.stats.size,
      key: (value) => extname(value.filename) || "No extension"
    });
    await this.#transferStage({ stage, source, destination, transform, tracker });
  }
  async transferConfiguration() {
    const stage = "configuration";
    if (this.shouldSkipStage(stage)) {
      return;
    }
    const source = await this.sourceProvider.createConfigurationReadStream?.();
    const destination = await this.destinationProvider.createConfigurationWriteStream?.();
    const transform = this.#createStageTransformStream(stage);
    const tracker = this.#progressTracker(stage);
    await this.#transferStage({ stage, source, destination, transform, tracker });
  }
}
const createTransferEngine = (sourceProvider, destinationProvider, options) => {
  return new TransferEngine(sourceProvider, destinationProvider, options);
};
const index$7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_SCHEMA_STRATEGY,
  DEFAULT_VERSION_STRATEGY,
  TRANSFER_STAGES,
  TransferGroupPresets,
  createTransferEngine,
  errors
}, Symbol.toStringTag, { value: "Module" }));
const isDialectMySQL = () => strapi.db?.dialect.client === "mysql";
function omitComponentData(contentType, data) {
  const { attributes } = contentType;
  const componentAttributes = Object.keys(attributes).filter(
    (attributeName) => contentTypes.isComponentAttribute(attributes[attributeName])
  );
  return omit(componentAttributes, data);
}
const createComponents = async (uid, data) => {
  const { attributes = {} } = strapi.getModel(uid);
  const componentBody = {};
  const attributeNames = Object.keys(attributes);
  for (const attributeName of attributeNames) {
    const attribute = attributes[attributeName];
    if (!has(attributeName, data) || !contentTypes.isComponentAttribute(attribute)) {
      continue;
    }
    if (attribute.type === "component") {
      const { component: componentUID, repeatable = false } = attribute;
      const componentValue = data[attributeName];
      if (componentValue === null) {
        continue;
      }
      if (repeatable === true) {
        if (!Array.isArray(componentValue)) {
          throw new Error("Expected an array to create repeatable component");
        }
        const components = await async.map(
          componentValue,
          (value) => createComponent(componentUID, value),
          { concurrency: isDialectMySQL() && !strapi.db?.inTransaction() ? 1 : Infinity }
        );
        componentBody[attributeName] = components.map(({ id }) => {
          return {
            id,
            __pivot: {
              field: attributeName,
              component_type: componentUID
            }
          };
        });
      } else {
        const component = await createComponent(
          componentUID,
          componentValue
        );
        componentBody[attributeName] = {
          id: component.id,
          __pivot: {
            field: attributeName,
            component_type: componentUID
          }
        };
      }
      continue;
    }
    if (attribute.type === "dynamiczone") {
      const dynamiczoneValues = data[attributeName];
      if (!Array.isArray(dynamiczoneValues)) {
        throw new Error("Expected an array to create repeatable component");
      }
      const createDynamicZoneComponents = async (value) => {
        const { id } = await createComponent(value.__component, value);
        return {
          id,
          __component: value.__component,
          __pivot: {
            field: attributeName
          }
        };
      };
      componentBody[attributeName] = await async.map(
        dynamiczoneValues,
        createDynamicZoneComponents,
        { concurrency: isDialectMySQL() && !strapi.db?.inTransaction() ? 1 : Infinity }
      );
      continue;
    }
  }
  return componentBody;
};
const getComponents = async (uid, entity2) => {
  const componentAttributes = contentTypes.getComponentAttributes(strapi.getModel(uid));
  if (_.isEmpty(componentAttributes)) {
    return {};
  }
  return strapi.db.query(uid).load(entity2, componentAttributes);
};
const deleteComponents = async (uid, entityToDelete, { loadComponents = true } = {}) => {
  const { attributes = {} } = strapi.getModel(uid);
  const attributeNames = Object.keys(attributes);
  for (const attributeName of attributeNames) {
    const attribute = attributes[attributeName];
    if (attribute.type === "component" || attribute.type === "dynamiczone") {
      let value;
      if (loadComponents) {
        value = await strapi.db.query(uid).load(entityToDelete, attributeName);
      } else {
        value = entityToDelete[attributeName];
      }
      if (!value) {
        continue;
      }
      if (attribute.type === "component") {
        const { component: componentUID } = attribute;
        await async.map(
          _.castArray(value),
          (subValue) => deleteComponent(componentUID, subValue),
          {
            concurrency: isDialectMySQL() && !strapi.db?.inTransaction() ? 1 : Infinity
          }
        );
      } else {
        await async.map(
          _.castArray(value),
          (subValue) => deleteComponent(subValue.__component, subValue),
          { concurrency: isDialectMySQL() && !strapi.db?.inTransaction() ? 1 : Infinity }
        );
      }
      continue;
    }
  }
};
const createComponent = async (uid, data) => {
  const model = strapi.getModel(uid);
  const componentData = await createComponents(uid, data);
  const transform = pipe(
    // Make sure we don't save the component with a pre-defined ID
    omit("id"),
    // Remove the component data from the original data object ...
    (payload) => omitComponentData(model, payload),
    // ... and assign the newly created component instead
    assign(componentData)
  );
  return strapi.db.query(uid).create({ data: transform(data) });
};
const deleteComponent = async (uid, componentToDelete) => {
  await deleteComponents(uid, componentToDelete);
  await strapi.db.query(uid).delete({ where: { id: componentToDelete.id } });
};
const resolveComponentUID = ({
  paths,
  strapi: strapi2,
  data,
  contentType
}) => {
  let value = data;
  let cType = contentType;
  for (const path2 of paths) {
    value = get(path2, value);
    if (typeof cType === "function") {
      cType = cType(value);
    }
    if (path2 in cType.attributes) {
      const attribute = cType.attributes[path2];
      if (attribute.type === "component") {
        cType = strapi2.getModel(attribute.component);
      }
      if (attribute.type === "dynamiczone") {
        cType = ({ __component }) => strapi2.getModel(__component);
      }
    }
  }
  if ("uid" in cType) {
    return cType.uid;
  }
  return void 0;
};
const sanitizeComponentLikeAttributes = (model, data) => {
  const { attributes } = model;
  const componentLikeAttributesKey = Object.entries(attributes).filter(([, attribute]) => attribute.type === "component" || attribute.type === "dynamiczone").map(([key]) => key);
  return omit(componentLikeAttributesKey, data);
};
const omitInvalidCreationAttributes$1 = omit(["id"]);
const createEntityQuery = (strapi2) => {
  const components = {
    async assignToEntity(uid, data) {
      const model = strapi2.getModel(uid);
      const entityComponents = await createComponents(uid, data);
      const dataWithoutComponents = sanitizeComponentLikeAttributes(model, data);
      return assign(entityComponents, dataWithoutComponents);
    },
    async get(uid, entity2) {
      return getComponents(uid, entity2);
    },
    delete(uid, componentsToDelete) {
      return deleteComponents(uid, componentsToDelete, {
        loadComponents: false
      });
    }
  };
  const query = (uid) => {
    const create = async (params) => {
      const dataWithComponents = await components.assignToEntity(uid, params.data);
      const sanitizedData = omitInvalidCreationAttributes$1(dataWithComponents);
      return strapi2.db.query(uid).create({ ...params, data: sanitizedData });
    };
    const createMany = async (params) => {
      return Promise.resolve(params.data).then(map$1((data) => components.assignToEntity(uid, data))).then(map$1(omitInvalidCreationAttributes$1)).then((data) => strapi2.db.query(uid).createMany({ ...params, data }));
    };
    const deleteMany = async (params) => {
      const entitiesToDelete = await strapi2.db.query(uid).findMany(params ?? {});
      if (!entitiesToDelete.length) {
        return null;
      }
      const componentsToDelete = await Promise.all(
        entitiesToDelete.map((entityToDelete) => components.get(uid, entityToDelete))
      );
      const deletedEntities = await strapi2.db.query(uid).deleteMany(params);
      await Promise.all(componentsToDelete.map((compos) => components.delete(uid, compos)));
      return deletedEntities;
    };
    const getDeepPopulateComponentLikeQuery = (contentType, params = { select: "*" }) => {
      const { attributes } = contentType;
      const populate = {};
      const entries = Object.entries(attributes);
      for (const [key, attribute] of entries) {
        if (attribute.type === "component") {
          const component = strapi2.getModel(attribute.component);
          const subPopulate = getDeepPopulateComponentLikeQuery(component, params);
          if ((isArray(subPopulate) || isObject(subPopulate)) && size(subPopulate) > 0) {
            populate[key] = { ...params, populate: subPopulate };
          }
          if (isArray(subPopulate) && isEmpty(subPopulate)) {
            populate[key] = { ...params };
          }
        }
        if (attribute.type === "dynamiczone") {
          const { components: componentsUID } = attribute;
          const on = {};
          for (const componentUID of componentsUID) {
            const component = strapi2.getModel(componentUID);
            const subPopulate = getDeepPopulateComponentLikeQuery(component, params);
            if ((isArray(subPopulate) || isObject(subPopulate)) && size(subPopulate) > 0) {
              on[componentUID] = { ...params, populate: subPopulate };
            }
            if (isArray(subPopulate) && isEmpty(subPopulate)) {
              on[componentUID] = { ...params };
            }
          }
          populate[key] = size(on) > 0 ? { on } : true;
        }
      }
      const values = Object.values(populate);
      if (values.every((value) => value === true)) {
        return Object.keys(populate);
      }
      return populate;
    };
    return {
      create,
      createMany,
      deleteMany,
      getDeepPopulateComponentLikeQuery,
      get deepPopulateComponentLikeQuery() {
        const contentType = strapi2.getModel(uid);
        return getDeepPopulateComponentLikeQuery(contentType);
      }
    };
  };
  return query;
};
const entity = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createEntityQuery
}, Symbol.toStringTag, { value: "Module" }));
const createLinkQuery = (strapi2, trx) => {
  const query = () => {
    const { connection } = strapi2.db;
    const addSchema = (tableName) => {
      const schemaName = connection.client.connectionSettings.schema;
      return schemaName ? `${schemaName}.${tableName}` : tableName;
    };
    async function* generateAllForAttribute(uid, fieldName) {
      const metadata = strapi2.db.metadata.get(uid);
      if (!metadata) {
        throw new Error(`No metadata found for ${uid}`);
      }
      const attributes = filterValidRelationalAttributes(metadata.attributes);
      if (!(fieldName in attributes)) {
        throw new Error(`${fieldName} is not a valid relational attribute name`);
      }
      const attribute = attributes[fieldName];
      const kind = getLinkKind(attribute, uid);
      const { relation, target } = attribute;
      if (attribute.joinColumn) {
        const joinColumnName = attribute.joinColumn.name;
        const qb = connection.queryBuilder().select("id", joinColumnName).from(addSchema(metadata.tableName));
        if (trx) {
          qb.transacting(trx);
        }
        const entries = await qb;
        for (const entry of entries) {
          const ref = entry[joinColumnName];
          if (ref !== null) {
            yield {
              kind,
              relation,
              left: { type: uid, ref: entry.id, field: fieldName },
              right: { type: target, ref }
            };
          }
        }
      }
      if (attribute.joinTable) {
        const {
          name,
          joinColumn,
          inverseJoinColumn,
          orderColumnName,
          morphColumn,
          inverseOrderColumnName
        } = attribute.joinTable;
        const qb = connection.queryBuilder().from(addSchema(name));
        const columns = {
          left: { ref: null },
          right: { ref: null }
        };
        const left = { type: uid, field: fieldName };
        const right = {};
        if (kind === "relation.basic" || kind === "relation.circular") {
          right.type = attribute.target;
          right.field = attribute.inversedBy;
          columns.left.ref = joinColumn.name;
          columns.right.ref = inverseJoinColumn.name;
          if (orderColumnName) {
            columns.left.order = orderColumnName;
          }
          if (inverseOrderColumnName) {
            columns.right.order = inverseOrderColumnName;
          }
        }
        if (kind === "relation.morph") {
          columns.left.ref = joinColumn.name;
          columns.right.ref = morphColumn.idColumn.name;
          columns.right.type = morphColumn.typeColumn.name;
          columns.right.field = "field";
          columns.right.order = "order";
        }
        const validColumns = [
          // Left
          columns.left.ref,
          columns.left.order,
          // Right
          columns.right.ref,
          columns.right.type,
          columns.right.field,
          columns.right.order
        ].filter((column) => !isNil(column));
        qb.select(validColumns);
        if (trx) {
          qb.transacting(trx);
        }
        const entries = await qb;
        for (const entry of entries) {
          if (columns.left.ref) {
            left.ref = entry[columns.left.ref];
          }
          if (columns.right.ref) {
            right.ref = entry[columns.right.ref];
          }
          if (columns.left.order) {
            left.pos = entry[columns.left.order];
          }
          if (columns.right.order) {
            right.pos = entry[columns.right.order];
          }
          if (columns.right.type) {
            right.type = entry[columns.right.type];
          }
          if (columns.right.field) {
            right.field = entry[columns.right.field];
          }
          const link2 = {
            kind,
            relation,
            left: clone(left),
            right: clone(right)
          };
          yield link2;
        }
      }
      if (attribute.morphColumn) {
        const { typeColumn, idColumn } = attribute.morphColumn;
        const qb = connection.queryBuilder().select("id", typeColumn.name, idColumn.name).from(addSchema(metadata.tableName)).whereNotNull(typeColumn.name).whereNotNull(idColumn.name);
        if (trx) {
          qb.transacting(trx);
        }
        const entries = await qb;
        for (const entry of entries) {
          const ref = entry[idColumn.name];
          yield {
            kind,
            relation,
            left: { type: uid, ref: entry.id, field: fieldName },
            right: { type: entry[typeColumn.name], ref }
          };
        }
      }
    }
    async function* generateAll(uid) {
      const metadata = strapi2.db.metadata.get(uid);
      if (!metadata) {
        throw new Error(`No metadata found for ${uid}`);
      }
      const attributes = filterValidRelationalAttributes(metadata.attributes);
      for (const fieldName of Object.keys(attributes)) {
        for await (const link2 of generateAllForAttribute(uid, fieldName)) {
          yield link2;
        }
      }
    }
    const insert = async (link2) => {
      const { kind, left, right } = link2;
      const metadata = strapi2.db.metadata.get(left.type);
      const attribute = metadata.attributes[left.field];
      const payload = {};
      if (!attribute) {
        return;
      }
      if (attribute.type !== "relation") {
        throw new Error(`Attribute ${left.field} is not a relation`);
      }
      if ("joinColumn" in attribute && attribute.joinColumn) {
        const joinColumnName = attribute.joinColumn.name;
        const qb = connection(addSchema(metadata.tableName)).where("id", left.ref).update({ [joinColumnName]: right.ref });
        if (trx) {
          qb.transacting(trx);
        }
        await qb;
      }
      if ("joinTable" in attribute && attribute.joinTable) {
        const { joinTable } = attribute;
        if (joinTable.joinColumn) {
          Object.assign(payload, { [joinTable.joinColumn.name]: left.ref });
        }
        const assignInverseColumn = () => {
          if ("inverseJoinColumn" in joinTable && joinTable.inverseJoinColumn) {
            Object.assign(payload, {
              [joinTable.inverseJoinColumn.name]: right.ref
            });
          }
        };
        const assignOrderColumns = () => {
          if ("orderColumnName" in joinTable && joinTable.orderColumnName) {
            Object.assign(payload, { [joinTable.orderColumnName]: left.pos ?? null });
          }
          if ("inverseOrderColumnName" in joinTable && joinTable.inverseOrderColumnName) {
            Object.assign(payload, { [joinTable.inverseOrderColumnName]: right.pos ?? null });
          }
        };
        const assignMorphColumns = () => {
          if ("morphColumn" in joinTable && joinTable.morphColumn) {
            const { idColumn, typeColumn } = joinTable.morphColumn ?? {};
            if (idColumn) {
              Object.assign(payload, { [idColumn.name]: right.ref });
            }
            if (typeColumn) {
              Object.assign(payload, { [typeColumn.name]: right.type });
            }
            Object.assign(payload, { order: right.pos ?? null, field: right.field ?? null });
          }
        };
        if (kind === "relation.basic" || kind === "relation.circular") {
          assignInverseColumn();
        }
        if (kind === "relation.morph") {
          assignMorphColumns();
        }
        assignOrderColumns();
        const qb = connection.insert(payload).into(addSchema(joinTable.name));
        if (trx) {
          await trx.transaction(async (nestedTrx) => {
            await qb.transacting(nestedTrx);
          });
        }
      }
      if ("morphColumn" in attribute && attribute.morphColumn) {
        const { morphColumn } = attribute;
        const qb = connection(addSchema(metadata.tableName)).where("id", left.ref).update({
          [morphColumn.idColumn.name]: right.ref,
          [morphColumn.typeColumn.name]: right.type
        });
        if (trx) {
          qb.transacting(trx);
        }
        await qb;
      }
    };
    return { generateAll, generateAllForAttribute, insert };
  };
  return query;
};
const filterValidRelationalAttributes = (attributes) => {
  const isOwner = (attribute) => {
    return attribute.owner || !attribute.mappedBy && !attribute.morphBy;
  };
  const isComponentLike = (attribute) => attribute.joinTable?.name.endsWith("_cmps");
  return Object.entries(attributes).filter(([, attribute]) => {
    return attribute.type === "relation" && isOwner(attribute) && !isComponentLike(attribute);
  }).reduce((acc, [key, attribute]) => ({ ...acc, [key]: attribute }), {});
};
const getLinkKind = (attribute, uid) => {
  if (attribute.relation.startsWith("morph")) {
    return "relation.morph";
  }
  if (attribute.target === uid) {
    return "relation.circular";
  }
  return "relation.basic";
};
const link = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createLinkQuery,
  filterValidRelationalAttributes
}, Symbol.toStringTag, { value: "Module" }));
const index$6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  entity,
  link
}, Symbol.toStringTag, { value: "Module" }));
const createEntitiesWriteStream = (options) => {
  const { strapi: strapi2, updateMappingTable, transaction: transaction2 } = options;
  const query = createEntityQuery(strapi2);
  return new Writable({
    objectMode: true,
    async write(entity2, _encoding, callback) {
      await transaction2?.attach(async () => {
        const { type, id, data } = entity2;
        const { create, getDeepPopulateComponentLikeQuery } = query(type);
        const contentType = strapi2.getModel(type);
        try {
          const created = await create({
            data,
            populate: getDeepPopulateComponentLikeQuery(contentType, { select: "id" }),
            select: "id"
          });
          const diffs = diff(data, created);
          updateMappingTable(type, id, created.id);
          diffs.forEach((diff2) => {
            if (diff2.kind === "modified" && last(diff2.path) === "id" && "kind" in contentType) {
              const target = resolveComponentUID({ paths: diff2.path, data, contentType, strapi: strapi2 });
              if (!target) {
                return;
              }
              const [oldID, newID] = diff2.values;
              updateMappingTable(target, oldID, newID);
            }
          });
        } catch (e) {
          if (e instanceof Error) {
            return callback(e);
          }
          return callback(new ProviderTransferError(`Failed to create "${type}" (${id})`));
        }
        return callback(null);
      });
    }
  });
};
const omitInvalidCreationAttributes = omit(["id"]);
const restoreCoreStore = async (strapi2, values) => {
  const data = omitInvalidCreationAttributes(values);
  return strapi2.db.query("strapi::core-store").create({
    data: {
      ...data,
      value: JSON.stringify(data.value)
    }
  });
};
const restoreWebhooks = async (strapi2, values) => {
  const data = omitInvalidCreationAttributes(values);
  return strapi2.db.query("strapi::webhook").create({ data });
};
const restoreConfigs = async (strapi2, config) => {
  if (config.type === "core-store") {
    return restoreCoreStore(strapi2, config.value);
  }
  if (config.type === "webhook") {
    return restoreWebhooks(strapi2, config.value);
  }
};
const createConfigurationWriteStream = async (strapi2, transaction2) => {
  return new Writable({
    objectMode: true,
    async write(config, _encoding, callback) {
      await transaction2?.attach(async () => {
        try {
          await restoreConfigs(strapi2, config);
        } catch (error) {
          return callback(
            new ProviderTransferError(
              `Failed to import ${chalk.yellowBright(config.type)} (${chalk.greenBright(
                config.value.id
              )}`
            )
          );
        }
        callback();
      });
    }
  });
};
const isErrorWithCode = (error) => {
  return error && typeof error.code === "string";
};
const isForeignKeyConstraintError = (e) => {
  const MYSQL_FK_ERROR_CODES = ["1452", "1557", "1216", "1217", "1451"];
  const POSTGRES_FK_ERROR_CODE = "23503";
  const SQLITE_FK_ERROR_CODE = "SQLITE_CONSTRAINT_FOREIGNKEY";
  if (isErrorWithCode(e) && e.code) {
    return [SQLITE_FK_ERROR_CODE, POSTGRES_FK_ERROR_CODE, ...MYSQL_FK_ERROR_CODES].includes(e.code);
  }
  return e.message.toLowerCase().includes("foreign key constraint");
};
const createLinksWriteStream = (mapID, strapi2, transaction2, onWarning) => {
  return new Writable({
    objectMode: true,
    async write(link2, _encoding, callback) {
      await transaction2?.attach(async (trx) => {
        const { left, right } = link2;
        const query = createLinkQuery(strapi2, trx);
        const originalLeftRef = left.ref;
        const originalRightRef = right.ref;
        left.ref = mapID(left.type, originalLeftRef) ?? originalLeftRef;
        right.ref = mapID(right.type, originalRightRef) ?? originalRightRef;
        try {
          await query().insert(link2);
        } catch (e) {
          if (e instanceof Error) {
            if (isForeignKeyConstraintError(e)) {
              onWarning?.(
                `Skipping link ${left.type}:${originalLeftRef} -> ${right.type}:${originalRightRef} due to a foreign key constraint.`
              );
              return callback(null);
            }
            return callback(e);
          }
          return callback(
            new ProviderTransferError(
              `An error happened while trying to import a ${left.type} link.`
            )
          );
        }
        callback(null);
      });
    }
  });
};
const deleteRecords = async (strapi2, options) => {
  const entities = await deleteEntitiesRecords(strapi2, options);
  const configuration = await deleteConfigurationRecords(strapi2, options);
  return {
    count: entities.count + configuration.count,
    entities,
    configuration
  };
};
const deleteEntitiesRecords = async (strapi2, options = {}) => {
  const { entities } = options;
  const models = strapi2.get("models").get();
  const contentTypes2 = Object.values(strapi2.contentTypes);
  const contentTypesToClear = contentTypes2.filter((contentType) => {
    let removeThisContentType = true;
    if (entities?.include) {
      removeThisContentType = entities.include.includes(contentType.uid);
    }
    if (entities?.exclude && entities.exclude.includes(contentType.uid)) {
      removeThisContentType = false;
    }
    if (entities?.filters) {
      removeThisContentType = entities.filters.every((filter2) => filter2(contentType));
    }
    return removeThisContentType;
  }).map((contentType) => contentType.uid);
  const modelsToClear = models.filter((model) => {
    if (contentTypesToClear.includes(model.uid)) {
      return false;
    }
    let removeThisModel = true;
    if (entities?.include) {
      removeThisModel = entities.include.includes(model.uid);
    }
    if (entities?.exclude && entities.exclude.includes(model.uid)) {
      removeThisModel = false;
    }
    return removeThisModel;
  }).map((model) => model.uid);
  const [results, updateResults] = useResults([...contentTypesToClear, ...modelsToClear]);
  const contentTypeQuery = createEntityQuery(strapi2);
  const contentTypePromises = contentTypesToClear.map(async (uid) => {
    const result = await contentTypeQuery(uid).deleteMany(entities?.params);
    if (result) {
      updateResults(result.count || 0, uid);
    }
  });
  const modelsPromises = modelsToClear.map(async (uid) => {
    const result = await strapi2.db.query(uid).deleteMany({});
    if (result) {
      updateResults(result.count || 0, uid);
    }
  });
  await Promise.all([...contentTypePromises, ...modelsPromises]);
  return results;
};
const deleteConfigurationRecords = async (strapi2, options = {}) => {
  const { coreStore = true, webhook = true } = options?.configuration ?? {};
  const models = [];
  if (coreStore) {
    models.push("strapi::core-store");
  }
  if (webhook) {
    models.push("strapi::webhook");
  }
  const [results, updateResults] = useResults(models);
  const deletePromises = models.map(async (uid) => {
    const result = await strapi2.db.query(uid).deleteMany({});
    if (result) {
      updateResults(result.count, uid);
    }
  });
  await Promise.all(deletePromises);
  return results;
};
const useResults = (keys) => {
  const results = {
    count: 0,
    aggregate: keys.reduce((acc, key) => ({ ...acc, [key]: { count: 0 } }), {})
  };
  const update = (count, key) => {
    if (key) {
      if (!(key in results.aggregate)) {
        throw new ProviderTransferError(`Unknown key "${key}" provided in results update`);
      }
      results.aggregate[key].count += count;
    }
    results.count += count;
  };
  return [results, update];
};
const assertValidStrapi = (strapi2, msg = "") => {
  if (!strapi2) {
    throw new ProviderInitializationError(`${msg}. Strapi instance not found.`);
  }
};
const VALID_CONFLICT_STRATEGIES = ["restore"];
const DEFAULT_CONFLICT_STRATEGY = "restore";
class LocalStrapiDestinationProvider {
  name = "destination::local-strapi";
  type = "destination";
  options;
  strapi;
  transaction;
  uploadsBackupDirectoryName;
  onWarning;
  #diagnostics;
  /**
   * The entities mapper is used to map old entities to their new IDs
   */
  #entitiesMapper;
  constructor(options) {
    this.options = options;
    this.#entitiesMapper = {};
    this.uploadsBackupDirectoryName = `uploads_backup_${Date.now()}`;
  }
  async bootstrap(diagnostics) {
    this.#diagnostics = diagnostics;
    this.#validateOptions();
    this.strapi = await this.options.getStrapi();
    if (!this.strapi) {
      throw new ProviderInitializationError("Could not access local strapi");
    }
    this.transaction = createTransaction(this.strapi);
  }
  // TODO: either move this to restore strategy, or restore strategy should given access to these instead of repeating the logic possibly in a different way
  #areAssetsIncluded = () => {
    return this.options.restore?.assets;
  };
  #isContentTypeIncluded = (type) => {
    const notIncluded = this.options.restore?.entities?.include && !this.options.restore?.entities?.include?.includes(type);
    const excluded = this.options.restore?.entities?.exclude && this.options.restore?.entities.exclude.includes(type);
    return !excluded && !notIncluded;
  };
  #reportInfo(message) {
    this.#diagnostics?.report({
      details: {
        createdAt: /* @__PURE__ */ new Date(),
        message,
        origin: "local-destination-provider"
      },
      kind: "info"
    });
  }
  async close() {
    const { autoDestroy } = this.options;
    this.transaction?.end();
    if (autoDestroy === void 0 || autoDestroy === true) {
      await this.strapi?.destroy();
    }
  }
  #validateOptions() {
    this.#reportInfo("validating options");
    if (!VALID_CONFLICT_STRATEGIES.includes(this.options.strategy)) {
      throw new ProviderValidationError(`Invalid strategy ${this.options.strategy}`, {
        check: "strategy",
        strategy: this.options.strategy,
        validStrategies: VALID_CONFLICT_STRATEGIES
      });
    }
    if (this.options.strategy === "restore" && !this.options.restore) {
      throw new ProviderValidationError("Missing restore options");
    }
  }
  async #deleteFromRestoreOptions() {
    assertValidStrapi(this.strapi);
    if (!this.options.restore) {
      throw new ProviderValidationError("Missing restore options");
    }
    this.#reportInfo("deleting record ");
    return deleteRecords(this.strapi, this.options.restore);
  }
  async #deleteAllAssets(trx) {
    assertValidStrapi(this.strapi);
    this.#reportInfo("deleting all assets");
    if (!this.#areAssetsIncluded()) {
      return;
    }
    const stream2 = this.strapi.db.queryBuilder("plugin::upload.file").select("*").transacting(trx).stream();
    for await (const file of stream2) {
      await this.strapi.plugin("upload").provider.delete(file);
      if (file.formats) {
        for (const fileFormat of Object.values(file.formats)) {
          await this.strapi.plugin("upload").provider.delete(fileFormat);
        }
      }
    }
    this.#reportInfo("deleted all assets");
  }
  async rollback() {
    this.#reportInfo("Rolling back transaction");
    await this.transaction?.rollback();
    this.#reportInfo("Rolled back transaction");
  }
  async beforeTransfer() {
    if (!this.strapi) {
      throw new Error("Strapi instance not found");
    }
    await this.transaction?.attach(async (trx) => {
      try {
        if (this.options.strategy === "restore") {
          await this.#handleAssetsBackup();
          await this.#deleteAllAssets(trx);
          await this.#deleteFromRestoreOptions();
        }
      } catch (error) {
        throw new Error(`restore failed ${error}`);
      }
    });
  }
  getMetadata() {
    this.#reportInfo("getting metadata");
    assertValidStrapi(this.strapi, "Not able to get Schemas");
    const strapiVersion = this.strapi.config.get("info.strapi");
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    return {
      createdAt,
      strapi: {
        version: strapiVersion
      }
    };
  }
  getSchemas() {
    this.#reportInfo("getting schema");
    assertValidStrapi(this.strapi, "Not able to get Schemas");
    const schemas = schemasToValidJSON({
      ...this.strapi.contentTypes,
      ...this.strapi.components
    });
    return mapSchemasValues(schemas);
  }
  createEntitiesWriteStream() {
    assertValidStrapi(this.strapi, "Not able to import entities");
    this.#reportInfo("creating entities stream");
    const { strategy } = this.options;
    const updateMappingTable = (type, oldID, newID) => {
      if (!this.#entitiesMapper[type]) {
        this.#entitiesMapper[type] = {};
      }
      Object.assign(this.#entitiesMapper[type], { [oldID]: newID });
    };
    if (strategy === "restore") {
      return createEntitiesWriteStream({
        strapi: this.strapi,
        updateMappingTable,
        transaction: this.transaction
      });
    }
    throw new ProviderValidationError(`Invalid strategy ${this.options.strategy}`, {
      check: "strategy",
      strategy: this.options.strategy,
      validStrategies: VALID_CONFLICT_STRATEGIES
    });
  }
  async #handleAssetsBackup() {
    assertValidStrapi(this.strapi, "Not able to create the assets backup");
    if (!this.#areAssetsIncluded()) {
      return;
    }
    if (this.strapi.config.get("plugin::upload").provider === "local") {
      this.#reportInfo("creating assets backup directory");
      const assetsDirectory = path.join(this.strapi.dirs.static.public, "uploads");
      const backupDirectory = path.join(
        this.strapi.dirs.static.public,
        this.uploadsBackupDirectoryName
      );
      try {
        await fse.access(
          assetsDirectory,
          // eslint-disable-next-line no-bitwise
          fse.constants.W_OK | fse.constants.R_OK | fse.constants.F_OK
        );
        await fse.access(path.join(assetsDirectory, ".."), fse.constants.W_OK | fse.constants.R_OK);
        await fse.move(assetsDirectory, backupDirectory);
        await fse.mkdir(assetsDirectory);
        await fse.outputFile(path.join(assetsDirectory, ".gitkeep"), "");
        this.#reportInfo(`created assets backup directory ${backupDirectory}`);
      } catch (err) {
        throw new ProviderTransferError(
          "The backup folder for the assets could not be created inside the public folder. Please ensure Strapi has write permissions on the public directory",
          {
            code: "ASSETS_DIRECTORY_ERR"
          }
        );
      }
      return backupDirectory;
    }
  }
  async #removeAssetsBackup() {
    assertValidStrapi(this.strapi, "Not able to remove Assets");
    if (!this.#areAssetsIncluded()) {
      return;
    }
    if (this.strapi.config.get("plugin::upload").provider === "local") {
      this.#reportInfo("removing assets backup");
      assertValidStrapi(this.strapi);
      const backupDirectory = path.join(
        this.strapi.dirs.static.public,
        this.uploadsBackupDirectoryName
      );
      await fse.rm(backupDirectory, { recursive: true, force: true });
      this.#reportInfo("successfully removed assets backup");
    }
  }
  // TODO: Move this logic to the restore strategy
  async createAssetsWriteStream() {
    assertValidStrapi(this.strapi, "Not able to stream Assets");
    this.#reportInfo("creating assets write stream");
    if (!this.#areAssetsIncluded()) {
      throw new ProviderTransferError(
        "Attempting to transfer assets when `assets` is not set in restore options"
      );
    }
    const removeAssetsBackup = this.#removeAssetsBackup.bind(this);
    const strapi2 = this.strapi;
    const transaction2 = this.transaction;
    const fileEntitiesMapper = this.#entitiesMapper["plugin::upload.file"];
    const restoreMediaEntitiesContent = this.#isContentTypeIncluded("plugin::upload.file");
    return new Writable({
      objectMode: true,
      async final(next) {
        await removeAssetsBackup();
        next();
      },
      async write(chunk, _encoding, callback) {
        await transaction2?.attach(async () => {
          const uploadData = {
            ...chunk.metadata,
            stream: Readable.from(chunk.stream),
            buffer: chunk?.buffer
          };
          const provider = strapi2.config.get("plugin::upload").provider;
          const fileId = fileEntitiesMapper?.[uploadData.id];
          if (!fileId) {
            callback(new Error(`File ID not found for ID: ${uploadData.id}`));
          }
          try {
            await strapi2.plugin("upload").provider.uploadStream(uploadData);
            if (!restoreMediaEntitiesContent) {
              return callback();
            }
            if (uploadData?.type) {
              const entry2 = await strapi2.db.query("plugin::upload.file").findOne({
                where: { id: fileId }
              });
              if (!entry2) {
                throw new Error("file not found");
              }
              const specificFormat = entry2?.formats?.[uploadData.type];
              if (specificFormat) {
                specificFormat.url = uploadData.url;
              }
              await strapi2.db.query("plugin::upload.file").update({
                where: { id: entry2.id },
                data: {
                  formats: entry2.formats,
                  provider
                }
              });
              return callback();
            }
            const entry = await strapi2.db.query("plugin::upload.file").findOne({
              where: { id: fileId }
            });
            if (!entry) {
              throw new Error("file not found");
            }
            entry.url = uploadData.url;
            await strapi2.db.query("plugin::upload.file").update({
              where: { id: entry.id },
              data: {
                url: entry.url,
                provider
              }
            });
            callback();
          } catch (error) {
            callback(new Error(`Error while uploading asset ${chunk.filename} ${error}`));
          }
        });
      }
    });
  }
  async createConfigurationWriteStream() {
    assertValidStrapi(this.strapi, "Not able to stream Configurations");
    this.#reportInfo("creating configuration write stream");
    const { strategy } = this.options;
    if (strategy === "restore") {
      return createConfigurationWriteStream(this.strapi, this.transaction);
    }
    throw new ProviderValidationError(`Invalid strategy ${strategy}`, {
      check: "strategy",
      strategy,
      validStrategies: VALID_CONFLICT_STRATEGIES
    });
  }
  async createLinksWriteStream() {
    this.#reportInfo("creating links write stream");
    if (!this.strapi) {
      throw new Error("Not able to stream links. Strapi instance not found");
    }
    const { strategy } = this.options;
    const mapID = (uid, id) => this.#entitiesMapper[uid]?.[id];
    if (strategy === "restore") {
      return createLinksWriteStream(mapID, this.strapi, this.transaction, this.onWarning);
    }
    throw new ProviderValidationError(`Invalid strategy ${strategy}`, {
      check: "strategy",
      strategy,
      validStrategies: VALID_CONFLICT_STRATEGIES
    });
  }
}
const createLocalStrapiDestinationProvider = (options) => {
  return new LocalStrapiDestinationProvider(options);
};
const createEntitiesStream = (strapi2) => {
  const contentTypes2 = Object.values(strapi2.contentTypes);
  async function* contentTypeStreamGenerator() {
    for (const contentType of contentTypes2) {
      const query = createEntityQuery(strapi2).call(null, contentType.uid);
      const stream2 = strapi2.db.queryBuilder(contentType.uid).select("*").populate(query.deepPopulateComponentLikeQuery).stream();
      yield { contentType, stream: stream2 };
    }
  }
  return Readable.from(
    async function* entitiesGenerator() {
      for await (const { stream: stream2, contentType } of contentTypeStreamGenerator()) {
        try {
          for await (const entity2 of stream2) {
            yield { entity: entity2, contentType };
          }
        } catch {
        } finally {
          stream2.destroy();
        }
      }
    }()
  );
};
const createEntitiesTransformStream = () => {
  return new Transform({
    objectMode: true,
    transform(data, _encoding, callback) {
      const { entity: entity2, contentType } = data;
      const { id, ...attributes } = entity2;
      callback(null, {
        type: contentType.uid,
        id,
        data: attributes
      });
    }
  });
};
const createLinksStream = (strapi2) => {
  const uids = [...Object.keys(strapi2.contentTypes), ...Object.keys(strapi2.components)];
  return Readable.from(
    async function* linkGenerator() {
      const query = createLinkQuery(strapi2);
      for (const uid of uids) {
        const generator = query().generateAll(uid);
        for await (const link2 of generator) {
          yield link2;
        }
      }
    }()
  );
};
const createConfigurationStream = (strapi2) => {
  return Readable.from(
    async function* configurationGenerator() {
      const coreStoreStream = chain([
        strapi2.db.queryBuilder("strapi::core-store").stream(),
        (data) => set("value", JSON.parse(data.value), data),
        wrapConfigurationItem("core-store")
      ]);
      const webhooksStream = chain([
        strapi2.db.queryBuilder("strapi::webhook").stream(),
        wrapConfigurationItem("webhook")
      ]);
      const streams = [coreStoreStream, webhooksStream];
      for (const stream2 of streams) {
        for await (const item of stream2) {
          yield item;
        }
      }
    }()
  );
};
const wrapConfigurationItem = (type) => (value) => ({
  type,
  value
});
function getFileStream(filepath, strapi2, isLocal = false) {
  if (isLocal) {
    return createReadStream(filepath);
  }
  const readableStream = new PassThrough();
  strapi2.fetch(filepath).then((res) => {
    if (res.status !== 200) {
      readableStream.emit("error", new Error(`Request failed with status code ${res.status}`));
      return;
    }
    if (res.body) {
      Readable.fromWeb(new webStream.ReadableStream(res.body)).pipe(readableStream);
    } else {
      readableStream.emit("error", new Error("Empty data found for file"));
    }
  }).catch((error) => {
    readableStream.emit("error", error);
  });
  return readableStream;
}
function getFileStats(filepath, strapi2, isLocal = false) {
  if (isLocal) {
    return stat(filepath);
  }
  return new Promise((resolve, reject2) => {
    strapi2.fetch(filepath).then((res) => {
      if (res.status !== 200) {
        reject2(new Error(`Request failed with status code ${res.status}`));
        return;
      }
      const contentLength = res.headers.get("content-length");
      const stats = {
        size: contentLength ? parseInt(contentLength, 10) : 0
      };
      resolve(stats);
    }).catch((error) => {
      reject2(error);
    });
  });
}
async function signFile(file) {
  const { provider } = strapi.plugins.upload;
  const { provider: providerName } = strapi.config.get("plugin.upload");
  const isPrivate = await provider.isPrivate();
  if (file?.provider === providerName && isPrivate) {
    const signUrl = async (file2) => {
      const signedUrl = await provider.getSignedUrl(file2);
      file2.url = signedUrl.url;
    };
    await signUrl(file);
    if (file.formats) {
      for (const format of Object.keys(file.formats)) {
        await signUrl(file.formats[format]);
      }
    }
  }
}
const createAssetsStream = (strapi2) => {
  const generator = async function* () {
    const stream2 = strapi2.db.queryBuilder("plugin::upload.file").select("*").stream();
    for await (const file of stream2) {
      const isLocalProvider = file.provider === "local";
      if (!isLocalProvider) {
        await signFile(file);
      }
      const filepath = isLocalProvider ? join(strapi2.dirs.static.public, file.url) : file.url;
      const stats = await getFileStats(filepath, strapi2, isLocalProvider);
      const stream22 = getFileStream(filepath, strapi2, isLocalProvider);
      yield {
        metadata: file,
        filepath,
        filename: file.hash + file.ext,
        stream: stream22,
        stats: { size: stats.size }
      };
      if (file.formats) {
        for (const format of Object.keys(file.formats)) {
          const fileFormat = file.formats[format];
          const fileFormatFilepath = isLocalProvider ? join(strapi2.dirs.static.public, fileFormat.url) : fileFormat.url;
          const fileFormatStats = await getFileStats(fileFormatFilepath, strapi2, isLocalProvider);
          const fileFormatStream = getFileStream(fileFormatFilepath, strapi2, isLocalProvider);
          const metadata = { ...fileFormat, type: format, id: file.id, mainHash: file.hash };
          yield {
            metadata,
            filepath: fileFormatFilepath,
            filename: fileFormat.hash + fileFormat.ext,
            stream: fileFormatStream,
            stats: { size: fileFormatStats.size }
          };
        }
      }
    }
  };
  return Duplex.from(generator());
};
const createLocalStrapiSourceProvider = (options) => {
  return new LocalStrapiSourceProvider(options);
};
class LocalStrapiSourceProvider {
  name = "source::local-strapi";
  type = "source";
  options;
  strapi;
  #diagnostics;
  constructor(options) {
    this.options = options;
  }
  async bootstrap(diagnostics) {
    this.#diagnostics = diagnostics;
    this.strapi = await this.options.getStrapi();
  }
  #reportInfo(message) {
    this.#diagnostics?.report({
      details: {
        createdAt: /* @__PURE__ */ new Date(),
        message,
        origin: "local-source-provider"
      },
      kind: "info"
    });
  }
  async close() {
    const { autoDestroy } = this.options;
    if (autoDestroy === void 0 || autoDestroy === true) {
      await this.strapi?.destroy();
    }
  }
  getMetadata() {
    this.#reportInfo("getting metadata");
    const strapiVersion = strapi.config.get("info.strapi");
    const createdAt = (/* @__PURE__ */ new Date()).toISOString();
    return {
      createdAt,
      strapi: {
        version: strapiVersion
      }
    };
  }
  async createEntitiesReadStream() {
    assertValidStrapi(this.strapi, "Not able to stream entities");
    this.#reportInfo("creating entities read stream");
    return chain([
      // Entities stream
      createEntitiesStream(this.strapi),
      // Transform stream
      createEntitiesTransformStream()
    ]);
  }
  createLinksReadStream() {
    assertValidStrapi(this.strapi, "Not able to stream links");
    this.#reportInfo("creating links read stream");
    return createLinksStream(this.strapi);
  }
  createConfigurationReadStream() {
    assertValidStrapi(this.strapi, "Not able to stream configuration");
    this.#reportInfo("creating configuration read stream");
    return createConfigurationStream(this.strapi);
  }
  getSchemas() {
    assertValidStrapi(this.strapi, "Not able to get Schemas");
    this.#reportInfo("getting schemas");
    const schemas = schemasToValidJSON({
      ...this.strapi.contentTypes,
      ...this.strapi.components
    });
    return mapSchemasValues(schemas);
  }
  createSchemasReadStream() {
    return Readable.from(Object.values(this.getSchemas()));
  }
  createAssetsReadStream() {
    assertValidStrapi(this.strapi, "Not able to stream assets");
    this.#reportInfo("creating assets read stream");
    return createAssetsStream(this.strapi);
  }
}
const createDispatcher = (ws, retryMessageOptions = {
  retryMessageMaxRetries: 5,
  retryMessageTimeout: 3e4
}, reportInfo) => {
  const state = {};
  const dispatch = async (message, options = {}) => {
    if (!ws) {
      throw new Error("No websocket connection found");
    }
    return new Promise((resolve, reject2) => {
      const uuid = randomUUID();
      const payload = { ...message, uuid };
      let numberOfTimesMessageWasSent = 0;
      if (options.attachTransfer) {
        Object.assign(payload, { transferID: state.transfer?.id });
      }
      if (message.type === "command") {
        reportInfo?.(
          `dispatching message command:${message.command} uuid:${uuid} sent:${numberOfTimesMessageWasSent}`
        );
      } else if (message.type === "transfer") {
        const messageToSend = message;
        reportInfo?.(
          `dispatching message action:${messageToSend.action} ${messageToSend.kind === "step" ? `step:${messageToSend.step}` : ""} uuid:${uuid} sent:${numberOfTimesMessageWasSent}`
        );
      }
      const stringifiedPayload = JSON.stringify(payload);
      ws.send(stringifiedPayload, (error) => {
        if (error) {
          reject2(error);
        }
      });
      const { retryMessageMaxRetries, retryMessageTimeout } = retryMessageOptions;
      const sendPeriodically = () => {
        if (numberOfTimesMessageWasSent <= retryMessageMaxRetries) {
          numberOfTimesMessageWasSent += 1;
          ws.send(stringifiedPayload, (error) => {
            if (error) {
              reject2(error);
            }
          });
        } else {
          reject2(new ProviderError("error", "Request timed out"));
        }
      };
      const interval = setInterval(sendPeriodically, retryMessageTimeout);
      const onResponse = (raw) => {
        const response = JSON.parse(raw.toString());
        if (message.type === "command") {
          reportInfo?.(
            `received response to message command: ${message.command} uuid: ${uuid} sent: ${numberOfTimesMessageWasSent}`
          );
        } else if (message.type === "transfer") {
          const messageToSend = message;
          reportInfo?.(
            `received response to message action:${messageToSend.action} ${messageToSend.kind === "step" ? `step:${messageToSend.step}` : ""} uuid:${uuid} sent:${numberOfTimesMessageWasSent}`
          );
        }
        if (response.uuid === uuid) {
          clearInterval(interval);
          if (response.error) {
            const message2 = response.error.message;
            const details = response.error.details?.details;
            const step = response.error.details?.step;
            let error = new ProviderError("error", message2, details);
            if (step === "transfer") {
              error = new ProviderTransferError(message2, details);
            } else if (step === "validation") {
              error = new ProviderValidationError(message2, details);
            } else if (step === "initialization") {
              error = new ProviderInitializationError(message2);
            }
            return reject2(error);
          }
          resolve(response.data ?? null);
        } else {
          ws.once("message", onResponse);
        }
      };
      ws.once("message", onResponse);
    });
  };
  const dispatchCommand = (payload) => {
    return dispatch({ type: "command", ...payload });
  };
  const dispatchTransferAction = async (action) => {
    const payload = { type: "transfer", kind: "action", action };
    return dispatch(payload, { attachTransfer: true }) ?? Promise.resolve(null);
  };
  const dispatchTransferStep = async (payload) => {
    const message = {
      type: "transfer",
      kind: "step",
      ...payload
    };
    return dispatch(message, { attachTransfer: true }) ?? Promise.resolve(null);
  };
  const setTransferProperties = (properties) => {
    state.transfer = { ...properties };
  };
  return {
    get transferID() {
      return state.transfer?.id;
    },
    get transferKind() {
      return state.transfer?.kind;
    },
    setTransferProperties,
    dispatch,
    dispatchCommand,
    dispatchTransferAction,
    dispatchTransferStep
  };
};
const connectToWebsocket = (address, options, diagnostics) => {
  return new Promise((resolve, reject2) => {
    const server = new WebSocket(address, options);
    server.once("open", () => {
      resolve(server);
    });
    server.on("unexpected-response", (_req, res) => {
      if (res.statusCode === 401) {
        return reject2(
          new ProviderInitializationError(
            "Failed to initialize the connection: Authentication Error"
          )
        );
      }
      if (res.statusCode === 403) {
        return reject2(
          new ProviderInitializationError(
            "Failed to initialize the connection: Authorization Error"
          )
        );
      }
      if (res.statusCode === 404) {
        return reject2(
          new ProviderInitializationError(
            "Failed to initialize the connection: Data transfer is not enabled on the remote host"
          )
        );
      }
      return reject2(
        new ProviderInitializationError(
          `Failed to initialize the connection: Unexpected server response ${res.statusCode}`
        )
      );
    });
    server.on("message", (raw) => {
      const response = JSON.parse(raw.toString());
      if (response.diagnostic) {
        diagnostics?.report({
          ...response.diagnostic
        });
      }
    });
    server.once("error", (err) => {
      reject2(
        new ProviderTransferError(err.message, {
          details: {
            error: err.message
          }
        })
      );
    });
  });
};
const trimTrailingSlash = (input) => {
  return input.replace(/\/$/, "");
};
const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
const waitUntil = async (test, interval) => {
  while (!test()) {
    await wait(interval);
  }
  return Promise.resolve();
};
const TRANSFER_PATH = "/transfer/runner";
const TRANSFER_METHODS = ["push", "pull"];
const constants = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TRANSFER_METHODS,
  TRANSFER_PATH
}, Symbol.toStringTag, { value: "Module" }));
const jsonLength = (obj) => Buffer.byteLength(JSON.stringify(obj));
class RemoteStrapiDestinationProvider {
  name = "destination::remote-strapi";
  type = "destination";
  options;
  ws;
  dispatcher;
  transferID;
  stats;
  #diagnostics;
  constructor(options) {
    this.options = options;
    this.ws = null;
    this.dispatcher = null;
    this.transferID = null;
    this.resetStats();
  }
  resetStats() {
    this.stats = {
      assets: { count: 0 },
      entities: { count: 0 },
      links: { count: 0 },
      configuration: { count: 0 }
    };
  }
  async initTransfer() {
    const { strategy, restore } = this.options;
    const query = this.dispatcher?.dispatchCommand({
      command: "init",
      params: { options: { strategy, restore }, transfer: "push" }
    });
    const res = await query;
    if (!res?.transferID) {
      throw new ProviderTransferError("Init failed, invalid response from the server");
    }
    this.resetStats();
    return res.transferID;
  }
  #startStepOnce(stage) {
    return once(() => this.#startStep(stage));
  }
  async #startStep(step) {
    try {
      await this.dispatcher?.dispatchTransferStep({ action: "start", step });
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      if (typeof e === "string") {
        return new ProviderTransferError(e);
      }
      return new ProviderTransferError("Unexpected error");
    }
    this.stats[step] = { count: 0 };
    return null;
  }
  async #endStep(step) {
    try {
      const res = await this.dispatcher?.dispatchTransferStep({
        action: "end",
        step
      });
      return { stats: res?.stats ?? null, error: null };
    } catch (e) {
      if (e instanceof Error) {
        return { stats: null, error: e };
      }
      if (typeof e === "string") {
        return { stats: null, error: new ProviderTransferError(e) };
      }
      return { stats: null, error: new ProviderTransferError("Unexpected error") };
    }
  }
  async #streamStep(step, message) {
    try {
      if (step === "assets") {
        const assetMessage = message;
        this.stats[step].count += assetMessage.filter((data) => data.action === "start").length;
      } else {
        this.stats[step].count += message.length;
      }
      await this.dispatcher?.dispatchTransferStep({ action: "stream", step, data: message });
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      if (typeof e === "string") {
        return new ProviderTransferError(e);
      }
      return new ProviderTransferError("Unexpected error");
    }
    return null;
  }
  #writeStream(step) {
    const batchSize = 1024 * 1024;
    const startTransferOnce = this.#startStepOnce(step);
    let batch = [];
    const batchLength = () => jsonLength(batch);
    return new Writable({
      objectMode: true,
      final: async (callback) => {
        if (batch.length > 0) {
          const streamError = await this.#streamStep(step, batch);
          batch = [];
          if (streamError) {
            return callback(streamError);
          }
        }
        const { error, stats } = await this.#endStep(step);
        const { count } = this.stats[step];
        if (stats && (stats.started !== count || stats.finished !== count)) {
          callback(
            new Error(
              `Data missing: sent ${this.stats[step].count} ${step}, recieved ${stats.started} and saved ${stats.finished} ${step}`
            )
          );
        }
        callback(error);
      },
      write: async (chunk, _encoding, callback) => {
        const startError = await startTransferOnce();
        if (startError) {
          return callback(startError);
        }
        batch.push(chunk);
        if (batchLength() >= batchSize) {
          const streamError = await this.#streamStep(step, batch);
          batch = [];
          if (streamError) {
            return callback(streamError);
          }
        }
        callback();
      }
    });
  }
  #reportInfo(message) {
    this.#diagnostics?.report({
      details: {
        createdAt: /* @__PURE__ */ new Date(),
        message,
        origin: "remote-destination-provider"
      },
      kind: "info"
    });
  }
  async bootstrap(diagnostics) {
    this.#diagnostics = diagnostics;
    const { url, auth } = this.options;
    const validProtocols = ["https:", "http:"];
    let ws;
    if (!validProtocols.includes(url.protocol)) {
      throw new ProviderValidationError(`Invalid protocol "${url.protocol}"`, {
        check: "url",
        details: {
          protocol: url.protocol,
          validProtocols
        }
      });
    }
    const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${wsProtocol}//${url.host}${trimTrailingSlash(
      url.pathname
    )}${TRANSFER_PATH}/push`;
    this.#reportInfo("establishing websocket connection");
    if (!auth) {
      ws = await connectToWebsocket(wsUrl, void 0, this.#diagnostics);
    } else if (auth.type === "token") {
      const headers = { Authorization: `Bearer ${auth.token}` };
      ws = await connectToWebsocket(wsUrl, { headers }, this.#diagnostics);
    } else {
      throw new ProviderValidationError("Auth method not available", {
        check: "auth.type",
        details: {
          auth: auth.type
        }
      });
    }
    this.#reportInfo("established websocket connection");
    this.ws = ws;
    const { retryMessageOptions } = this.options;
    this.#reportInfo("creating dispatcher");
    this.dispatcher = createDispatcher(
      this.ws,
      retryMessageOptions,
      (message) => this.#reportInfo(message)
    );
    this.#reportInfo("created dispatcher");
    this.#reportInfo("initialize transfer");
    this.transferID = await this.initTransfer();
    this.#reportInfo(`initialized transfer ${this.transferID}`);
    this.dispatcher.setTransferProperties({ id: this.transferID, kind: "push" });
    await this.dispatcher.dispatchTransferAction("bootstrap");
  }
  async close() {
    if (this.transferID && this.dispatcher) {
      await this.dispatcher.dispatchTransferAction("close");
      await this.dispatcher.dispatchCommand({
        command: "end",
        params: { transferID: this.transferID }
      });
    }
    await new Promise((resolve) => {
      const { ws } = this;
      if (!ws || ws.CLOSED) {
        resolve();
        return;
      }
      ws.on("close", () => resolve()).close();
    });
  }
  getMetadata() {
    return this.dispatcher?.dispatchTransferAction("getMetadata") ?? null;
  }
  async beforeTransfer() {
    await this.dispatcher?.dispatchTransferAction("beforeTransfer");
  }
  async rollback() {
    await this.dispatcher?.dispatchTransferAction("rollback");
  }
  getSchemas() {
    if (!this.dispatcher) {
      return Promise.resolve(null);
    }
    return this.dispatcher.dispatchTransferAction("getSchemas");
  }
  createEntitiesWriteStream() {
    return this.#writeStream("entities");
  }
  createLinksWriteStream() {
    return this.#writeStream("links");
  }
  createConfigurationWriteStream() {
    return this.#writeStream("configuration");
  }
  createAssetsWriteStream() {
    let batch = [];
    let hasStarted = false;
    const batchSize = 1024 * 1024;
    const batchLength = () => {
      return batch.reduce(
        (acc, chunk) => chunk.action === "stream" ? acc + chunk.data.byteLength : acc,
        0
      );
    };
    const startAssetsTransferOnce = this.#startStepOnce("assets");
    const flush = async () => {
      const streamError = await this.#streamStep("assets", batch);
      batch = [];
      return streamError;
    };
    const safePush = async (chunk) => {
      batch.push(chunk);
      if (batchLength() >= batchSize) {
        const streamError = await flush();
        if (streamError) {
          throw streamError;
        }
      }
    };
    return new Writable({
      objectMode: true,
      final: async (callback) => {
        if (batch.length > 0) {
          await flush();
        }
        if (hasStarted) {
          const { error: endStepError } = await this.#endStep("assets");
          if (endStepError) {
            return callback(endStepError);
          }
        }
        return callback(null);
      },
      async write(asset, _encoding, callback) {
        const startError = await startAssetsTransferOnce();
        if (startError) {
          return callback(startError);
        }
        hasStarted = true;
        const assetID = randomUUID();
        const { filename, filepath, stats, stream: stream2, metadata } = asset;
        try {
          await safePush({
            action: "start",
            assetID,
            data: { filename, filepath, stats, metadata }
          });
          for await (const chunk of stream2) {
            await safePush({ action: "stream", assetID, data: chunk });
          }
          await safePush({ action: "end", assetID });
          callback();
        } catch (error) {
          if (error instanceof Error) {
            callback(error);
          }
        }
      }
    });
  }
}
const createRemoteStrapiDestinationProvider = (options) => {
  return new RemoteStrapiDestinationProvider(options);
};
class RemoteStrapiSourceProvider {
  name = "source::remote-strapi";
  type = "source";
  options;
  ws;
  dispatcher;
  constructor(options) {
    this.options = options;
    this.ws = null;
    this.dispatcher = null;
  }
  results;
  #diagnostics;
  async #createStageReadStream(stage) {
    const startResult = await this.#startStep(stage);
    if (startResult instanceof Error) {
      throw startResult;
    }
    const { id: processID } = startResult;
    const stream2 = new PassThrough({ objectMode: true });
    const listener = async (raw) => {
      const parsed = JSON.parse(raw.toString());
      if (!parsed.uuid || parsed?.data?.type !== "transfer" || parsed?.data?.id !== processID) {
        this.ws?.once("message", listener);
        return;
      }
      const { uuid, data: message } = parsed;
      const { ended, error, data } = message;
      if (error) {
        await this.#respond(uuid);
        stream2.destroy(error);
        return;
      }
      if (ended) {
        await this.#respond(uuid);
        await this.#endStep(stage);
        stream2.end();
        return;
      }
      for (const item of castArray(data)) {
        stream2.push(item);
      }
      this.ws?.once("message", listener);
      await this.#respond(uuid);
    };
    this.ws?.once("message", listener);
    return stream2;
  }
  createEntitiesReadStream() {
    return this.#createStageReadStream("entities");
  }
  createLinksReadStream() {
    return this.#createStageReadStream("links");
  }
  writeAsync = (stream2, data) => {
    return new Promise((resolve, reject2) => {
      stream2.write(data, (error) => {
        if (error) {
          reject2(error);
        }
        resolve();
      });
    });
  };
  async createAssetsReadStream() {
    const stream2 = await this.#createStageReadStream("assets");
    const pass = new PassThrough({ objectMode: true });
    const assets = {};
    stream2.on("data", async (payload) => {
      for (const item of payload) {
        const { action, assetID } = item;
        if (action === "start") {
          if (assets[assetID]) {
            continue;
          }
          assets[assetID] = {
            ...item.data,
            stream: new PassThrough(),
            status: "idle",
            queue: []
          };
          await this.writeAsync(pass, assets[assetID]);
        } else if (action === "stream") {
          if (!assets[assetID]) {
            continue;
          }
          switch (assets[assetID].status) {
            case "idle":
              await writeAssetChunk(assetID, item.data);
              break;
            case "busy":
              assets[assetID].queue.push(item);
              break;
          }
        } else if (action === "end") {
          if (!assets[assetID]) {
            continue;
          }
          switch (assets[assetID].status) {
            case "idle":
            case "errored":
              await closeAssetStream(assetID);
              break;
            case "busy":
              await Promise.race([
                // Either: wait for the asset to be ready to be closed
                waitUntil(() => assets[assetID].status !== "busy", 100),
                // Or: if the last chunks are still not processed after ten seconds
                wait(1e4)
              ]);
              await closeAssetStream(assetID);
              break;
          }
        }
      }
    }).on("close", () => {
      pass.end();
    });
    const writeAssetChunk = async (id, data) => {
      if (!assets[id]) {
        throw new Error(`Failed to write asset chunk for "${id}". Asset not found.`);
      }
      const { status: currentStatus } = assets[id];
      if (currentStatus !== "idle") {
        throw new Error(
          `Failed to write asset chunk for "${id}". The asset is currently "${currentStatus}"`
        );
      }
      const nextItemInQueue = () => assets[id].queue.shift();
      try {
        assets[id].status = "busy";
        await unsafe_writeAssetChunk(id, data);
        let item = nextItemInQueue();
        while (item) {
          await unsafe_writeAssetChunk(id, item.data);
          item = nextItemInQueue();
        }
        assets[id].status = "idle";
      } catch {
        assets[id].status = "errored";
      }
    };
    const unsafe_writeAssetChunk = async (id, data) => {
      const asset = assets[id];
      if (!asset) {
        throw new Error(`Failed to write asset chunk for "${id}". Asset not found.`);
      }
      const rawBuffer = data;
      const chunk = Buffer.from(rawBuffer.data);
      await this.writeAsync(asset.stream, chunk);
    };
    const closeAssetStream = async (id) => {
      if (!assets[id]) {
        throw new Error(`Failed to close asset "${id}". Asset not found.`);
      }
      assets[id].status = "closed";
      await new Promise((resolve, reject2) => {
        const { stream: stream22 } = assets[id];
        stream22.on("close", () => {
          delete assets[id];
          resolve();
        }).on("error", reject2).end();
      });
    };
    return pass;
  }
  createConfigurationReadStream() {
    return this.#createStageReadStream("configuration");
  }
  async getMetadata() {
    const metadata = await this.dispatcher?.dispatchTransferAction("getMetadata");
    return metadata ?? null;
  }
  assertValidProtocol(url) {
    const validProtocols = ["https:", "http:"];
    if (!validProtocols.includes(url.protocol)) {
      throw new ProviderValidationError(`Invalid protocol "${url.protocol}"`, {
        check: "url",
        details: {
          protocol: url.protocol,
          validProtocols
        }
      });
    }
  }
  async initTransfer() {
    const query = this.dispatcher?.dispatchCommand({
      command: "init"
    });
    const res = await query;
    if (!res?.transferID) {
      throw new ProviderTransferError("Init failed, invalid response from the server");
    }
    return res.transferID;
  }
  #reportInfo(message) {
    this.#diagnostics?.report({
      details: {
        createdAt: /* @__PURE__ */ new Date(),
        message,
        origin: "remote-source-provider"
      },
      kind: "info"
    });
  }
  async bootstrap(diagnostics) {
    this.#diagnostics = diagnostics;
    const { url, auth } = this.options;
    let ws;
    this.assertValidProtocol(url);
    const wsProtocol = url.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${wsProtocol}//${url.host}${trimTrailingSlash(
      url.pathname
    )}${TRANSFER_PATH}/pull`;
    this.#reportInfo("establishing websocket connection");
    if (!auth) {
      ws = await connectToWebsocket(wsUrl, void 0, this.#diagnostics);
    } else if (auth.type === "token") {
      const headers = { Authorization: `Bearer ${auth.token}` };
      ws = await connectToWebsocket(wsUrl, { headers }, this.#diagnostics);
    } else {
      throw new ProviderValidationError("Auth method not available", {
        check: "auth.type",
        details: {
          auth: auth.type
        }
      });
    }
    this.#reportInfo("established websocket connection");
    this.ws = ws;
    const { retryMessageOptions } = this.options;
    this.#reportInfo("creating dispatcher");
    this.dispatcher = createDispatcher(
      this.ws,
      retryMessageOptions,
      (message) => this.#reportInfo(message)
    );
    this.#reportInfo("creating dispatcher");
    this.#reportInfo("initialize transfer");
    const transferID = await this.initTransfer();
    this.#reportInfo(`initialized transfer ${transferID}`);
    this.dispatcher.setTransferProperties({ id: transferID, kind: "pull" });
    await this.dispatcher.dispatchTransferAction("bootstrap");
  }
  async close() {
    await this.dispatcher?.dispatchTransferAction("close");
    await new Promise((resolve) => {
      const { ws } = this;
      if (!ws || ws.CLOSED) {
        resolve();
        return;
      }
      ws.on("close", () => resolve()).close();
    });
  }
  async getSchemas() {
    const schemas = await this.dispatcher?.dispatchTransferAction("getSchemas");
    return schemas ?? null;
  }
  async #startStep(step) {
    try {
      return await this.dispatcher?.dispatchTransferStep({ action: "start", step });
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      if (typeof e === "string") {
        return new ProviderTransferError(e);
      }
      return new ProviderTransferError("Unexpected error");
    }
  }
  async #respond(uuid) {
    return new Promise((resolve, reject2) => {
      this.ws?.send(JSON.stringify({ uuid }), (e) => {
        if (e) {
          reject2(e);
        } else {
          resolve(e);
        }
      });
    });
  }
  async #endStep(step) {
    try {
      await this.dispatcher?.dispatchTransferStep({ action: "end", step });
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
      if (typeof e === "string") {
        return new ProviderTransferError(e);
      }
      return new ProviderTransferError("Unexpected error");
    }
    return null;
  }
}
const createRemoteStrapiSourceProvider = (options) => {
  return new RemoteStrapiSourceProvider(options);
};
const index$5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_CONFLICT_STRATEGY,
  VALID_CONFLICT_STRATEGIES,
  createLocalStrapiDestinationProvider,
  createLocalStrapiSourceProvider,
  createRemoteStrapiDestinationProvider,
  createRemoteStrapiSourceProvider
}, Symbol.toStringTag, { value: "Module" }));
const DEFAULT_TRANSFER_FLOW = [
  {
    kind: "action",
    action: "bootstrap"
  },
  {
    kind: "action",
    action: "init"
  },
  {
    kind: "action",
    action: "beforeTransfer"
  },
  {
    kind: "transfer",
    stage: "schemas"
  },
  {
    kind: "transfer",
    stage: "entities"
  },
  {
    kind: "transfer",
    stage: "assets"
  },
  {
    kind: "transfer",
    stage: "links"
  },
  {
    kind: "transfer",
    stage: "configuration"
  },
  {
    kind: "action",
    action: "close"
  }
];
const createFlow = (flow) => {
  const state = { step: null };
  const stepEqual = (stepA, stepB) => {
    if (stepA.kind === "action" && stepB.kind === "action") {
      return stepA.action === stepB.action;
    }
    if (stepA.kind === "transfer" && stepB.kind === "transfer") {
      return stepA.stage === stepB.stage;
    }
    return false;
  };
  const findStepIndex = (step) => flow.findIndex((flowStep) => stepEqual(step, flowStep));
  return {
    has(step) {
      return findStepIndex(step) !== -1;
    },
    can(step) {
      if (state.step === null) {
        return true;
      }
      const indexesDifference = findStepIndex(step) - findStepIndex(state.step);
      if (indexesDifference === 0 && step.kind === "transfer") {
        return true;
      }
      return indexesDifference > 0;
    },
    cannot(step) {
      return !this.can(step);
    },
    set(step) {
      const canSwitch = this.can(step);
      if (!canSwitch) {
        throw new Error("Impossible to proceed to the given step");
      }
      state.step = step;
      return this;
    },
    get() {
      return state.step;
    }
  };
};
const VALID_TRANSFER_COMMANDS = ["init", "end", "status"];
const transformUpgradeHeader = (header = "") => {
  return header.split(",").map((s) => s.trim().toLowerCase());
};
let timeouts;
const hasHttpServer = () => {
  return typeof strapi !== "undefined" && !!strapi?.server?.httpServer;
};
const disableTimeouts = () => {
  if (!hasHttpServer()) {
    return;
  }
  const { httpServer } = strapi.server;
  if (!timeouts) {
    timeouts = {
      headersTimeout: httpServer.headersTimeout,
      requestTimeout: httpServer.requestTimeout
    };
  }
  httpServer.headersTimeout = 0;
  httpServer.requestTimeout = 0;
  strapi.log.info("[Data transfer] Disabling http timeouts");
};
const resetTimeouts = () => {
  if (!hasHttpServer() || !timeouts) {
    return;
  }
  const { httpServer } = strapi.server;
  strapi.log.info("[Data transfer] Restoring http timeouts");
  httpServer.headersTimeout = timeouts.headersTimeout;
  httpServer.requestTimeout = timeouts.requestTimeout;
};
const assertValidHeader = (ctx) => {
  if (ctx.headers.upgrade === "websocket") {
    return;
  }
  const upgradeHeader = transformUpgradeHeader(ctx.headers.upgrade);
  const logSafeUpgradeHeader = JSON.stringify(ctx.headers.upgrade)?.replace(/[^a-z0-9\s.,|]/gi, "").substring(0, 50);
  if (!upgradeHeader.includes("websocket")) {
    throw new Error(
      `Transfer Upgrade header expected 'websocket', found '${logSafeUpgradeHeader}'. Please ensure that your server or proxy is not modifying the Upgrade header.`
    );
  }
  strapi.log.info(
    `Transfer Upgrade header expected only 'websocket', found unexpected values: ${logSafeUpgradeHeader}`
  );
};
const isDataTransferMessage = (message) => {
  if (!message || typeof message !== "object") {
    return false;
  }
  const { uuid, type } = message;
  if (typeof uuid !== "string" || typeof type !== "string") {
    return false;
  }
  if (!["command", "transfer"].includes(type)) {
    return false;
  }
  return true;
};
const handleWSUpgrade = (wss, ctx, callback) => {
  assertValidHeader(ctx);
  wss.handleUpgrade(ctx.req, ctx.request.socket, Buffer.alloc(0), (client, request) => {
    if (!client) {
      ctx.request.socket.destroy();
      return;
    }
    disableTimeouts();
    wss.emit("connection", client, ctx.req);
    callback(client, request);
  });
  ctx.respond = false;
};
const handlerControllerFactory = (implementation) => (options) => {
  const { verify, server: serverOptions } = options ?? {};
  const wss = new WebSocket.Server({ ...serverOptions, noServer: true });
  return async (ctx) => {
    const cb = (ws) => {
      const state = { id: void 0 };
      const messageUUIDs = /* @__PURE__ */ new Set();
      const diagnostics = createDiagnosticReporter();
      const cannotRespondHandler = (err) => {
        strapi?.log?.error(
          "[Data transfer] Cannot send error response to client, closing connection"
        );
        strapi?.log?.error(err);
        try {
          ws.terminate();
          ctx.req.socket.destroy();
        } catch (err2) {
          strapi?.log?.error("[Data transfer] Failed to close socket on error");
        }
      };
      const prototype = {
        // Transfer ID
        get transferID() {
          return state.id;
        },
        set transferID(id) {
          state.id = id;
        },
        // Started at
        get startedAt() {
          return state.startedAt;
        },
        set startedAt(timestamp) {
          state.startedAt = timestamp;
        },
        get response() {
          return state.response;
        },
        set response(response) {
          state.response = response;
        },
        get diagnostics() {
          return diagnostics;
        },
        addUUID(uuid) {
          messageUUIDs.add(uuid);
        },
        hasUUID(uuid) {
          return messageUUIDs.has(uuid);
        },
        isTransferStarted() {
          return this.transferID !== void 0 && this.startedAt !== void 0;
        },
        assertValidTransfer() {
          const isStarted = this.isTransferStarted();
          if (!isStarted) {
            throw new Error("Invalid Transfer Process");
          }
        },
        assertValidTransferCommand(command) {
          const isDefined = typeof this[command] === "function";
          const isValidTransferCommand = VALID_TRANSFER_COMMANDS.includes(command);
          if (!isDefined || !isValidTransferCommand) {
            throw new Error("Invalid transfer command");
          }
        },
        async respond(uuid, e, data) {
          let details = {};
          return new Promise((resolve, reject2) => {
            if (!uuid && !e) {
              reject2(new Error("Missing uuid for this message"));
              return;
            }
            this.response = {
              uuid,
              data,
              e
            };
            if (e instanceof ProviderError) {
              details = e.details;
            }
            const payload = JSON.stringify({
              uuid,
              data: data ?? null,
              error: e ? {
                code: e?.name ?? "ERR",
                message: e?.message,
                details
              } : null
            });
            this.send(payload, (error) => error ? reject2(error) : resolve());
          });
        },
        send(message, cb2) {
          ws.send(message, cb2);
        },
        confirm(message) {
          return new Promise((resolve, reject2) => {
            const uuid = randomUUID();
            const payload = JSON.stringify({ uuid, data: message });
            this.send(payload, (error) => {
              if (error) {
                reject2(error);
              }
            });
            const onResponse = (raw) => {
              const response = JSON.parse(raw.toString());
              if (response.uuid === uuid) {
                resolve(response.data ?? null);
              } else {
                ws.once("message", onResponse);
              }
            };
            ws.once("message", onResponse);
          });
        },
        async executeAndRespond(uuid, fn) {
          try {
            const response = await fn();
            await this.respond(uuid, null, response);
          } catch (e) {
            if (e instanceof Error) {
              await this.respond(uuid, e).catch(cannotRespondHandler);
            } else if (typeof e === "string") {
              await this.respond(uuid, new ProviderTransferError(e)).catch(cannotRespondHandler);
            } else {
              await this.respond(
                uuid,
                new ProviderTransferError("Unexpected error", {
                  error: e
                })
              ).catch(cannotRespondHandler);
            }
          }
        },
        cleanup() {
          this.transferID = void 0;
          this.startedAt = void 0;
          this.response = void 0;
        },
        teardown() {
          this.cleanup();
        },
        verifyAuth(scope) {
          return verify(ctx, scope);
        },
        // Transfer commands
        init() {
        },
        end() {
        },
        status() {
        },
        // Default prototype implementation for events
        onMessage() {
        },
        onError() {
        },
        onClose() {
        },
        onInfo() {
        },
        onWarning() {
        }
      };
      const handler = Object.assign(Object.create(prototype), implementation(prototype));
      ws.on("close", async (...args) => {
        try {
          await handler.onClose(...args);
        } catch (err) {
          strapi?.log?.error("[Data transfer] Uncaught error closing connection");
          strapi?.log?.error(err);
          cannotRespondHandler(err);
        } finally {
          resetTimeouts();
        }
      });
      ws.on("error", async (...args) => {
        try {
          await handler.onError(...args);
        } catch (err) {
          strapi?.log?.error("[Data transfer] Uncaught error in error handling");
          strapi?.log?.error(err);
          cannotRespondHandler(err);
        }
      });
      ws.on("message", async (...args) => {
        try {
          await handler.onMessage(...args);
        } catch (err) {
          strapi?.log?.error("[Data transfer] Uncaught error in message handling");
          strapi?.log?.error(err);
          cannotRespondHandler(err);
        }
      });
      diagnostics.onDiagnostic((diagnostic2) => {
        const uuid = randomUUID();
        const payload = JSON.stringify({
          diagnostic: diagnostic2,
          uuid
        });
        handler.send(payload);
      });
    };
    try {
      handleWSUpgrade(wss, ctx, cb);
    } catch (err) {
      strapi?.log?.error("[Data transfer] Error in websocket upgrade request");
      strapi?.log?.error(err);
    }
  };
};
const VALID_TRANSFER_ACTIONS$1 = [
  "bootstrap",
  "close",
  "rollback",
  "beforeTransfer",
  "getMetadata",
  "getSchemas"
];
const TRANSFER_KIND$1 = "push";
const writeAsync = (stream2, data) => {
  return new Promise((resolve, reject2) => {
    stream2.write(data, (error) => {
      if (error) {
        reject2(error);
      }
      resolve();
    });
  });
};
const createPushController = handlerControllerFactory((proto) => ({
  isTransferStarted() {
    return proto.isTransferStarted.call(this) && this.provider !== void 0;
  },
  verifyAuth() {
    return proto.verifyAuth.call(this, TRANSFER_KIND$1);
  },
  onInfo(message) {
    this.diagnostics?.report({
      details: {
        message,
        origin: "push-handler",
        createdAt: /* @__PURE__ */ new Date()
      },
      kind: "info"
    });
  },
  onWarning(message) {
    this.diagnostics?.report({
      details: {
        message,
        createdAt: /* @__PURE__ */ new Date(),
        origin: "push-handler"
      },
      kind: "warning"
    });
  },
  cleanup() {
    proto.cleanup.call(this);
    this.streams = {};
    this.assets = {};
    delete this.flow;
    delete this.provider;
  },
  teardown() {
    if (this.provider) {
      this.provider.rollback();
    }
    proto.teardown.call(this);
  },
  assertValidTransfer() {
    proto.assertValidTransfer.call(this);
    if (this.provider === void 0) {
      throw new Error("Invalid Transfer Process");
    }
  },
  assertValidTransferAction(action) {
    if (VALID_TRANSFER_ACTIONS$1.includes(action)) {
      return;
    }
    throw new ProviderTransferError(`Invalid action provided: "${action}"`, {
      action,
      validActions: Object.keys(VALID_TRANSFER_ACTIONS$1)
    });
  },
  assertValidStreamTransferStep(stage) {
    const currentStep = this.flow?.get();
    const nextStep = { kind: "transfer", stage };
    if (currentStep?.kind === "transfer" && !currentStep.locked) {
      throw new ProviderTransferError(
        `You need to initialize the transfer stage (${nextStep}) before starting to stream data`
      );
    }
    if (this.flow?.cannot(nextStep)) {
      throw new ProviderTransferError(`Invalid stage (${nextStep}) provided for the current flow`, {
        step: nextStep
      });
    }
  },
  async createWritableStreamForStep(step) {
    const mapper = {
      entities: () => this.provider?.createEntitiesWriteStream(),
      links: () => this.provider?.createLinksWriteStream(),
      configuration: () => this.provider?.createConfigurationWriteStream(),
      assets: () => this.provider?.createAssetsWriteStream()
    };
    if (!(step in mapper)) {
      throw new Error("Invalid transfer step, impossible to create a stream");
    }
    if (!this.streams) {
      throw new Error("Invalid transfer state");
    }
    this.streams[step] = await mapper[step]();
  },
  async onMessage(raw) {
    const msg = JSON.parse(raw.toString());
    if (!isDataTransferMessage(msg)) {
      return;
    }
    if (!msg.uuid) {
      await this.respond(void 0, new Error("Missing uuid in message"));
    }
    if (proto.hasUUID(msg.uuid)) {
      const previousResponse = proto.response;
      if (previousResponse?.uuid === msg.uuid) {
        await this.respond(previousResponse?.uuid, previousResponse.e, previousResponse.data);
      }
      return;
    }
    const { uuid, type } = msg;
    proto.addUUID(uuid);
    if (type === "command") {
      const { command } = msg;
      this.onInfo(`received command:${command} uuid:${uuid}`);
      await this.executeAndRespond(uuid, () => {
        this.assertValidTransferCommand(command);
        if (command === "status") {
          return this.status();
        }
        return this[command](msg.params);
      });
    } else if (type === "transfer") {
      this.onInfo(`received transfer action:${msg.action} step:${msg.kind} uuid:${uuid}`);
      await this.executeAndRespond(uuid, async () => {
        await this.verifyAuth();
        this.assertValidTransfer();
        return this.onTransferMessage(msg);
      });
    } else {
      await this.respond(uuid, new Error("Bad Request"));
    }
  },
  async onTransferMessage(msg) {
    const { kind } = msg;
    if (kind === "action") {
      return this.onTransferAction(msg);
    }
    if (kind === "step") {
      return this.onTransferStep(msg);
    }
  },
  lockTransferStep(stage) {
    const currentStep = this.flow?.get();
    const nextStep = { kind: "transfer", stage };
    if (currentStep?.kind === "transfer" && currentStep.locked) {
      throw new ProviderTransferError(
        `It's not possible to start a new transfer stage (${stage}) while another one is in progress (${currentStep.stage})`
      );
    }
    if (this.flow?.cannot(nextStep)) {
      throw new ProviderTransferError(`Invalid stage (${stage}) provided for the current flow`, {
        step: nextStep
      });
    }
    this.flow?.set({ ...nextStep, locked: true });
  },
  unlockTransferStep(stage) {
    const currentStep = this.flow?.get();
    const nextStep = { kind: "transfer", stage };
    if (currentStep?.kind === "transfer" && !currentStep.locked) {
      throw new ProviderTransferError(
        `You need to initialize the transfer stage (${stage}) before ending it`
      );
    }
    if (this.flow?.cannot(nextStep)) {
      throw new ProviderTransferError(`Invalid stage (${stage}) provided for the current flow`, {
        step: nextStep
      });
    }
    this.flow?.set({ ...nextStep, locked: false });
  },
  async onTransferStep(msg) {
    const { step: stage } = msg;
    if (msg.action === "start") {
      this.lockTransferStep(stage);
      if (this.streams?.[stage] instanceof Writable) {
        throw new Error("Stream already created, something went wrong");
      }
      await this.createWritableStreamForStep(stage);
      this.stats[stage] = { started: 0, finished: 0 };
      return { ok: true };
    }
    if (msg.action === "stream") {
      this.assertValidStreamTransferStep(stage);
      const stream2 = this.streams?.[stage];
      if (!stream2) {
        throw new Error("You need to init first");
      }
      if (stage === "assets") {
        return this.streamAsset(msg.data);
      }
      await Promise.all(
        msg.data.map(async (item) => {
          this.stats[stage].started += 1;
          await writeAsync(stream2, item);
          this.stats[stage].finished += 1;
        })
      );
    }
    if (msg.action === "end") {
      this.unlockTransferStep(stage);
      const stream2 = this.streams?.[stage];
      if (stream2 && !stream2.closed) {
        await new Promise((resolve, reject2) => {
          stream2.on("close", resolve).on("error", reject2).end();
        });
      }
      delete this.streams?.[stage];
      return { ok: true, stats: this.stats[stage] };
    }
  },
  async onTransferAction(msg) {
    const { action } = msg;
    this.assertValidTransferAction(action);
    const step = { kind: "action", action };
    const isStepRegistered = this.flow?.has(step);
    if (isStepRegistered) {
      if (this.flow?.cannot(step)) {
        throw new ProviderTransferError(`Invalid action "${action}" found for the current flow `, {
          action
        });
      }
      this.flow?.set(step);
    }
    if (action === "bootstrap") {
      return this.provider?.[action](this.diagnostics);
    }
    return this.provider?.[action]();
  },
  async streamAsset(payload) {
    const assetsStream = this.streams?.assets;
    if (payload === null) {
      this.streams?.assets?.end();
      return;
    }
    for (const item of payload) {
      const { action, assetID } = item;
      if (!assetsStream) {
        throw new Error("Stream not defined");
      }
      if (action === "start") {
        this.stats.assets.started += 1;
        this.assets[assetID] = { ...item.data, stream: new PassThrough() };
        writeAsync(assetsStream, this.assets[assetID]);
      }
      if (action === "stream") {
        const rawBuffer = item.data;
        const chunk = Buffer.from(rawBuffer.data);
        await writeAsync(this.assets[assetID].stream, chunk);
      }
      if (action === "end") {
        await new Promise((resolve, reject2) => {
          const { stream: assetStream } = this.assets[assetID];
          assetStream.on("close", () => {
            this.stats.assets.finished += 1;
            delete this.assets[assetID];
            resolve();
          }).on("error", reject2).end();
        });
      }
    }
  },
  onClose() {
    this.teardown();
  },
  onError(err) {
    this.teardown();
    strapi.log.error(err);
  },
  // Commands
  async init(params) {
    if (this.transferID || this.provider) {
      throw new Error("Transfer already in progress");
    }
    await this.verifyAuth();
    this.transferID = randomUUID();
    this.startedAt = Date.now();
    this.assets = {};
    this.streams = {};
    this.stats = {
      assets: { started: 0, finished: 0 },
      configuration: { started: 0, finished: 0 },
      entities: { started: 0, finished: 0 },
      links: { started: 0, finished: 0 }
    };
    this.flow = createFlow(DEFAULT_TRANSFER_FLOW);
    this.provider = createLocalStrapiDestinationProvider({
      ...params.options,
      autoDestroy: false,
      getStrapi: () => strapi
    });
    this.provider.onWarning = (message) => {
      this.onWarning(message);
      strapi.log.warn(message);
    };
    return { transferID: this.transferID };
  },
  async status() {
    const isStarted = this.isTransferStarted();
    if (isStarted) {
      const startedAt = this.startedAt;
      return {
        active: true,
        kind: TRANSFER_KIND$1,
        startedAt,
        elapsed: Date.now() - startedAt
      };
    }
    return { active: false, kind: null, elapsed: null, startedAt: null };
  },
  async end(params) {
    await this.verifyAuth();
    if (this.transferID !== params?.transferID) {
      throw new ProviderTransferError("Bad transfer ID provided");
    }
    this.cleanup();
    return { ok: true };
  }
}));
const TRANSFER_KIND = "pull";
const VALID_TRANSFER_ACTIONS = ["bootstrap", "close", "getMetadata", "getSchemas"];
const createPullController = handlerControllerFactory((proto) => ({
  isTransferStarted() {
    return proto.isTransferStarted.call(this) && this.provider !== void 0;
  },
  verifyAuth() {
    return proto.verifyAuth.call(this, TRANSFER_KIND);
  },
  cleanup() {
    proto.cleanup.call(this);
    this.streams = {};
    delete this.provider;
  },
  onInfo(message) {
    this.diagnostics?.report({
      details: {
        message,
        origin: "pull-handler",
        createdAt: /* @__PURE__ */ new Date()
      },
      kind: "info"
    });
  },
  onWarning(message) {
    this.diagnostics?.report({
      details: {
        message,
        createdAt: /* @__PURE__ */ new Date(),
        origin: "pull-handler"
      },
      kind: "warning"
    });
  },
  assertValidTransferAction(action) {
    const validActions = VALID_TRANSFER_ACTIONS;
    if (validActions.includes(action)) {
      return;
    }
    throw new ProviderTransferError(`Invalid action provided: "${action}"`, {
      action,
      validActions: Object.keys(VALID_TRANSFER_ACTIONS)
    });
  },
  async onMessage(raw) {
    const msg = JSON.parse(raw.toString());
    if (!isDataTransferMessage(msg)) {
      return;
    }
    if (!msg.uuid) {
      await this.respond(void 0, new Error("Missing uuid in message"));
    }
    if (proto.hasUUID(msg.uuid)) {
      const previousResponse = proto.response;
      if (previousResponse?.uuid === msg.uuid) {
        await this.respond(previousResponse?.uuid, previousResponse.e, previousResponse.data);
      }
      return;
    }
    const { uuid, type } = msg;
    proto.addUUID(uuid);
    if (type === "command") {
      const { command } = msg;
      this.onInfo(`received command:${command} uuid:${uuid}`);
      await this.executeAndRespond(uuid, () => {
        this.assertValidTransferCommand(command);
        if (command === "status") {
          return this.status();
        }
        return this[command](msg.params);
      });
    } else if (type === "transfer") {
      this.onInfo(`received transfer action:${msg.action} step:${msg.kind} uuid:${uuid}`);
      await this.executeAndRespond(uuid, async () => {
        await this.verifyAuth();
        this.assertValidTransfer();
        return this.onTransferMessage(msg);
      });
    } else {
      await this.respond(uuid, new Error("Bad Request"));
    }
  },
  async onTransferMessage(msg) {
    const { kind } = msg;
    if (kind === "action") {
      return this.onTransferAction(msg);
    }
    if (kind === "step") {
      return this.onTransferStep(msg);
    }
  },
  async onTransferAction(msg) {
    const { action } = msg;
    this.assertValidTransferAction(action);
    if (action === "bootstrap") {
      return this.provider?.[action](this.diagnostics);
    }
    return this.provider?.[action]();
  },
  async flush(stage, id) {
    const batchSize = 1024 * 1024;
    let batch = [];
    const stream2 = this.streams?.[stage];
    const batchLength = () => Buffer.byteLength(JSON.stringify(batch));
    const sendBatch = async () => {
      await this.confirm({
        type: "transfer",
        data: batch,
        ended: false,
        error: null,
        id
      });
    };
    if (!stream2) {
      throw new ProviderTransferError(`No available stream found for ${stage}`);
    }
    try {
      for await (const chunk of stream2) {
        if (stage !== "assets") {
          batch.push(chunk);
          if (batchLength() >= batchSize) {
            await sendBatch();
            batch = [];
          }
        } else {
          await this.confirm({
            type: "transfer",
            data: [chunk],
            ended: false,
            error: null,
            id
          });
        }
      }
      if (batch.length > 0 && stage !== "assets") {
        await sendBatch();
        batch = [];
      }
      await this.confirm({ type: "transfer", data: null, ended: true, error: null, id });
    } catch (e) {
      await this.confirm({ type: "transfer", data: null, ended: true, error: e, id });
    }
  },
  async onTransferStep(msg) {
    const { step, action } = msg;
    if (action === "start") {
      if (this.streams?.[step] instanceof Readable) {
        throw new Error("Stream already created, something went wrong");
      }
      const flushUUID = randomUUID();
      await this.createReadableStreamForStep(step);
      this.flush(step, flushUUID);
      return { ok: true, id: flushUUID };
    }
    if (action === "end") {
      const stream2 = this.streams?.[step];
      if (stream2?.readableEnded === false) {
        await new Promise((resolve) => {
          stream2?.on("close", resolve).destroy();
        });
      }
      delete this.streams?.[step];
      return { ok: true };
    }
  },
  async createReadableStreamForStep(step) {
    const mapper = {
      entities: () => this.provider?.createEntitiesReadStream(),
      links: () => this.provider?.createLinksReadStream(),
      configuration: () => this.provider?.createConfigurationReadStream(),
      assets: () => {
        const assets = this.provider?.createAssetsReadStream();
        let batch = [];
        const batchLength = () => {
          return batch.reduce(
            (acc, chunk) => chunk.action === "stream" ? acc + chunk.data.byteLength : acc,
            0
          );
        };
        const BATCH_MAX_SIZE = 1024 * 1024;
        if (!assets) {
          throw new Error("bad");
        }
        async function* generator(stream2) {
          let hasStarted = false;
          let assetID = "";
          for await (const chunk of stream2) {
            const { stream: assetStream, ...assetData } = chunk;
            if (!hasStarted) {
              assetID = randomUUID();
              batch.push({ action: "start", assetID, data: assetData });
              hasStarted = true;
            }
            for await (const assetChunk of assetStream) {
              batch.push({ action: "stream", assetID, data: assetChunk });
              if (batchLength() >= BATCH_MAX_SIZE) {
                yield batch;
                batch = [];
              }
            }
            hasStarted = false;
            batch.push({ action: "end", assetID });
            yield batch;
            batch = [];
          }
        }
        return Readable.from(generator(assets));
      }
    };
    if (!(step in mapper)) {
      throw new Error("Invalid transfer step, impossible to create a stream");
    }
    if (!this.streams) {
      throw new Error("Invalid transfer state");
    }
    this.streams[step] = await mapper[step]();
  },
  // Commands
  async init() {
    if (this.transferID || this.provider) {
      throw new Error("Transfer already in progress");
    }
    await this.verifyAuth();
    this.transferID = randomUUID();
    this.startedAt = Date.now();
    this.streams = {};
    this.provider = createLocalStrapiSourceProvider({
      autoDestroy: false,
      getStrapi: () => strapi
    });
    return { transferID: this.transferID };
  },
  async end(params) {
    await this.verifyAuth();
    if (this.transferID !== params?.transferID) {
      throw new ProviderTransferError("Bad transfer ID provided");
    }
    this.cleanup();
    return { ok: true };
  },
  async status() {
    const isStarted = this.isTransferStarted();
    if (!isStarted) {
      const startedAt = this.startedAt;
      return {
        active: true,
        kind: TRANSFER_KIND,
        startedAt,
        elapsed: Date.now() - startedAt
      };
    }
    return { active: false, kind: null, elapsed: null, startedAt: null };
  }
}));
const index$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createPullController,
  createPushController,
  handlerControllerFactory
}, Symbol.toStringTag, { value: "Module" }));
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  constants,
  handlers: index$4
}, Symbol.toStringTag, { value: "Module" }));
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  providers: index$5,
  queries: index$6,
  remote: index$3
}, Symbol.toStringTag, { value: "Module" }));
const isFilePathInDirname = (posixDirName, filePath) => {
  const normalizedDir = path.posix.dirname(unknownPathToPosix(filePath));
  return isPathEquivalent(posixDirName, normalizedDir);
};
const isPathEquivalent = (pathA, pathB) => {
  const normalizedPathA = path.posix.normalize(unknownPathToPosix(pathA));
  const normalizedPathB = path.posix.normalize(unknownPathToPosix(pathB));
  return !path.posix.relative(normalizedPathB, normalizedPathA).length;
};
const unknownPathToPosix = (filePath) => {
  if (filePath.includes(path.posix.sep)) {
    return filePath;
  }
  return path.normalize(filePath).split(path.win32.sep).join(path.posix.sep);
};
const METADATA_FILE_PATH = "metadata.json";
const createLocalFileSourceProvider = (options) => {
  return new LocalFileSourceProvider(options);
};
class LocalFileSourceProvider {
  type = "source";
  name = "source::local-file";
  options;
  #metadata;
  #diagnostics;
  constructor(options) {
    this.options = options;
    const { encryption } = this.options;
    if (encryption.enabled && encryption.key === void 0) {
      throw new Error("Missing encryption key");
    }
  }
  #reportInfo(message) {
    this.#diagnostics?.report({
      details: {
        createdAt: /* @__PURE__ */ new Date(),
        message,
        origin: "file-source-provider"
      },
      kind: "info"
    });
  }
  /**
   * Pre flight checks regarding the provided options, making sure that the file can be opened (decrypted, decompressed), etc.
   */
  async bootstrap(diagnostics) {
    this.#diagnostics = diagnostics;
    const { path: filePath } = this.options.file;
    try {
      await this.#loadMetadata();
    } catch (e) {
      if (this.options?.encryption?.enabled) {
        throw new ProviderInitializationError(
          `Key is incorrect or the file '${filePath}' is not a valid Strapi data file.`
        );
      }
      throw new ProviderInitializationError(`File '${filePath}' is not a valid Strapi data file.`);
    }
    if (!this.#metadata) {
      throw new ProviderInitializationError("Could not load metadata from Strapi data file.");
    }
  }
  async #loadMetadata() {
    const backupStream = this.#getBackupStream();
    this.#metadata = await this.#parseJSONFile(backupStream, METADATA_FILE_PATH);
  }
  async #loadAssetMetadata(path2) {
    const backupStream = this.#getBackupStream();
    return this.#parseJSONFile(backupStream, path2);
  }
  async getMetadata() {
    this.#reportInfo("getting metadata");
    if (!this.#metadata) {
      await this.#loadMetadata();
    }
    return this.#metadata ?? null;
  }
  async getSchemas() {
    this.#reportInfo("getting schemas");
    const schemaCollection = await collect(
      this.createSchemasReadStream()
    );
    if (isEmpty(schemaCollection)) {
      throw new ProviderInitializationError("Could not load schemas from Strapi data file.");
    }
    const schemas = keyBy("uid", schemaCollection);
    return schemasToValidJSON(schemas);
  }
  createEntitiesReadStream() {
    this.#reportInfo("creating entities read stream");
    return this.#streamJsonlDirectory("entities");
  }
  createSchemasReadStream() {
    this.#reportInfo("creating schemas read stream");
    return this.#streamJsonlDirectory("schemas");
  }
  createLinksReadStream() {
    this.#reportInfo("creating links read stream");
    return this.#streamJsonlDirectory("links");
  }
  createConfigurationReadStream() {
    this.#reportInfo("creating configuration read stream");
    return this.#streamJsonlDirectory("configuration");
  }
  createAssetsReadStream() {
    const inStream = this.#getBackupStream();
    const outStream = new PassThrough({ objectMode: true });
    const loadAssetMetadata = this.#loadAssetMetadata.bind(this);
    this.#reportInfo("creating assets read stream");
    pipeline(
      [
        inStream,
        new tar.Parse({
          // find only files in the assets/uploads folder
          filter(filePath, entry) {
            if (entry.type !== "File") {
              return false;
            }
            return isFilePathInDirname("assets/uploads", filePath);
          },
          async onentry(entry) {
            const { path: filePath, size: size2 = 0 } = entry;
            const normalizedPath = unknownPathToPosix(filePath);
            const file = path.basename(normalizedPath);
            let metadata;
            try {
              metadata = await loadAssetMetadata(`assets/metadata/${file}.json`);
            } catch (error) {
              throw new Error(`Failed to read metadata for ${file}`);
            }
            const asset = {
              metadata,
              filename: file,
              filepath: normalizedPath,
              stats: { size: size2 },
              stream: entry
            };
            outStream.write(asset);
          }
        })
      ],
      () => outStream.end()
    );
    return outStream;
  }
  #getBackupStream() {
    const { file, encryption, compression } = this.options;
    const streams = [];
    try {
      streams.push(fse__default.createReadStream(file.path));
    } catch (e) {
      throw new Error(`Could not read backup file path provided at "${this.options.file.path}"`);
    }
    if (encryption.enabled && encryption.key) {
      streams.push(createDecryptionCipher(encryption.key));
    }
    if (compression.enabled) {
      streams.push(zip$1.createGunzip());
    }
    return chain(streams);
  }
  // `directory` must be posix formatted path
  #streamJsonlDirectory(directory) {
    const inStream = this.#getBackupStream();
    const outStream = new PassThrough({ objectMode: true });
    pipeline(
      [
        inStream,
        new tar.Parse({
          filter(filePath, entry) {
            if (entry.type !== "File") {
              return false;
            }
            return isFilePathInDirname(directory, filePath);
          },
          async onentry(entry) {
            const transforms = [
              // JSONL parser to read the data chunks one by one (line by line)
              parser({
                checkErrors: true
              }),
              // The JSONL parser returns each line as key/value
              (line) => line.value
            ];
            const stream2 = entry.pipe(chain(transforms));
            try {
              for await (const chunk of stream2) {
                outStream.write(chunk);
              }
            } catch (e) {
              outStream.destroy(
                new ProviderTransferError(
                  `Error parsing backup files from backup file ${entry.path}: ${e.message}`,
                  {
                    details: {
                      error: e
                    }
                  }
                )
              );
            }
          }
        })
      ],
      async () => {
        outStream.end();
      }
    );
    return outStream;
  }
  // For collecting an entire JSON file then parsing it, not for streaming JSONL
  async #parseJSONFile(fileStream, filePath) {
    return new Promise((resolve, reject2) => {
      pipeline(
        [
          fileStream,
          // Custom backup archive parsing
          new tar.Parse({
            /**
             * Filter the parsed entries to only keep the one that matches the given filepath
             */
            filter(entryPath, entry) {
              if (entry.type !== "File") {
                return false;
              }
              return isPathEquivalent(entryPath, filePath);
            },
            async onentry(entry) {
              const content = await entry.collect();
              try {
                const parsedContent = JSON.parse(Buffer.concat(content).toString());
                resolve(parsedContent);
              } catch (e) {
                reject2(e);
              } finally {
                entry.destroy();
              }
            }
          })
        ],
        () => {
          reject2(new Error(`File "${filePath}" not found`));
        }
      );
    });
  }
}
const createFilePathFactory = (type) => (fileIndex = 0) => {
  return posix.join(
    // "{type}" directory
    type,
    // "${type}_XXXXX.jsonl" file
    `${type}_${String(fileIndex).padStart(5, "0")}.jsonl`
  );
};
const createTarEntryStream = (archive, pathFactory, maxSize = 256e6) => {
  let fileIndex = 0;
  let buffer = "";
  const flush = async () => {
    if (!buffer) {
      return;
    }
    fileIndex += 1;
    const name = pathFactory(fileIndex);
    const size2 = buffer.length;
    await new Promise((resolve, reject2) => {
      archive.entry({ name, size: size2 }, buffer, (err) => {
        if (err) {
          reject2(err);
        }
        resolve();
      });
    });
    buffer = "";
  };
  const push = (chunk) => {
    buffer += chunk;
  };
  return new Writable({
    async destroy(err, callback) {
      await flush();
      callback(err);
    },
    async write(chunk, _encoding, callback) {
      const size2 = chunk.length;
      if (chunk.length > maxSize) {
        callback(new Error(`payload too large: ${chunk.length}>${maxSize}`));
        return;
      }
      if (buffer.length + size2 > maxSize) {
        await flush();
      }
      push(chunk);
      callback(null);
    }
  });
};
const createLocalFileDestinationProvider = (options) => {
  return new LocalFileDestinationProvider(options);
};
class LocalFileDestinationProvider {
  name = "destination::local-file";
  type = "destination";
  options;
  results = {};
  #providersMetadata = {};
  #archive = {};
  #diagnostics;
  constructor(options) {
    this.options = options;
  }
  #reportInfo(message) {
    this.#diagnostics?.report({
      details: {
        createdAt: /* @__PURE__ */ new Date(),
        message,
        origin: "file-destination-provider"
      },
      kind: "info"
    });
  }
  get #archivePath() {
    const { encryption, compression, file } = this.options;
    let filePath = `${file.path}.tar`;
    if (compression.enabled) {
      filePath += ".gz";
    }
    if (encryption.enabled) {
      filePath += ".enc";
    }
    return filePath;
  }
  setMetadata(target, metadata) {
    this.#providersMetadata[target] = metadata;
    return this;
  }
  createGzip() {
    this.#reportInfo("creating gzip");
    return zip$1.createGzip();
  }
  bootstrap(diagnostics) {
    this.#diagnostics = diagnostics;
    const { compression, encryption } = this.options;
    if (encryption.enabled && !encryption.key) {
      throw new Error("Can't encrypt without a key");
    }
    this.#archive.stream = tar$1.pack();
    const outStream = createWriteStream(this.#archivePath);
    outStream.on("error", (err) => {
      if (err.code === "ENOSPC") {
        throw new ProviderTransferError(
          "Your server doesn't have space to proceed with the import."
        );
      }
      throw err;
    });
    const archiveTransforms = [];
    if (compression.enabled) {
      archiveTransforms.push(this.createGzip());
    }
    if (encryption.enabled && encryption.key) {
      archiveTransforms.push(createEncryptionCipher(encryption.key));
    }
    this.#archive.pipeline = chain([this.#archive.stream, ...archiveTransforms, outStream]);
    this.results.file = { path: this.#archivePath };
  }
  async close() {
    const { stream: stream2, pipeline: pipeline2 } = this.#archive;
    if (!stream2) {
      return;
    }
    await this.#writeMetadata();
    stream2.finalize();
    if (pipeline2 && !pipeline2.closed) {
      await new Promise((resolve, reject2) => {
        pipeline2.on("close", resolve).on("error", reject2);
      });
    }
  }
  async rollback() {
    this.#reportInfo("rolling back");
    await this.close();
    await rm(this.#archivePath, { force: true });
  }
  getMetadata() {
    return null;
  }
  async #writeMetadata() {
    this.#reportInfo("writing metadata");
    const metadata = this.#providersMetadata.source;
    if (metadata) {
      await new Promise((resolve) => {
        const outStream = this.#getMetadataStream();
        const data = JSON.stringify(metadata, null, 2);
        Readable.from(data).pipe(outStream).on("close", resolve);
      });
    }
  }
  #getMetadataStream() {
    const { stream: stream2 } = this.#archive;
    if (!stream2) {
      throw new Error("Archive stream is unavailable");
    }
    return createTarEntryStream(stream2, () => "metadata.json");
  }
  createSchemasWriteStream() {
    if (!this.#archive.stream) {
      throw new Error("Archive stream is unavailable");
    }
    this.#reportInfo("creating schemas write stream");
    const filePathFactory = createFilePathFactory("schemas");
    const entryStream = createTarEntryStream(
      this.#archive.stream,
      filePathFactory,
      this.options.file.maxSizeJsonl
    );
    return chain([stringer(), entryStream]);
  }
  createEntitiesWriteStream() {
    if (!this.#archive.stream) {
      throw new Error("Archive stream is unavailable");
    }
    this.#reportInfo("creating entities write stream");
    const filePathFactory = createFilePathFactory("entities");
    const entryStream = createTarEntryStream(
      this.#archive.stream,
      filePathFactory,
      this.options.file.maxSizeJsonl
    );
    return chain([stringer(), entryStream]);
  }
  createLinksWriteStream() {
    if (!this.#archive.stream) {
      throw new Error("Archive stream is unavailable");
    }
    this.#reportInfo("creating links write stream");
    const filePathFactory = createFilePathFactory("links");
    const entryStream = createTarEntryStream(
      this.#archive.stream,
      filePathFactory,
      this.options.file.maxSizeJsonl
    );
    return chain([stringer(), entryStream]);
  }
  createConfigurationWriteStream() {
    if (!this.#archive.stream) {
      throw new Error("Archive stream is unavailable");
    }
    this.#reportInfo("creating configuration write stream");
    const filePathFactory = createFilePathFactory("configuration");
    const entryStream = createTarEntryStream(
      this.#archive.stream,
      filePathFactory,
      this.options.file.maxSizeJsonl
    );
    return chain([stringer(), entryStream]);
  }
  createAssetsWriteStream() {
    const { stream: archiveStream } = this.#archive;
    if (!archiveStream) {
      throw new Error("Archive stream is unavailable");
    }
    this.#reportInfo("creating assets write stream");
    return new Writable({
      objectMode: true,
      write(data, _encoding, callback) {
        const entryPath = path.posix.join("assets", "uploads", data.filename);
        const entryMetadataPath = path.posix.join("assets", "metadata", `${data.filename}.json`);
        const stringifiedMetadata = JSON.stringify(data.metadata);
        archiveStream.entry(
          {
            name: entryMetadataPath,
            size: stringifiedMetadata.length
          },
          stringifiedMetadata
        );
        const entry = archiveStream.entry({
          name: entryPath,
          size: data.stats.size
        });
        if (!entry) {
          callback(new Error(`Failed to created an asset tar entry for ${entryPath}`));
          return;
        }
        data.stream.pipe(entry);
        entry.on("finish", () => {
          callback(null);
        }).on("error", (error) => {
          callback(error);
        });
      }
    });
  }
}
const index$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createLocalFileDestinationProvider,
  createLocalFileSourceProvider
}, Symbol.toStringTag, { value: "Module" }));
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  providers: index$1
}, Symbol.toStringTag, { value: "Module" }));
export {
  index$7 as engine,
  index as file,
  index$2 as strapi,
  index$8 as utils
};
//# sourceMappingURL=index.mjs.map
