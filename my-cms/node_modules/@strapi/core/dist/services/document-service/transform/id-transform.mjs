import { curry } from "lodash/fp";
import { transformData } from "./data.mjs";
import { transformFields } from "./fields.mjs";
import { transformPopulate } from "./populate.mjs";
async function transformParamsDocumentId(uid, query) {
  let data = query.data;
  if (query.data) {
    data = await transformData(query.data, {
      locale: query.locale,
      status: query.status,
      uid
    });
  }
  let fields = query.fields;
  if (query.fields) {
    fields = transformFields(query.fields);
  }
  let populate = query.populate;
  if (query.populate) {
    populate = await transformPopulate(query.populate, { uid });
  }
  return {
    ...query,
    data,
    fields,
    populate
  };
}
const curriedTransformParamsDocumentId = curry(transformParamsDocumentId);
export {
  curriedTransformParamsDocumentId as transformParamsDocumentId
};
//# sourceMappingURL=id-transform.mjs.map
