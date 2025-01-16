"use strict";
const strapiUtils = require("@strapi/utils");
const createQueryParamService = (strapi) => {
  const { transformQueryParams } = strapiUtils.queryParams.createTransformer({
    getModel: (uid) => strapi.getModel(uid)
  });
  return {
    transform: transformQueryParams
  };
};
module.exports = createQueryParamService;
//# sourceMappingURL=query-params.js.map
