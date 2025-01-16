"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const _ = require("lodash");
const strapiUtils = require("@strapi/utils");
const validator = require("./validator.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const ___default = /* @__PURE__ */ _interopDefault(_);
const {
  CREATED_AT_ATTRIBUTE,
  UPDATED_AT_ATTRIBUTE,
  PUBLISHED_AT_ATTRIBUTE,
  CREATED_BY_ATTRIBUTE,
  UPDATED_BY_ATTRIBUTE
} = strapiUtils.contentTypes.constants;
const createContentType = (uid, definition) => {
  try {
    validator.validateContentTypeDefinition(definition);
  } catch (e) {
    if (e instanceof strapiUtils.yup.ValidationError) {
      throw new Error(`Content Type Definition is invalid for ${uid}'.
${e.errors}`);
    }
    throw e;
  }
  const { schema, actions, lifecycles } = fp.cloneDeep(definition);
  Object.assign(schema, {
    uid,
    modelType: "contentType",
    kind: schema.kind || "collectionType",
    __schema__: pickSchema(definition.schema),
    modelName: definition.schema.info.singularName,
    actions,
    lifecycles
  });
  addTimestamps(schema);
  addDraftAndPublish(schema);
  addCreatorFields(schema);
  return schema;
};
const addTimestamps = (schema) => {
  Object.assign(schema.attributes, {
    [CREATED_AT_ATTRIBUTE]: {
      type: "datetime"
    },
    // TODO: handle on edit set to new date
    [UPDATED_AT_ATTRIBUTE]: {
      type: "datetime"
    }
  });
};
const addDraftAndPublish = (schema) => {
  if (!___default.default.has(schema, "options.draftAndPublish")) {
    ___default.default.set(schema, "options.draftAndPublish", false);
  }
  schema.attributes[PUBLISHED_AT_ATTRIBUTE] = {
    type: "datetime",
    configurable: false,
    writable: true,
    visible: false,
    default() {
      return /* @__PURE__ */ new Date();
    }
  };
};
const addCreatorFields = (schema) => {
  const isPrivate = !___default.default.get(schema, "options.populateCreatorFields", false);
  schema.attributes[CREATED_BY_ATTRIBUTE] = {
    type: "relation",
    relation: "oneToOne",
    target: "admin::user",
    configurable: false,
    writable: false,
    visible: false,
    useJoinTable: false,
    private: isPrivate
  };
  schema.attributes[UPDATED_BY_ATTRIBUTE] = {
    type: "relation",
    relation: "oneToOne",
    target: "admin::user",
    configurable: false,
    writable: false,
    visible: false,
    useJoinTable: false,
    private: isPrivate
  };
};
const getGlobalId = (schema, prefix) => {
  const modelName = schema.info.singularName;
  const globalId = prefix ? `${prefix}-${modelName}` : modelName;
  return schema.globalId || ___default.default.upperFirst(___default.default.camelCase(globalId));
};
const pickSchema = (model) => {
  const schema = ___default.default.cloneDeep(
    ___default.default.pick(model, [
      "connection",
      "collectionName",
      "info",
      "options",
      "pluginOptions",
      "attributes",
      "kind"
    ])
  );
  schema.kind = model.kind || "collectionType";
  return schema;
};
exports.createContentType = createContentType;
exports.getGlobalId = getGlobalId;
//# sourceMappingURL=index.js.map
