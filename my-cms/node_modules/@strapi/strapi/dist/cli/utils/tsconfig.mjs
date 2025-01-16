import os from "os";
import ts from "typescript";
const loadTsConfig = ({
  cwd,
  path,
  logger
}) => {
  const configPath = ts.findConfigFile(cwd, ts.sys.fileExists, path);
  if (!configPath) {
    return void 0;
  }
  const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
  const parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, cwd);
  logger.debug(`Loaded user TS config:`, os.EOL, parsedConfig);
  return {
    config: parsedConfig,
    path: configPath
  };
};
export {
  loadTsConfig
};
//# sourceMappingURL=tsconfig.mjs.map
