"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const srcIndex = require("./src-index.js");
const apis = require("./apis.js");
const middlewares = require("./middlewares.js");
const components = require("./components.js");
const policies = require("./policies.js");
const index = require("./plugins/index.js");
const sanitizers = require("./sanitizers.js");
const validators = require("./validators.js");
async function loadApplicationContext(strapi) {
  await Promise.all([
    srcIndex(strapi),
    sanitizers(strapi),
    validators(strapi),
    index(strapi),
    apis(strapi),
    components(strapi),
    middlewares(strapi),
    policies(strapi)
  ]);
}
exports.loadApplicationContext = loadApplicationContext;
//# sourceMappingURL=index.js.map
