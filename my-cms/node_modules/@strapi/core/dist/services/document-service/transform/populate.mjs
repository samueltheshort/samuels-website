import { traverse } from "@strapi/utils";
import { transformFields } from "./fields.mjs";
const transformPopulate = async (data, opts) => {
  return traverse.traverseQueryPopulate(
    async ({ attribute, key, value }, { set }) => {
      if (!value || typeof value !== "object" || attribute?.type !== "relation") {
        return;
      }
      if ("fields" in value && Array.isArray(value.fields)) {
        value.fields = transformFields(value.fields);
      }
      set(key, value);
    },
    { schema: strapi.getModel(opts.uid), getModel: strapi.getModel.bind(strapi) },
    data
  );
};
export {
  transformPopulate
};
//# sourceMappingURL=populate.mjs.map
