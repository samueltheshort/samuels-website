"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const files = require("./files.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const ADMIN_APP_FILES = ["app.js", "app.mjs", "app.ts", "app.jsx", "app.tsx"];
const loadUserAppFile = async ({
  runtimeDir,
  appDir
}) => {
  for (const file of ADMIN_APP_FILES) {
    const filePath = path__default.default.join(appDir, "src", "admin", file);
    if (await files.pathExists(filePath)) {
      return {
        path: filePath,
        modulePath: files.convertSystemPathToModulePath(path__default.default.relative(runtimeDir, filePath))
      };
    }
  }
  return void 0;
};
exports.loadUserAppFile = loadUserAppFile;
//# sourceMappingURL=admin-customisations.js.map
