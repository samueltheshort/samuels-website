import { isNil } from "lodash/fp";
import { contentTypes } from "@strapi/utils";
const getRelationTargetStatus = (relation, opts) => {
  const targetContentType = strapi.getModel(opts.targetUid);
  const sourceContentType = strapi.getModel(opts.sourceUid);
  const targetHasDP = contentTypes.hasDraftAndPublish(targetContentType);
  const sourceHasDP = contentTypes.hasDraftAndPublish(sourceContentType);
  if (!targetHasDP) {
    return ["published"];
  }
  if (sourceHasDP && !isNil(opts.sourceStatus)) {
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
export {
  getRelationTargetStatus
};
//# sourceMappingURL=dp.mjs.map
