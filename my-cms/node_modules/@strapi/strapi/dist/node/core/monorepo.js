"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const path = require("path");
const readPkgUp = require("read-pkg-up");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const path__default = /* @__PURE__ */ _interopDefault(path);
const readPkgUp__default = /* @__PURE__ */ _interopDefault(readPkgUp);
async function loadStrapiMonorepo(cwd) {
  let p = cwd;
  while (p !== "/") {
    const readResult = await readPkgUp__default.default({ cwd: p });
    if (!readResult) {
      return void 0;
    }
    if (readResult.packageJson.isStrapiMonorepo) {
      return { path: path__default.default.dirname(readResult.path) };
    }
    p = path__default.default.dirname(path__default.default.dirname(readResult.path));
  }
  return void 0;
}
exports.loadStrapiMonorepo = loadStrapiMonorepo;
//# sourceMappingURL=monorepo.js.map
