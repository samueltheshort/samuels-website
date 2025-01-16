"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _ = require("lodash");
const strapiUtils = require("@strapi/utils");
const namespace = require("../../registries/namespace.js");
const validation = require("./validation.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const ___default = /* @__PURE__ */ _interopDefault(_);
const removeNamespacedKeys = (map, namespace$1) => {
  return ___default.default.mapKeys(map, (value, key) => namespace.removeNamespace(key, namespace$1));
};
const defaultModule = {
  config: {},
  routes: [],
  controllers: {},
  services: {},
  contentTypes: {},
  policies: {},
  middlewares: {}
};
const createModule = (namespace2, rawModule, strapi) => {
  ___default.default.defaults(rawModule, defaultModule);
  try {
    validation.validateModule(rawModule);
  } catch (e) {
    if (e instanceof strapiUtils.yup.ValidationError) {
      throw new Error(`strapi-server.js is invalid for '${namespace2}'.
${e.errors.join("\n")}`);
    }
  }
  const called = {};
  return {
    async bootstrap() {
      if (called.bootstrap) {
        throw new Error(`Bootstrap for ${namespace2} has already been called`);
      }
      called.bootstrap = true;
      await (rawModule.bootstrap && rawModule.bootstrap({ strapi }));
    },
    async register() {
      if (called.register) {
        throw new Error(`Register for ${namespace2} has already been called`);
      }
      called.register = true;
      await (rawModule.register && rawModule.register({ strapi }));
    },
    async destroy() {
      if (called.destroy) {
        throw new Error(`Destroy for ${namespace2} has already been called`);
      }
      called.destroy = true;
      await (rawModule.destroy && rawModule.destroy({ strapi }));
    },
    load() {
      strapi.get("content-types").add(namespace2, rawModule.contentTypes);
      strapi.get("services").add(namespace2, rawModule.services);
      strapi.get("policies").add(namespace2, rawModule.policies);
      strapi.get("middlewares").add(namespace2, rawModule.middlewares);
      strapi.get("controllers").add(namespace2, rawModule.controllers);
      strapi.get("config").set(namespace2, rawModule.config);
    },
    get routes() {
      return rawModule.routes ?? {};
    },
    config(path, defaultValue) {
      const pathArray = _.flatten([namespace2, path]);
      return strapi.get("config").get(pathArray, defaultValue);
    },
    contentType(ctName) {
      return strapi.get("content-types").get(`${namespace2}.${ctName}`);
    },
    get contentTypes() {
      const contentTypes = strapi.get("content-types").getAll(namespace2);
      return removeNamespacedKeys(contentTypes, namespace2);
    },
    service(serviceName) {
      return strapi.get("services").get(`${namespace2}.${serviceName}`);
    },
    get services() {
      const services = strapi.get("services").getAll(namespace2);
      return removeNamespacedKeys(services, namespace2);
    },
    policy(policyName) {
      return strapi.get("policies").get(`${namespace2}.${policyName}`);
    },
    get policies() {
      const policies = strapi.get("policies").getAll(namespace2);
      return removeNamespacedKeys(policies, namespace2);
    },
    middleware(middlewareName) {
      return strapi.get("middlewares").get(`${namespace2}.${middlewareName}`);
    },
    get middlewares() {
      const middlewares = strapi.get("middlewares").getAll(namespace2);
      return removeNamespacedKeys(middlewares, namespace2);
    },
    controller(controllerName) {
      return strapi.get("controllers").get(`${namespace2}.${controllerName}`);
    },
    get controllers() {
      const controllers = strapi.get("controllers").getAll(namespace2);
      return removeNamespacedKeys(controllers, namespace2);
    }
  };
};
exports.createModule = createModule;
//# sourceMappingURL=index.js.map
