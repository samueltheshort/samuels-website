"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const strapiUtils = require("@strapi/utils");
const getLimitConfigDefaults = () => ({
  defaultLimit: fp.toNumber(strapi.config.get("api.rest.defaultLimit", 25)),
  maxLimit: fp.toNumber(strapi.config.get("api.rest.maxLimit")) || null
});
const isOffsetPagination = (pagination2) => fp.has("start", pagination2) || fp.has("limit", pagination2);
const isPagedPagination = (pagination2) => fp.has("page", pagination2) || fp.has("pageSize", pagination2) || !isOffsetPagination(pagination2);
const shouldCount = (params) => {
  if (fp.has("pagination.withCount", params)) {
    const withCount = params.pagination?.withCount;
    if (typeof withCount === "boolean") {
      return withCount;
    }
    if (typeof withCount === "undefined") {
      return false;
    }
    if (["true", "t", "1", 1].includes(withCount)) {
      return true;
    }
    if (["false", "f", "0", 0].includes(withCount)) {
      return false;
    }
    throw new strapiUtils.errors.ValidationError(
      'Invalid withCount parameter. Expected "t","1","true","false","0","f"'
    );
  }
  return Boolean(strapi.config.get("api.rest.withCount", true));
};
const getPaginationInfo = (params) => {
  const { defaultLimit, maxLimit } = getLimitConfigDefaults();
  const { start, limit } = strapiUtils.pagination.withDefaultPagination(params.pagination || {}, {
    defaults: { offset: { limit: defaultLimit }, page: { pageSize: defaultLimit } },
    maxLimit: maxLimit || -1
  });
  return { start, limit };
};
const transformPaginationResponse = (paginationInfo, total, isPaged) => {
  const transform = isPaged ? strapiUtils.pagination.transformPagedPaginationInfo : strapiUtils.pagination.transformOffsetPaginationInfo;
  const paginationResponse = transform(paginationInfo, total);
  if (fp.isNil(total)) {
    return fp.omit(["total", "pageCount"], paginationResponse);
  }
  return paginationResponse;
};
exports.getPaginationInfo = getPaginationInfo;
exports.isPagedPagination = isPagedPagination;
exports.shouldCount = shouldCount;
exports.transformPaginationResponse = transformPaginationResponse;
//# sourceMappingURL=pagination.js.map
