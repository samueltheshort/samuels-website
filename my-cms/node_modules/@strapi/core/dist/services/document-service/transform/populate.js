"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const fields = require("./fields.js");
const transformPopulate = async (data, opts) => {
  return strapiUtils.traverse.traverseQueryPopulate(
    async ({ attribute, key, value }, { set }) => {
      if (!value || typeof value !== "object" || attribute?.type !== "relation") {
        return;
      }
      if ("fields" in value && Array.isArray(value.fields)) {
        value.fields = fields.transformFields(value.fields);
      }
      set(key, value);
    },
    { schema: strapi.getModel(opts.uid), getModel: strapi.getModel.bind(strapi) },
    data
  );
};
exports.transformPopulate = transformPopulate;
//# sourceMappingURL=populate.js.map
