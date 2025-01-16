"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const tsUtils = require("@strapi/typescript-utils");
const dependencies = require("./core/dependencies.js");
const timer = require("./core/timer.js");
const createBuildContext = require("./create-build-context.js");
const staticFiles = require("./staticFiles.js");
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const tsUtils__namespace = /* @__PURE__ */ _interopNamespace(tsUtils);
const build = async ({ logger, cwd, tsconfig, ...options }) => {
  const timer$1 = timer.getTimer();
  const { didInstall } = await dependencies.checkRequiredDependencies({ cwd, logger }).catch((err) => {
    logger.error(err.message);
    process.exit(1);
  });
  if (didInstall) {
    return;
  }
  if (tsconfig?.config) {
    timer$1.start("compilingTS");
    const compilingTsSpinner = logger.spinner(`Compiling TS`).start();
    tsUtils__namespace.compile(cwd, { configOptions: { ignoreDiagnostics: false } });
    const compilingDuration = timer$1.end("compilingTS");
    compilingTsSpinner.text = `Compiling TS (${timer.prettyTime(compilingDuration)})`;
    compilingTsSpinner.succeed();
  }
  timer$1.start("createBuildContext");
  const contextSpinner = logger.spinner(`Building build context`).start();
  console.log("");
  const ctx = await createBuildContext.createBuildContext({
    cwd,
    logger,
    tsconfig,
    options
  });
  const contextDuration = timer$1.end("createBuildContext");
  contextSpinner.text = `Building build context (${timer.prettyTime(contextDuration)})`;
  contextSpinner.succeed();
  timer$1.start("buildAdmin");
  const buildingSpinner = logger.spinner(`Building admin panel`).start();
  console.log("");
  try {
    await staticFiles.writeStaticClientFiles(ctx);
    if (ctx.bundler === "webpack") {
      const { build: buildWebpack } = await Promise.resolve().then(() => require("./webpack/build.js"));
      await buildWebpack(ctx);
    } else if (ctx.bundler === "vite") {
      const { build: buildVite } = await Promise.resolve().then(() => require("./vite/build.js"));
      await buildVite(ctx);
    }
    const buildDuration = timer$1.end("buildAdmin");
    buildingSpinner.text = `Building admin panel (${timer.prettyTime(buildDuration)})`;
    buildingSpinner.succeed();
  } catch (err) {
    buildingSpinner.fail();
    throw err;
  }
};
exports.build = build;
//# sourceMappingURL=build.js.map
