"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const wrapInTransaction = (fn) => {
  return (...args) => strapi.db.transaction?.(() => fn(...args));
};
exports.wrapInTransaction = wrapInTransaction;
//# sourceMappingURL=common.js.map
