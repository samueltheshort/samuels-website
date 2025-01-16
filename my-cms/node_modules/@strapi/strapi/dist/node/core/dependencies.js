"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const os = require("node:os");
const fs = require("node:fs/promises");
const path = require("node:path");
const semver = require("semver");
const resolveFrom = require("resolve-from");
const execa = require("execa");
const readPkgUp = require("read-pkg-up");
const managers = require("./managers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const os__default = /* @__PURE__ */ _interopDefault(os);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const path__default = /* @__PURE__ */ _interopDefault(path);
const semver__default = /* @__PURE__ */ _interopDefault(semver);
const resolveFrom__default = /* @__PURE__ */ _interopDefault(resolveFrom);
const execa__default = /* @__PURE__ */ _interopDefault(execa);
const readPkgUp__default = /* @__PURE__ */ _interopDefault(readPkgUp);
const PEER_DEPS = {
  react: "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "styled-components": "^6.0.0"
};
const checkRequiredDependencies = async ({
  cwd,
  logger
}) => {
  if (process.env.USE_EXPERIMENTAL_DEPENDENCIES === "true") {
    logger.warn("You are using experimental dependencies that may not be compatible with Strapi.");
    return { didInstall: false };
  }
  const pkg = await readPkgUp__default.default({ cwd });
  if (!pkg) {
    throw new Error(`Could not find package.json at path: ${cwd}`);
  }
  logger.debug("Loaded package.json:", os__default.default.EOL, pkg.packageJson);
  const { install, review } = Object.entries(PEER_DEPS).reduce(
    (acc, [name, version]) => {
      if (!pkg.packageJson.dependencies) {
        throw new Error(`Could not find dependencies in package.json at path: ${cwd}`);
      }
      const declaredVersion = pkg.packageJson.dependencies[name];
      if (!declaredVersion) {
        acc.install.push({
          name,
          wantedVersion: version
        });
      } else {
        acc.review.push({
          name,
          wantedVersion: version,
          declaredVersion
        });
      }
      return acc;
    },
    {
      install: [],
      review: []
    }
  );
  if (install.length > 0) {
    logger.info(
      "The Strapi admin needs to install the following dependencies:",
      os__default.default.EOL,
      install.map(({ name, wantedVersion }) => `  - ${name}@${wantedVersion}`).join(os__default.default.EOL)
    );
    await installDependencies(install, {
      cwd,
      logger
    });
    const [file, ...args] = process.argv;
    await execa__default.default(file, args, { cwd, stdio: "inherit" });
    return { didInstall: true };
  }
  if (review.length) {
    const errors = [];
    for (const dep of review) {
      let minDeclaredVersion = null;
      try {
        minDeclaredVersion = semver__default.default.minVersion(dep.declaredVersion);
      } catch (err) {
      }
      if (!minDeclaredVersion) {
        errors.push(
          `The declared dependency, ${dep.name} has an invalid version in package.json: ${dep.declaredVersion}`
        );
      } else if (!semver__default.default.satisfies(minDeclaredVersion, dep.wantedVersion)) {
        logger.warn(
          [
            `Declared version of ${dep.name} (${minDeclaredVersion}) is not compatible with the version required by Strapi (${dep.wantedVersion}).`,
            "You may experience issues, we recommend you change this."
          ].join(os__default.default.EOL)
        );
      }
      const installedVersion = await getModuleVersion(dep.name, cwd);
      if (!installedVersion) {
        errors.push(
          `The declared dependency, ${dep.name} is not installed. You should install before re-running this command`
        );
      } else if (!semver__default.default.satisfies(installedVersion, dep.wantedVersion)) {
        logger.warn(
          [
            `Declared version of ${dep.name} (${installedVersion}) is not compatible with the version required by Strapi (${dep.wantedVersion}).`,
            "You may experience issues, we recommend you change this."
          ].join(os__default.default.EOL)
        );
      }
    }
    if (errors.length > 0 && process.env.NODE_ENV === "development") {
      throw new Error(`${os__default.default.EOL}- ${errors.join(`${os__default.default.EOL}- `)}`);
    }
  }
  return { didInstall: false };
};
const getModule = async (name, cwd) => {
  const modulePackagePath = resolveFrom__default.default.silent(cwd, path__default.default.join(name, "package.json"));
  if (!modulePackagePath) {
    return null;
  }
  const file = await fs__default.default.readFile(modulePackagePath, "utf8").then((res) => JSON.parse(res));
  return file;
};
const getModuleVersion = async (name, cwd) => {
  const pkg = await getModule(name, cwd);
  return pkg?.version || null;
};
const installDependencies = async (install, { cwd, logger }) => {
  const packageManager = managers.getPackageManager();
  if (!packageManager) {
    logger.error(
      "Could not find a supported package manager, please install the dependencies manually."
    );
    process.exit(1);
  }
  const execOptions = {
    encoding: "utf8",
    cwd,
    stdio: "inherit"
  };
  const packages = install.map(({ name, wantedVersion }) => `${name}@${wantedVersion}`);
  let result;
  if (packageManager === "npm") {
    const npmArgs = ["install", "--legacy-peer-deps", "--save", ...packages];
    logger.info(`Running 'npm ${npmArgs.join(" ")}'`);
    result = await execa__default.default("npm", npmArgs, execOptions);
  } else if (packageManager === "yarn") {
    const yarnArgs = ["add", ...packages];
    logger.info(`Running 'yarn ${yarnArgs.join(" ")}'`);
    result = await execa__default.default("yarn", yarnArgs, execOptions);
  } else if (packageManager === "pnpm") {
    const pnpmArgs = ["add", "--save-prod", ...packages];
    logger.info(`Running 'pnpm ${pnpmArgs.join(" ")}'`);
    result = await execa__default.default("pnpm", pnpmArgs, execOptions);
  }
  if (result?.exitCode || result?.failed) {
    throw new Error("Package installation failed");
  }
};
exports.checkRequiredDependencies = checkRequiredDependencies;
exports.getModule = getModule;
//# sourceMappingURL=dependencies.js.map
