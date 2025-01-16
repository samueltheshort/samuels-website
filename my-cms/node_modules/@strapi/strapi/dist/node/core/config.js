"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const files = require("./files.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const getUserConfig = async (fileNames, ctx) => {
  for (const file of fileNames) {
    const filePath = path__default.default.join(ctx.appDir, "src", "admin", file);
    const configFile = await files.loadFile(filePath);
    if (configFile) {
      return configFile;
    }
  }
  return void 0;
};
exports.getUserConfig = getUserConfig;
//# sourceMappingURL=config.js.map
