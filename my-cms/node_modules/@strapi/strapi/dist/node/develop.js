"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const tsUtils = require("@strapi/typescript-utils");
const utils = require("@strapi/utils");
const chokidar = require("chokidar");
const fs = require("node:fs/promises");
const path = require("node:path");
const cluster = require("node:cluster");
const core = require("@strapi/core");
const dependencies = require("./core/dependencies.js");
const timer = require("./core/timer.js");
const createBuildContext = require("./create-build-context.js");
const staticFiles = require("./staticFiles.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
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
const chokidar__default = /* @__PURE__ */ _interopDefault(chokidar);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const path__default = /* @__PURE__ */ _interopDefault(path);
const cluster__default = /* @__PURE__ */ _interopDefault(cluster);
const cleanupDistDirectory = async ({
  tsconfig,
  logger,
  timer: timer$1
}) => {
  const distDir = tsconfig?.config?.options?.outDir;
  if (!distDir || // we don't have a dist dir
  await fs__default.default.access(distDir).then(() => false).catch(() => true)) {
    return;
  }
  const timerName = `cleaningDist${Date.now()}`;
  timer$1.start(timerName);
  const cleaningSpinner = logger.spinner(`Cleaning dist dir ${distDir}`).start();
  try {
    const dirContent = await fs__default.default.readdir(distDir);
    const validFilenames = dirContent.filter((filename) => filename !== "build");
    for (const filename of validFilenames) {
      await fs__default.default.rm(path__default.default.resolve(distDir, filename), { recursive: true });
    }
  } catch (err) {
    const generatingDuration2 = timer$1.end(timerName);
    cleaningSpinner.text = `Error cleaning dist dir: ${err} (${timer.prettyTime(generatingDuration2)})`;
    cleaningSpinner?.fail();
    return;
  }
  const generatingDuration = timer$1.end(timerName);
  cleaningSpinner.text = `Cleaning dist dir (${timer.prettyTime(generatingDuration)})`;
  cleaningSpinner?.succeed();
};
const develop = async ({
  cwd,
  polling,
  logger,
  tsconfig,
  watchAdmin,
  ...options
}) => {
  const timer$1 = timer.getTimer();
  if (cluster__default.default.isPrimary) {
    const { didInstall } = await dependencies.checkRequiredDependencies({ cwd, logger }).catch((err) => {
      logger.error(err.message);
      process.exit(1);
    });
    if (didInstall) {
      return;
    }
    if (tsconfig?.config) {
      await cleanupDistDirectory({ tsconfig, logger, timer: timer$1 });
      await tsUtils__namespace.compile(cwd, { configOptions: { ignoreDiagnostics: true } });
    }
    if (!watchAdmin) {
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
      timer$1.start("creatingAdmin");
      const adminSpinner = logger.spinner(`Creating admin`).start();
      await staticFiles.writeStaticClientFiles(ctx);
      if (ctx.bundler === "webpack") {
        const { build: buildWebpack } = await Promise.resolve().then(() => require("./webpack/build.js"));
        await buildWebpack(ctx);
      } else if (ctx.bundler === "vite") {
        const { build: buildVite } = await Promise.resolve().then(() => require("./vite/build.js"));
        await buildVite(ctx);
      }
      const adminDuration = timer$1.end("creatingAdmin");
      adminSpinner.text = `Creating admin (${timer.prettyTime(adminDuration)})`;
      adminSpinner.succeed();
    }
    cluster__default.default.on("message", async (worker, message) => {
      switch (message) {
        case "reload": {
          if (tsconfig?.config) {
            await cleanupDistDirectory({ tsconfig, logger, timer: timer$1 });
            await tsUtils__namespace.compile(cwd, { configOptions: { ignoreDiagnostics: true } });
          }
          logger.debug("cluster has the reload message, sending the worker kill message");
          worker.send("kill");
          break;
        }
        case "killed": {
          logger.debug("cluster has the killed message, forking the cluster");
          cluster__default.default.fork();
          break;
        }
        case "stop": {
          process.exit(1);
          break;
        }
      }
    });
    cluster__default.default.fork();
  }
  if (cluster__default.default.isWorker) {
    timer$1.start("loadStrapi");
    const loadStrapiSpinner = logger.spinner(`Loading Strapi`).start();
    const strapi = core.createStrapi({
      appDir: cwd,
      distDir: tsconfig?.config.options.outDir ?? "",
      autoReload: true,
      serveAdminPanel: !watchAdmin
    });
    let bundleWatcher;
    const strapiInstance = await strapi.load();
    if (watchAdmin) {
      timer$1.start("createBuildContext");
      const contextSpinner = logger.spinner(`Building build context`).start();
      console.log("");
      const ctx = await createBuildContext.createBuildContext({
        cwd,
        logger,
        strapi,
        tsconfig,
        options
      });
      const contextDuration = timer$1.end("createBuildContext");
      contextSpinner.text = `Building build context (${timer.prettyTime(contextDuration)})`;
      contextSpinner.succeed();
      timer$1.start("creatingAdmin");
      const adminSpinner = logger.spinner(`Creating admin`).start();
      await staticFiles.writeStaticClientFiles(ctx);
      if (ctx.bundler === "webpack") {
        const { watch: watchWebpack } = await Promise.resolve().then(() => require("./webpack/watch.js"));
        bundleWatcher = await watchWebpack(ctx);
      } else if (ctx.bundler === "vite") {
        const { watch: watchVite } = await Promise.resolve().then(() => require("./vite/watch.js"));
        bundleWatcher = await watchVite(ctx);
      }
      const adminDuration = timer$1.end("creatingAdmin");
      adminSpinner.text = `Creating admin (${timer.prettyTime(adminDuration)})`;
      adminSpinner.succeed();
    }
    const loadStrapiDuration = timer$1.end("loadStrapi");
    loadStrapiSpinner.text = `Loading Strapi (${timer.prettyTime(loadStrapiDuration)})`;
    loadStrapiSpinner.succeed();
    if (tsconfig?.config || strapi.config.get("typescript.autogenerate") !== false) {
      timer$1.start("generatingTS");
      const generatingTsSpinner = logger.spinner(`Generating types`).start();
      await tsUtils__namespace.generators.generate({
        strapi: strapiInstance,
        pwd: cwd,
        rootDir: void 0,
        logger: { silent: true, debug: false },
        artifacts: { contentTypes: true, components: true }
      });
      const generatingDuration = timer$1.end("generatingTS");
      generatingTsSpinner.text = `Generating types (${timer.prettyTime(generatingDuration)})`;
      generatingTsSpinner.succeed();
    }
    if (tsconfig?.config) {
      timer$1.start("compilingTS");
      const compilingTsSpinner = logger.spinner(`Compiling TS`).start();
      await cleanupDistDirectory({ tsconfig, logger, timer: timer$1 });
      await tsUtils__namespace.compile(cwd, { configOptions: { ignoreDiagnostics: false } });
      const compilingDuration = timer$1.end("compilingTS");
      compilingTsSpinner.text = `Compiling TS (${timer.prettyTime(compilingDuration)})`;
      compilingTsSpinner.succeed();
    }
    const restart = async () => {
      if (strapiInstance.reload.isWatching && !strapiInstance.reload.isReloading) {
        strapiInstance.reload.isReloading = true;
        strapiInstance.reload();
      }
    };
    const watcher = chokidar__default.default.watch(cwd, {
      ignoreInitial: true,
      usePolling: polling,
      ignored: [
        /(^|[/\\])\../,
        // dot files
        /tmp/,
        "**/src/admin/**",
        "**/src/plugins/**/admin/**",
        "**/dist/src/plugins/test/admin/**",
        "**/documentation",
        "**/documentation/**",
        "**/node_modules",
        "**/node_modules/**",
        "**/plugins.json",
        "**/build",
        "**/build/**",
        "**/log",
        "**/log/**",
        "**/logs",
        "**/logs/**",
        "**/*.log",
        "**/index.html",
        "**/public",
        "**/public/**",
        strapiInstance.dirs.static.public,
        utils.strings.joinBy("/", strapiInstance.dirs.static.public, "**"),
        "**/*.db*",
        "**/exports/**",
        "**/dist/**",
        "**/*.d.ts",
        "**/.yalc/**",
        "**/yalc.lock",
        // TODO v6: watch only src folder by default, and flip this to watchIncludeFiles
        ...strapiInstance.config.get("admin.watchIgnoreFiles", [])
      ]
    }).on("add", (path2) => {
      strapiInstance.log.info(`File created: ${path2}`);
      restart();
    }).on("change", (path2) => {
      strapiInstance.log.info(`File changed: ${path2}`);
      restart();
    }).on("unlink", (path2) => {
      strapiInstance.log.info(`File deleted: ${path2}`);
      restart();
    });
    process.on("message", async (message) => {
      switch (message) {
        case "kill": {
          logger.debug(
            "child process has the kill message, destroying the strapi instance and sending the killed process message"
          );
          await watcher.close();
          await strapiInstance.destroy();
          if (bundleWatcher) {
            bundleWatcher.close();
          }
          process.send?.("killed");
          break;
        }
      }
    });
    strapiInstance.start();
  }
};
exports.develop = develop;
//# sourceMappingURL=develop.js.map
