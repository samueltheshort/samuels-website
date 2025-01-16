"use strict";
const strapiUtils = require("@strapi/utils");
const provider = require("./provider.js");
const contentTypes = require("../registries/content-types.js");
const components = require("../registries/components.js");
const services = require("../registries/services.js");
const policies = require("../registries/policies.js");
const middlewares = require("../registries/middlewares.js");
const hooks = require("../registries/hooks.js");
const controllers = require("../registries/controllers.js");
const modules = require("../registries/modules.js");
const plugins = require("../registries/plugins.js");
const customFields = require("../registries/custom-fields.js");
const apis = require("../registries/apis.js");
const sanitizers = require("../registries/sanitizers.js");
const validators = require("../registries/validators.js");
const models = require("../registries/models.js");
const index = require("../loaders/index.js");
const index$1 = require("../migrations/index.js");
const _5_0_0DiscardDrafts = require("../migrations/database/5.0.0-discard-drafts.js");
const registries = provider.defineProvider({
  init(strapi) {
    strapi.add("content-types", () => contentTypes()).add("components", () => components()).add("services", () => services(strapi)).add("policies", () => policies()).add("middlewares", () => middlewares()).add("hooks", () => hooks()).add("controllers", () => controllers(strapi)).add("modules", () => modules(strapi)).add("plugins", () => plugins(strapi)).add("custom-fields", () => customFields(strapi)).add("apis", () => apis(strapi)).add("models", () => models.registry()).add("sanitizers", sanitizers()).add("validators", validators());
  },
  async register(strapi) {
    await index.loadApplicationContext(strapi);
    strapi.get("hooks").set("strapi::content-types.beforeSync", strapiUtils.hooks.createAsyncParallelHook());
    strapi.get("hooks").set("strapi::content-types.afterSync", strapiUtils.hooks.createAsyncParallelHook());
    strapi.hook("strapi::content-types.beforeSync").register(index$1.disable);
    strapi.hook("strapi::content-types.afterSync").register(index$1.enable);
    strapi.db.migrations.providers.internal.register(_5_0_0DiscardDrafts.discardDocumentDrafts);
  }
});
module.exports = registries;
//# sourceMappingURL=registries.js.map
