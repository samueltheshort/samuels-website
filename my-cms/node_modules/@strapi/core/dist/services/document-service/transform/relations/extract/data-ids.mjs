import { curry } from "lodash/fp";
import { relations } from "@strapi/utils";
import { getRelationTargetLocale } from "../utils/i18n.mjs";
import { getRelationTargetStatus } from "../utils/dp.mjs";
import { traverseEntityRelations as traverseEntityRelationsCurried, mapRelation as mapRelationCurried } from "../utils/map-relation.mjs";
const { isPolymorphic } = relations;
const addRelationDocId = curry(
  (idMap, source, targetUid, relation) => {
    const targetLocale = getRelationTargetLocale(relation, {
      targetUid,
      sourceUid: source.uid,
      sourceLocale: source.locale
    });
    const targetStatus = getRelationTargetStatus(relation, {
      targetUid,
      sourceUid: source.uid,
      sourceStatus: source.status
    });
    targetStatus.forEach((status) => {
      idMap.add({
        uid: targetUid,
        documentId: relation.documentId,
        locale: targetLocale,
        status
      });
    });
  }
);
const extractDataIds = (idMap, data, source) => {
  return traverseEntityRelationsCurried(
    async ({ attribute, value }) => {
      if (!attribute) {
        return;
      }
      const isPolymorphicRelation = isPolymorphic(attribute);
      const addDocId = addRelationDocId(idMap, source);
      return mapRelationCurried((relation) => {
        if (!relation || !relation.documentId) {
          return relation;
        }
        const targetUid = isPolymorphicRelation ? relation.__type : attribute.target;
        addDocId(targetUid, relation);
        const position = relation.position;
        let positionTargetUid = targetUid;
        if (isPolymorphicRelation && position?.__type) {
          positionTargetUid = position.__type;
        }
        if (position?.before) {
          addDocId(positionTargetUid, { ...relation, ...position, documentId: position.before });
        }
        if (position?.after) {
          addDocId(positionTargetUid, { ...relation, ...position, documentId: position.after });
        }
        return relation;
      }, value);
    },
    { schema: strapi.getModel(source.uid), getModel: strapi.getModel.bind(strapi) },
    data
  );
};
export {
  extractDataIds
};
//# sourceMappingURL=data-ids.mjs.map
