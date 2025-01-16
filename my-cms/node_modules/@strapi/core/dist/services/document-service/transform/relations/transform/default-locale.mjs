import { isLocalizedContentType, getDefaultLocale } from "../utils/i18n.mjs";
import { traverseEntityRelations as traverseEntityRelationsCurried, mapRelation as mapRelationCurried } from "../utils/map-relation.mjs";
const setDefaultLocaleToRelations = (data, uid) => {
  if (isLocalizedContentType(uid)) {
    return data;
  }
  let defaultLocale;
  return traverseEntityRelationsCurried(
    async ({ key, value }, { set }) => {
      const relation = await mapRelationCurried(async (relation2) => {
        if (!relation2 || !relation2?.documentId || relation2?.locale) {
          return relation2;
        }
        if (!defaultLocale) {
          defaultLocale = await getDefaultLocale();
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
export {
  setDefaultLocaleToRelations
};
//# sourceMappingURL=default-locale.mjs.map
