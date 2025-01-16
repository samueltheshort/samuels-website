import { contentTypes } from "@strapi/utils";
const { CREATED_BY_ATTRIBUTE, UPDATED_BY_ATTRIBUTE } = contentTypes.constants;
const getDeepPopulate = (uid, opts = {}) => {
  const model = strapi.getModel(uid);
  const attributes = Object.entries(model.attributes);
  return attributes.reduce((acc, [attributeName, attribute]) => {
    switch (attribute.type) {
      case "relation": {
        const isMorphRelation = attribute.relation.toLowerCase().startsWith("morph");
        if (isMorphRelation) {
          break;
        }
        const isVisible = contentTypes.isVisibleAttribute(model, attributeName);
        const isCreatorField = [CREATED_BY_ATTRIBUTE, UPDATED_BY_ATTRIBUTE].includes(attributeName);
        if (isVisible || isCreatorField) {
          acc[attributeName] = { select: opts.relationalFields };
        }
        break;
      }
      case "media": {
        acc[attributeName] = { select: ["*"] };
        break;
      }
      case "component": {
        const populate = getDeepPopulate(attribute.component, opts);
        acc[attributeName] = { populate };
        break;
      }
      case "dynamiczone": {
        const populatedComponents = (attribute.components || []).reduce(
          (acc2, componentUID) => {
            acc2[componentUID] = { populate: getDeepPopulate(componentUID, opts) };
            return acc2;
          },
          {}
        );
        acc[attributeName] = { on: populatedComponents };
        break;
      }
    }
    return acc;
  }, {});
};
export {
  getDeepPopulate
};
//# sourceMappingURL=populate.mjs.map
