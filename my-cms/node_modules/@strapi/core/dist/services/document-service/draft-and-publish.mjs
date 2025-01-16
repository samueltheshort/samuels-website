import { curry, assoc } from "lodash/fp";
import { contentTypes } from "@strapi/utils";
const setStatusToDraft = (contentType, params) => {
  if (!contentTypes.hasDraftAndPublish(contentType) && params.status) {
    return params;
  }
  return assoc("status", "draft", params);
};
const defaultToDraft = (params) => {
  if (!params.status || params.status !== "published") {
    return assoc("status", "draft", params);
  }
  return params;
};
const defaultStatus = (contentType, params) => {
  if (!contentTypes.hasDraftAndPublish(contentType)) {
    return params;
  }
  if (!params.status || params.status !== "published") {
    return defaultToDraft(params);
  }
  return params;
};
const filterDataPublishedAt = (params) => {
  if (params?.data?.publishedAt) {
    return assoc(["data", "publishedAt"], null, params);
  }
  return params;
};
const statusToLookup = (contentType, params) => {
  if (!contentTypes.hasDraftAndPublish(contentType)) {
    return params;
  }
  const lookup = params.lookup || {};
  switch (params?.status) {
    case "published":
      return assoc(["lookup", "publishedAt"], { $notNull: true }, params);
    case "draft":
      return assoc(["lookup", "publishedAt"], { $null: true }, params);
  }
  return assoc("lookup", lookup, params);
};
const statusToData = (contentType, params) => {
  if (!contentTypes.hasDraftAndPublish(contentType)) {
    return assoc(["data", "publishedAt"], /* @__PURE__ */ new Date(), params);
  }
  switch (params?.status) {
    case "published":
      return assoc(["data", "publishedAt"], /* @__PURE__ */ new Date(), params);
    case "draft":
      return assoc(["data", "publishedAt"], null, params);
  }
  return params;
};
const setStatusToDraftCurry = curry(setStatusToDraft);
const defaultToDraftCurry = curry(defaultToDraft);
const defaultStatusCurry = curry(defaultStatus);
const filterDataPublishedAtCurry = curry(filterDataPublishedAt);
const statusToLookupCurry = curry(statusToLookup);
const statusToDataCurry = curry(statusToData);
export {
  defaultStatusCurry as defaultStatus,
  defaultToDraftCurry as defaultToDraft,
  filterDataPublishedAtCurry as filterDataPublishedAt,
  setStatusToDraftCurry as setStatusToDraft,
  statusToDataCurry as statusToData,
  statusToLookupCurry as statusToLookup
};
//# sourceMappingURL=draft-and-publish.mjs.map
