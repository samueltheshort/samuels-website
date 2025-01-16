"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("node:path");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const resolveWorkingDirectories = (opts) => {
  const cwd = process.cwd();
  const appDir = opts.appDir ? path__default.default.resolve(cwd, opts.appDir) : cwd;
  const distDir = opts.distDir ? path__default.default.resolve(cwd, opts.distDir) : appDir;
  return { appDir, distDir };
};
exports.resolveWorkingDirectories = resolveWorkingDirectories;
//# sourceMappingURL=resolve-working-dirs.js.map
