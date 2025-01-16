"use strict";
const path = require("path");
const fse = require("fs-extra");
const _ = require("lodash");
const strapiUtils = require("@strapi/utils");
const fp = require("lodash/fp");
const index = require("../domain/content-type/index.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const fse__default = /* @__PURE__ */ _interopDefault(fse);
const ___default = /* @__PURE__ */ _interopDefault(_);
const DEFAULT_CONTENT_TYPE = {
  schema: {},
  actions: {},
  lifecycles: {}
};
const normalizeName = (name) => strapiUtils.strings.isKebabCase(name) ? name : ___default.default.kebabCase(name);
const isDirectory = (fd) => fd.isDirectory();
const isDotFile = (fd) => fd.name.startsWith(".");
async function loadAPIs(strapi) {
  if (!fse.existsSync(strapi.dirs.dist.api)) {
    return;
  }
  const apisFDs = await (await fse__default.default.readdir(strapi.dirs.dist.api, { withFileTypes: true })).filter(isDirectory).filter(___default.default.negate(isDotFile));
  const apis = {};
  for (const apiFD of apisFDs) {
    const apiName = normalizeName(apiFD.name);
    const api = await loadAPI(apiName, path.join(strapi.dirs.dist.api, apiFD.name));
    apis[apiName] = api;
  }
  validateContentTypesUnicity(apis);
  for (const apiName of Object.keys(apis)) {
    strapi.get("apis").add(apiName, apis[apiName]);
  }
}
const validateContentTypesUnicity = (apis) => {
  const allApisSchemas = Object.values(apis).flatMap((api) => Object.values(api.contentTypes));
  const names = [];
  allApisSchemas.forEach(({ schema }) => {
    if (schema.info.singularName) {
      const singularName = ___default.default.kebabCase(schema.info.singularName);
      if (names.includes(singularName)) {
        throw new Error(`The singular name "${schema.info.singularName}" should be unique`);
      }
      names.push(singularName);
    }
    if (schema.info.pluralName) {
      const pluralName = ___default.default.kebabCase(schema.info.pluralName);
      if (names.includes(pluralName)) {
        throw new Error(`The plural name "${schema.info.pluralName}" should be unique`);
      }
      names.push(pluralName);
    }
  });
};
const loadAPI = async (apiName, dir) => {
  const [index2, config, routes, controllers, services, policies, middlewares, contentTypes] = (await Promise.all([
    loadIndex(dir),
    loadDir(path.join(dir, "config")),
    loadDir(path.join(dir, "routes")),
    loadDir(path.join(dir, "controllers")),
    loadDir(path.join(dir, "services")),
    loadDir(path.join(dir, "policies")),
    loadDir(path.join(dir, "middlewares")),
    loadContentTypes(apiName, path.join(dir, "content-types"))
  ])).map((result) => result?.result);
  return {
    ...index2 || {},
    config: config || {},
    routes: routes || [],
    controllers: controllers || {},
    services: services || {},
    policies: policies || {},
    middlewares: middlewares || {},
    contentTypes: contentTypes || {}
  };
};
const loadIndex = async (dir) => {
  if (await fse__default.default.pathExists(path.join(dir, "index.js"))) {
    return loadFile(path.join(dir, "index.js"));
  }
};
const loadContentTypes = async (apiName, dir) => {
  if (!await fse__default.default.pathExists(dir)) {
    return;
  }
  const fds = await fse__default.default.readdir(dir, { withFileTypes: true });
  const contentTypes = {};
  for (const fd of fds) {
    if (fd.isFile()) {
      continue;
    }
    const contentTypeName = normalizeName(fd.name);
    const loadedContentType = (await loadDir(path.join(dir, fd.name)))?.result;
    if (fp.isEmpty(loadedContentType) || fp.isEmpty(loadedContentType.schema)) {
      throw new Error(`Could not load content type found at ${dir}`);
    }
    const contentType = {
      ...DEFAULT_CONTENT_TYPE,
      ...loadedContentType
    };
    Object.assign(contentType.schema, {
      apiName,
      collectionName: contentType.schema.collectionName || contentType.schema.info.singularName,
      globalId: index.getGlobalId(contentType.schema)
    });
    contentTypes[normalizeName(contentTypeName)] = contentType;
  }
  return { result: contentTypes };
};
const loadDir = async (dir) => {
  if (!await fse__default.default.pathExists(dir)) {
    return;
  }
  const fds = await fse__default.default.readdir(dir, { withFileTypes: true });
  const root = {};
  for (const fd of fds) {
    if (!fd.isFile() || path.extname(fd.name) === ".map") {
      continue;
    }
    const key = path.basename(fd.name, path.extname(fd.name));
    root[normalizeName(key)] = (await loadFile(path.join(dir, fd.name))).result;
  }
  return { result: root };
};
const loadFile = async (file) => {
  const ext = path.extname(file);
  switch (ext) {
    case ".js":
      return { result: strapiUtils.importDefault(file) };
    case ".json":
      return { result: await fse__default.default.readJSON(file) };
    default:
      return { result: {} };
  }
};
module.exports = loadAPIs;
//# sourceMappingURL=apis.js.map
