"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const i18n = require("../utils/i18n.js");
const dp = require("../utils/dp.js");
const mapRelation = require("../utils/map-relation.js");
const { isPolymorphic } = strapiUtils.relations;
const addRelationDocId = fp.curry(
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
  return mapRelation.traverseEntityRelations(
    async ({ attribute, value }) => {
      if (!attribute) {
        return;
      }
      const isPolymorphicRelation = isPolymorphic(attribute);
      const addDocId = addRelationDocId(idMap, source);
      return mapRelation.mapRelation((relation) => {
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
exports.extractDataIds = extractDataIds;
//# sourceMappingURL=data-ids.js.map
