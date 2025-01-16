"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const isInitialized = async (strapi) => {
  try {
    if (fp.isEmpty(strapi.admin)) {
      return true;
    }
    const anyAdministrator = await strapi.db.query("admin::user").findOne({ select: ["id"] });
    return !fp.isNil(anyAdministrator);
  } catch (err) {
    strapi.stopWithError(err);
  }
};
exports.isInitialized = isInitialized;
//# sourceMappingURL=is-initialized.js.map
