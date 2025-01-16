import path from "path";
import packageJson from "package-json";
import Configstore from "configstore";
import semver from "semver";
import boxen from "boxen";
import chalk from "chalk";
import { env } from "@strapi/utils";
const pkg = require("../../../package.json");
const CHECK_INTERVAL = 1e3 * 60 * 60 * 24 * 1;
const NOTIF_INTERVAL = 1e3 * 60 * 60 * 24 * 7;
const boxenOptions = {
  padding: 1,
  margin: 1,
  align: "center",
  borderColor: "yellow",
  borderStyle: "round"
};
const getUpdateMessage = (newVersion, currentVersion) => {
  const currentVersionLog = chalk.dim(currentVersion);
  const newVersionLog = chalk.green(newVersion);
  const releaseLink = chalk.bold("https://github.com/strapi/strapi/releases");
  return `
A new version of Strapi is available ${currentVersionLog} → ${newVersionLog}
Check out the new releases at: ${releaseLink}
`.trim();
};
const createUpdateNotifier = (strapi) => {
  let config;
  try {
    config = new Configstore(
      pkg.name,
      {},
      { configPath: path.join(strapi.dirs.app.root, ".strapi-updater.json") }
    );
  } catch {
    return;
  }
  const checkUpdate = async (checkInterval) => {
    const now = Date.now();
    const lastUpdateCheck = config.get("lastUpdateCheck") || 0;
    if (lastUpdateCheck + checkInterval > now) {
      return;
    }
    try {
      const res = await packageJson(pkg.name);
      if (res.version) {
        config.set("latest", res.version);
        config.set("lastUpdateCheck", now);
      }
    } catch {
    }
  };
  const display = (notifInterval) => {
    const now = Date.now();
    const latestVersion = config.get("latest");
    const lastNotification = config.get("lastNotification") || 0;
    if (!process.stdout.isTTY || lastNotification + notifInterval > now || !semver.valid(latestVersion) || !semver.valid(pkg.version) || semver.lte(latestVersion, pkg.version)) {
      return;
    }
    const message = boxen(getUpdateMessage(latestVersion, pkg.version), boxenOptions);
    config.set("lastNotification", now);
    console.log(message);
  };
  if (env.bool("STRAPI_DISABLE_UPDATE_NOTIFICATION", false)) {
    strapi.log.warn(
      "STRAPI_DISABLE_UPDATE_NOTIFICATION is no longer supported. Instead, set logger.updates.enabled to false in your server configuration."
    );
  }
  if (!strapi.config.get("server.logger.updates.enabled") || !config) {
    return;
  }
  display(NOTIF_INTERVAL);
  checkUpdate(CHECK_INTERVAL);
};
export {
  createUpdateNotifier
};
//# sourceMappingURL=index.mjs.map
