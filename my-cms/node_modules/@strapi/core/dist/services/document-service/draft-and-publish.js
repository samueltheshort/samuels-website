"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const setStatusToDraft = (contentType, params) => {
  if (!strapiUtils.contentTypes.hasDraftAndPublish(contentType) && params.status) {
    return params;
  }
  return fp.assoc("status", "draft", params);
};
const defaultToDraft = (params) => {
  if (!params.status || params.status !== "published") {
    return fp.assoc("status", "draft", params);
  }
  return params;
};
const defaultStatus = (contentType, params) => {
  if (!strapiUtils.contentTypes.hasDraftAndPublish(contentType)) {
    return params;
  }
  if (!params.status || params.status !== "published") {
    return defaultToDraft(params);
  }
  return params;
};
const filterDataPublishedAt = (params) => {
  if (params?.data?.publishedAt) {
    return fp.assoc(["data", "publishedAt"], null, params);
  }
  return params;
};
const statusToLookup = (contentType, params) => {
  if (!strapiUtils.contentTypes.hasDraftAndPublish(contentType)) {
    return params;
  }
  const lookup = params.lookup || {};
  switch (params?.status) {
    case "published":
      return fp.assoc(["lookup", "publishedAt"], { $notNull: true }, params);
    case "draft":
      return fp.assoc(["lookup", "publishedAt"], { $null: true }, params);
  }
  return fp.assoc("lookup", lookup, params);
};
const statusToData = (contentType, params) => {
  if (!strapiUtils.contentTypes.hasDraftAndPublish(contentType)) {
    return fp.assoc(["data", "publishedAt"], /* @__PURE__ */ new Date(), params);
  }
  switch (params?.status) {
    case "published":
      return fp.assoc(["data", "publishedAt"], /* @__PURE__ */ new Date(), params);
    case "draft":
      return fp.assoc(["data", "publishedAt"], null, params);
  }
  return params;
};
const setStatusToDraftCurry = fp.curry(setStatusToDraft);
const defaultToDraftCurry = fp.curry(defaultToDraft);
const defaultStatusCurry = fp.curry(defaultStatus);
const filterDataPublishedAtCurry = fp.curry(filterDataPublishedAt);
const statusToLookupCurry = fp.curry(statusToLookup);
const statusToDataCurry = fp.curry(statusToData);
exports.defaultStatus = defaultStatusCurry;
exports.defaultToDraft = defaultToDraftCurry;
exports.filterDataPublishedAt = filterDataPublishedAtCurry;
exports.setStatusToDraft = setStatusToDraftCurry;
exports.statusToData = statusToDataCurry;
exports.statusToLookup = statusToLookupCurry;
//# sourceMappingURL=draft-and-publish.js.map
