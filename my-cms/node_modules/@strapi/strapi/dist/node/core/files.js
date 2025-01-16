"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const fs = require("node:fs/promises");
const node = require("esbuild-register/dist/node");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const pathExists = async (path2) => {
  try {
    await fs.access(path2);
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
    const { unregister } = node.register(esbuildOptions);
    const mod = require(path2);
    unregister();
    const file = mod?.default || mod || void 0;
    return file;
  }
  return void 0;
};
const convertSystemPathToModulePath = (sysPath) => {
  if (process.platform === "win32") {
    return sysPath.split(path__default.default.sep).join(path__default.default.posix.sep);
  }
  return sysPath;
};
const convertModulePathToSystemPath = (modulePath) => {
  if (process.platform === "win32") {
    return modulePath.split(path__default.default.posix.sep).join(path__default.default.sep);
  }
  return modulePath;
};
exports.convertModulePathToSystemPath = convertModulePathToSystemPath;
exports.convertSystemPathToModulePath = convertSystemPathToModulePath;
exports.loadFile = loadFile;
exports.pathExists = pathExists;
//# sourceMappingURL=files.js.map
