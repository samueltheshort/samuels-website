import path from "node:path";
import { access } from "node:fs/promises";
import { register } from "esbuild-register/dist/node";
const pathExists = async (path2) => {
  try {
    await access(path2);
    return true;
  } catch (error) {
    return false;
  }
};
const loadFile = async (path2) => {
  if (await pathExists(path2)) {
    const esbuildOptions = {
      extensions: [".js", ".mjs", ".ts"]
    };
    const { unregister } = register(esbuildOptions);
    const mod = require(path2);
    unregister();
    const file = mod?.default || mod || void 0;
    return file;
  }
  return void 0;
};
const convertSystemPathToModulePath = (sysPath) => {
  if (process.platform === "win32") {
    return sysPath.split(path.sep).join(path.posix.sep);
  }
  return sysPath;
};
const convertModulePathToSystemPath = (modulePath) => {
  if (process.platform === "win32") {
    return modulePath.split(path.posix.sep).join(path.sep);
  }
  return modulePath;
};
export {
  convertModulePathToSystemPath,
  convertSystemPathToModulePath,
  loadFile,
  pathExists
};
//# sourceMappingURL=files.mjs.map
