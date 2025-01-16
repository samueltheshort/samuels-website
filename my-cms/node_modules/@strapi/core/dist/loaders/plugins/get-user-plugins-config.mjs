import { join } from "path";
import fse from "fs-extra";
import { merge } from "lodash/fp";
import { loadConfigFile } from "../../utils/load-config-file.mjs";
const getUserPluginsConfig = async () => {
  const globalUserConfigPath = join(strapi.dirs.dist.config, "plugins.js");
  const currentEnvUserConfigPath = join(
    strapi.dirs.dist.config,
    "env",
    process.env.NODE_ENV,
    "plugins.js"
  );
  let config = {};
  if (await fse.pathExists(globalUserConfigPath)) {
    config = loadConfigFile(globalUserConfigPath);
  }
  if (await fse.pathExists(currentEnvUserConfigPath)) {
    config = merge(config, loadConfigFile(currentEnvUserConfigPath));
  }
  return config;
};
export {
  getUserPluginsConfig
};
//# sourceMappingURL=get-user-plugins-config.mjs.map
