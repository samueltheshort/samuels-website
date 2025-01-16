"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const open = require("open");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const open__default = /* @__PURE__ */ _interopDefault(open);
const openBrowser = async (config) => {
  const url = config.get("admin.absoluteUrl");
  return open__default.default(url);
};
exports.openBrowser = openBrowser;
//# sourceMappingURL=open-browser.js.map
