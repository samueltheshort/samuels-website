import { databaseErrorsMiddleware } from "./middlewares/errors.mjs";
import { createMiddlewareManager } from "./middlewares/middleware-manager.mjs";
import { createContentTypeRepository } from "./repository.mjs";
import { transformData } from "./transform/data.mjs";
import entityValidator from "../entity-validator/index.mjs";
const createDocumentService = (strapi, validator = entityValidator) => {
  const repositories = /* @__PURE__ */ new Map();
  const middlewares = createMiddlewareManager();
  middlewares.use(databaseErrorsMiddleware);
  const factory = function factory2(uid) {
    if (repositories.has(uid)) {
      return repositories.get(uid);
    }
    const contentType = strapi.contentType(uid);
    const repository = createContentTypeRepository(uid, validator);
    const instance = middlewares.wrapObject(
      repository,
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
      transformData
    },
    use: middlewares.use.bind(middlewares)
  });
};
export {
  createDocumentService
};
//# sourceMappingURL=index.mjs.map
