"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const i18n = require("../utils/i18n.js");
const dp = require("../utils/dp.js");
const mapRelation = require("../utils/map-relation.js");
const { isPolymorphic } = strapiUtils.relations;
const getRelationIds = fp.curry(
  (idMap, source, targetUid, relation) => {
    const targetLocale = i18n.getRelationTargetLocale(relation, {
      targetUid,
      sourceUid: source.uid,
      sourceLocale: source.locale
    });
    const targetStatus = dp.getRelationTargetStatus(relation, {
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
      throw new strapiUtils.errors.ValidationError(
        `Document with id "${relation.documentId}", locale "${targetLocale}" not found`
      );
    }
    return ids;
  }
);
const transformDataIdsVisitor = (idMap, data, source) => {
  return mapRelation.traverseEntityRelations(
    async ({ key, value, attribute }, { set }) => {
      if (!attribute) {
        return;
      }
      const isPolymorphicRelation = isPolymorphic(attribute);
      const getIds = getRelationIds(idMap, source);
      const newRelation = await mapRelation.mapRelation((relation) => {
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
exports.transformDataIdsVisitor = transformDataIdsVisitor;
//# sourceMappingURL=data-ids.js.map
