"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const errors = require("./middlewares/errors.js");
const middlewareManager = require("./middlewares/middleware-manager.js");
const repository = require("./repository.js");
const data = require("./transform/data.js");
const index = require("../entity-validator/index.js");
const createDocumentService = (strapi, validator = index) => {
  const repositories = /* @__PURE__ */ new Map();
  const middlewares = middlewareManager.createMiddlewareManager();
  middlewares.use(errors.databaseErrorsMiddleware);
  const factory = function factory2(uid) {
    if (repositories.has(uid)) {
      return repositories.get(uid);
    }
    const contentType = strapi.contentType(uid);
    const repository$1 = repository.createContentTypeRepository(uid, validator);
    const instance = middlewares.wrapObject(
      repository$1,
      { uid, contentType },
      {
        exclude: ["updateComponents", "omitComponentData"]
      }
    );
    repositories.set(uid, instance);
    return instance;
  };
  return Object.assign(factory, {
    utils: {
      transformData: data.transformData
    },
    use: middlewares.use.bind(middlewares)
  });
};
exports.createDocumentService = createDocumentService;
//# sourceMappingURL=index.js.map
