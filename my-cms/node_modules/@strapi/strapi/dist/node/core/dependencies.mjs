import os from "node:os";
import fs from "node:fs/promises";
import path from "node:path";
import semver from "semver";
import resolveFrom from "resolve-from";
import execa from "execa";
import readPkgUp from "read-pkg-up";
import { getPackageManager } from "./managers.mjs";
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
  const pkg = await readPkgUp({ cwd });
  if (!pkg) {
    throw new Error(`Could not find package.json at path: ${cwd}`);
  }
  logger.debug("Loaded package.json:", os.EOL, pkg.packageJson);
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
      os.EOL,
      install.map(({ name, wantedVersion }) => `  - ${name}@${wantedVersion}`).join(os.EOL)
    );
    await installDependencies(install, {
      cwd,
      logger
    });
    const [file, ...args] = process.argv;
    await execa(file, args, { cwd, stdio: "inherit" });
    return { didInstall: true };
  }
  if (review.length) {
    const errors = [];
    for (const dep of review) {
      let minDeclaredVersion = null;
      try {
        minDeclaredVersion = semver.minVersion(dep.declaredVersion);
      } catch (err) {
      }
      if (!minDeclaredVersion) {
        errors.push(
          `The declared dependency, ${dep.name} has an invalid version in package.json: ${dep.declaredVersion}`
        );
      } else if (!semver.satisfies(minDeclaredVersion, dep.wantedVersion)) {
        logger.warn(
          [
            `Declared version of ${dep.name} (${minDeclaredVersion}) is not compatible with the version required by Strapi (${dep.wantedVersion}).`,
            "You may experience issues, we recommend you change this."
          ].join(os.EOL)
        );
      }
      const installedVersion = await getModuleVersion(dep.name, cwd);
      if (!installedVersion) {
        errors.push(
          `The declared dependency, ${dep.name} is not installed. You should install before re-running this command`
        );
      } else if (!semver.satisfies(installedVersion, dep.wantedVersion)) {
        logger.warn(
          [
            `Declared version of ${dep.name} (${installedVersion}) is not compatible with the version required by Strapi (${dep.wantedVersion}).`,
            "You may experience issues, we recommend you change this."
          ].join(os.EOL)
        );
      }
    }
    if (errors.length > 0 && process.env.NODE_ENV === "development") {
      throw new Error(`${os.EOL}- ${errors.join(`${os.EOL}- `)}`);
    }
  }
  return { didInstall: false };
};
const getModule = async (name, cwd) => {
  const modulePackagePath = resolveFrom.silent(cwd, path.join(name, "package.json"));
  if (!modulePackagePath) {
    return null;
  }
  const file = await fs.readFile(modulePackagePath, "utf8").then((res) => JSON.parse(res));
  return file;
};
const getModuleVersion = async (name, cwd) => {
  const pkg = await getModule(name, cwd);
  return pkg?.version || null;
};
const installDependencies = async (install, { cwd, logger }) => {
  const packageManager = getPackageManager();
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
    result = await execa("npm", npmArgs, execOptions);
  } else if (packageManager === "yarn") {
    const yarnArgs = ["add", ...packages];
    logger.info(`Running 'yarn ${yarnArgs.join(" ")}'`);
    result = await execa("yarn", yarnArgs, execOptions);
  } else if (packageManager === "pnpm") {
    const pnpmArgs = ["add", "--save-prod", ...packages];
    logger.info(`Running 'pnpm ${pnpmArgs.join(" ")}'`);
    result = await execa("pnpm", pnpmArgs, execOptions);
  }
  if (result?.exitCode || result?.failed) {
    throw new Error("Package installation failed");
  }
};
export {
  checkRequiredDependencies,
  getModule
};
//# sourceMappingURL=dependencies.mjs.map
