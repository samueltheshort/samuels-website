"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const getRelationTargetStatus = (relation, opts) => {
  const targetContentType = strapi.getModel(opts.targetUid);
  const sourceContentType = strapi.getModel(opts.sourceUid);
  const targetHasDP = strapiUtils.contentTypes.hasDraftAndPublish(targetContentType);
  const sourceHasDP = strapiUtils.contentTypes.hasDraftAndPublish(sourceContentType);
  if (!targetHasDP) {
    return ["published"];
  }
  if (sourceHasDP && !fp.isNil(opts.sourceStatus)) {
    return [opts.sourceStatus];
  }
  if (relation.status) {
    switch (relation.status) {
      case "published":
        return ["published"];
      default:
        return ["draft"];
    }
  }
  if (!sourceHasDP) {
    return ["draft", "published"];
  }
  return ["draft"];
};
exports.getRelationTargetStatus = getRelationTargetStatus;
//# sourceMappingURL=dp.js.map
