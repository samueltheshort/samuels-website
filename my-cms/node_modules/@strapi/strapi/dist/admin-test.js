"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const test = require("@strapi/admin/strapi-admin/test");
Object.keys(test).forEach((k) => {
  if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: () => test[k]
  });
});
//# sourceMappingURL=admin-test.js.map
