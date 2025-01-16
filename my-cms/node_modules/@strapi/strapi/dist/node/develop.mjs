import * as tsUtils from "@strapi/typescript-utils";
import { strings } from "@strapi/utils";
import chokidar from "chokidar";
import fs from "node:fs/promises";
import path from "node:path";
import cluster from "node:cluster";
import { createStrapi } from "@strapi/core";
import { checkRequiredDependencies } from "./core/dependencies.mjs";
import { prettyTime, getTimer } from "./core/timer.mjs";
import { createBuildContext } from "./create-build-context.mjs";
import { writeStaticClientFiles } from "./staticFiles.mjs";
const cleanupDistDirectory = async ({
  tsconfig,
  logger,
  timer
}) => {
  const distDir = tsconfig?.config?.options?.outDir;
  if (!distDir || // we don't have a dist dir
  await fs.access(distDir).then(() => false).catch(() => true)) {
    return;
  }
  const timerName = `cleaningDist${Date.now()}`;
  timer.start(timerName);
  const cleaningSpinner = logger.spinner(`Cleaning dist dir ${distDir}`).start();
  try {
    const dirContent = await fs.readdir(distDir);
    const validFilenames = dirContent.filter((filename) => filename !== "build");
    for (const filename of validFilenames) {
      await fs.rm(path.resolve(distDir, filename), { recursive: true });
    }
  } catch (err) {
    const generatingDuration2 = timer.end(timerName);
    cleaningSpinner.text = `Error cleaning dist dir: ${err} (${prettyTime(generatingDuration2)})`;
    cleaningSpinner?.fail();
    return;
  }
  const generatingDuration = timer.end(timerName);
  cleaningSpinner.text = `Cleaning dist dir (${prettyTime(generatingDuration)})`;
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
  const timer = getTimer();
  if (cluster.isPrimary) {
    const { didInstall } = await checkRequiredDependencies({ cwd, logger }).catch((err) => {
      logger.error(err.message);
      process.exit(1);
    });
    if (didInstall) {
      return;
    }
    if (tsconfig?.config) {
      await cleanupDistDirectory({ tsconfig, logger, timer });
      await tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: true } });
    }
    if (!watchAdmin) {
      timer.start("createBuildContext");
      const contextSpinner = logger.spinner(`Building build context`).start();
      console.log("");
      const ctx = await createBuildContext({
        cwd,
        logger,
        tsconfig,
        options
      });
      const contextDuration = timer.end("createBuildContext");
      contextSpinner.text = `Building build context (${prettyTime(contextDuration)})`;
      contextSpinner.succeed();
      timer.start("creatingAdmin");
      const adminSpinner = logger.spinner(`Creating admin`).start();
      await writeStaticClientFiles(ctx);
      if (ctx.bundler === "webpack") {
        const { build: buildWebpack } = await import("./webpack/build.mjs");
        await buildWebpack(ctx);
      } else if (ctx.bundler === "vite") {
        const { build: buildVite } = await import("./vite/build.mjs");
        await buildVite(ctx);
      }
      const adminDuration = timer.end("creatingAdmin");
      adminSpinner.text = `Creating admin (${prettyTime(adminDuration)})`;
      adminSpinner.succeed();
    }
    cluster.on("message", async (worker, message) => {
      switch (message) {
        case "reload": {
          if (tsconfig?.config) {
            await cleanupDistDirectory({ tsconfig, logger, timer });
            await tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: true } });
          }
          logger.debug("cluster has the reload message, sending the worker kill message");
          worker.send("kill");
          break;
        }
        case "killed": {
          logger.debug("cluster has the killed message, forking the cluster");
          cluster.fork();
          break;
        }
        case "stop": {
          process.exit(1);
          break;
        }
      }
    });
    cluster.fork();
  }
  if (cluster.isWorker) {
    timer.start("loadStrapi");
    const loadStrapiSpinner = logger.spinner(`Loading Strapi`).start();
    const strapi = createStrapi({
      appDir: cwd,
      distDir: tsconfig?.config.options.outDir ?? "",
      autoReload: true,
      serveAdminPanel: !watchAdmin
    });
    let bundleWatcher;
    const strapiInstance = await strapi.load();
    if (watchAdmin) {
      timer.start("createBuildContext");
      const contextSpinner = logger.spinner(`Building build context`).start();
      console.log("");
      const ctx = await createBuildContext({
        cwd,
        logger,
        strapi,
        tsconfig,
        options
      });
      const contextDuration = timer.end("createBuildContext");
      contextSpinner.text = `Building build context (${prettyTime(contextDuration)})`;
      contextSpinner.succeed();
      timer.start("creatingAdmin");
      const adminSpinner = logger.spinner(`Creating admin`).start();
      await writeStaticClientFiles(ctx);
      if (ctx.bundler === "webpack") {
        const { watch: watchWebpack } = await import("./webpack/watch.mjs");
        bundleWatcher = await watchWebpack(ctx);
      } else if (ctx.bundler === "vite") {
        const { watch: watchVite } = await import("./vite/watch.mjs");
        bundleWatcher = await watchVite(ctx);
      }
      const adminDuration = timer.end("creatingAdmin");
      adminSpinner.text = `Creating admin (${prettyTime(adminDuration)})`;
      adminSpinner.succeed();
    }
    const loadStrapiDuration = timer.end("loadStrapi");
    loadStrapiSpinner.text = `Loading Strapi (${prettyTime(loadStrapiDuration)})`;
    loadStrapiSpinner.succeed();
    if (tsconfig?.config || strapi.config.get("typescript.autogenerate") !== false) {
      timer.start("generatingTS");
      const generatingTsSpinner = logger.spinner(`Generating types`).start();
      await tsUtils.generators.generate({
        strapi: strapiInstance,
        pwd: cwd,
        rootDir: void 0,
        logger: { silent: true, debug: false },
        artifacts: { contentTypes: true, components: true }
      });
      const generatingDuration = timer.end("generatingTS");
      generatingTsSpinner.text = `Generating types (${prettyTime(generatingDuration)})`;
      generatingTsSpinner.succeed();
    }
    if (tsconfig?.config) {
      timer.start("compilingTS");
      const compilingTsSpinner = logger.spinner(`Compiling TS`).start();
      await cleanupDistDirectory({ tsconfig, logger, timer });
      await tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: false } });
      const compilingDuration = timer.end("compilingTS");
      compilingTsSpinner.text = `Compiling TS (${prettyTime(compilingDuration)})`;
      compilingTsSpinner.succeed();
    }
    const restart = async () => {
      if (strapiInstance.reload.isWatching && !strapiInstance.reload.isReloading) {
        strapiInstance.reload.isReloading = true;
        strapiInstance.reload();
      }
    };
    const watcher = chokidar.watch(cwd, {
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
        strings.joinBy("/", strapiInstance.dirs.static.public, "**"),
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
export {
  develop
};
//# sourceMappingURL=develop.mjs.map
