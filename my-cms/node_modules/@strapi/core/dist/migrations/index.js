"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const draftPublish = require("./draft-publish.js");
const i18n = require("./i18n.js");
const enable = async ({ oldContentTypes, contentTypes }) => {
  await i18n.enable({ oldContentTypes, contentTypes });
  await draftPublish.enable({ oldContentTypes, contentTypes });
};
const disable = async ({ oldContentTypes, contentTypes }) => {
  await i18n.disable({ oldContentTypes, contentTypes });
  await draftPublish.disable({ oldContentTypes, contentTypes });
};
exports.disable = disable;
exports.enable = enable;
//# sourceMappingURL=index.js.map
