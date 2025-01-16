"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const data = require("./data.js");
const fields = require("./fields.js");
const populate = require("./populate.js");
async function transformParamsDocumentId(uid, query) {
  let data$1 = query.data;
  if (query.data) {
    data$1 = await data.transformData(query.data, {
      locale: query.locale,
      status: query.status,
      uid
    });
  }
  let fields$1 = query.fields;
  if (query.fields) {
    fields$1 = fields.transformFields(query.fields);
  }
  let populate$1 = query.populate;
  if (query.populate) {
    populate$1 = await populate.transformPopulate(query.populate, { uid });
  }
  return {
    ...query,
    data: data$1,
    fields: fields$1,
    populate: populate$1
  };
}
const curriedTransformParamsDocumentId = fp.curry(transformParamsDocumentId);
exports.transformParamsDocumentId = curriedTransformParamsDocumentId;
//# sourceMappingURL=id-transform.js.map
