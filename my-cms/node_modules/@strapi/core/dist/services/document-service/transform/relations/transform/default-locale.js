"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const i18n = require("../utils/i18n.js");
const mapRelation = require("../utils/map-relation.js");
const setDefaultLocaleToRelations = (data, uid) => {
  if (i18n.isLocalizedContentType(uid)) {
    return data;
  }
  let defaultLocale;
  return mapRelation.traverseEntityRelations(
    async ({ key, value }, { set }) => {
      const relation = await mapRelation.mapRelation(async (relation2) => {
        if (!relation2 || !relation2?.documentId || relation2?.locale) {
          return relation2;
        }
        if (!defaultLocale) {
          defaultLocale = await i18n.getDefaultLocale();
        }
        const position = relation2.position;
        if (position && typeof position === "object" && !position.locale) {
          relation2.position.locale = defaultLocale;
        }
        return { ...relation2, locale: defaultLocale };
      }, value);
      set(key, relation);
    },
    { schema: strapi.getModel(uid), getModel: strapi.getModel.bind(strapi) },
    data
  );
};
exports.setDefaultLocaleToRelations = setDefaultLocaleToRelations;
//# sourceMappingURL=default-locale.js.map
