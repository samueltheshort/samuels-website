"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const singleType = require("./single-type.js");
const collectionType = require("./collection-type.js");
const isSingleType = (contentType) => strapiUtils.contentTypes.isSingleType(contentType);
function createService({
  contentType
}) {
  if (isSingleType(contentType)) {
    return singleType.createSingleTypeService(contentType);
  }
  return collectionType.createCollectionTypeService(contentType);
}
exports.createService = createService;
//# sourceMappingURL=index.js.map
