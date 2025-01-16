import { curry } from "lodash/fp";
import { errors, relations } from "@strapi/utils";
import { getRelationTargetLocale } from "../utils/i18n.mjs";
import { getRelationTargetStatus } from "../utils/dp.mjs";
import { traverseEntityRelations as traverseEntityRelationsCurried, mapRelation as mapRelationCurried } from "../utils/map-relation.mjs";
const { isPolymorphic } = relations;
const getRelationIds = curry(
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
    const ids = [];
    for (const tStatus of targetStatus) {
      const entryId = idMap.get({
        uid: targetUid,
        documentId: relation.documentId,
        locale: targetLocale,
        status: tStatus
      });
      if (entryId) ids.push(entryId);
    }
    if (!ids.length && !source.allowMissingId) {
      throw new errors.ValidationError(
        `Document with id "${relation.documentId}", locale "${targetLocale}" not found`
      );
    }
    return ids;
  }
);
const transformDataIdsVisitor = (idMap, data, source) => {
  return traverseEntityRelationsCurried(
    async ({ key, value, attribute }, { set }) => {
      if (!attribute) {
        return;
      }
      const isPolymorphicRelation = isPolymorphic(attribute);
      const getIds = getRelationIds(idMap, source);
      const newRelation = await mapRelationCurried((relation) => {
        if (!relation || !relation.documentId) {
          return relation;
        }
        const targetUid = isPolymorphicRelation ? relation.__type : attribute.target;
        const ids = getIds(targetUid, relation);
        const position = { ...relation.position };
        let positionTargetUid = targetUid;
        if (isPolymorphicRelation && position?.__type) {
          positionTargetUid = position.__type;
        }
        if (position.before) {
          const beforeRelation = { ...relation, ...position, documentId: position.before };
          const beforeIds = getIds(positionTargetUid, beforeRelation);
          position.before = beforeIds.at(0);
        }
        if (position.after) {
          const afterRelation = { ...relation, ...position, documentId: position.after };
          position.after = getIds(positionTargetUid, afterRelation).at(0);
        }
        return ids?.map((id) => {
          const newRelation2 = { id };
          if (relation.position) {
            newRelation2.position = position;
          }
          if (isPolymorphicRelation) {
            newRelation2.__type = targetUid;
          }
          return newRelation2;
        });
      }, value);
      set(key, newRelation);
    },
    { schema: strapi.getModel(source.uid), getModel: strapi.getModel.bind(strapi) },
    data
  );
};
export {
  transformDataIdsVisitor
};
//# sourceMappingURL=data-ids.mjs.map
