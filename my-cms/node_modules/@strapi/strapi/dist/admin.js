"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiAdmin = require("@strapi/admin/strapi-admin");
const contentTypeBuilder = require("@strapi/content-type-builder/strapi-admin");
const contentManager = require("@strapi/content-manager/strapi-admin");
const email = require("@strapi/email/strapi-admin");
const upload = require("@strapi/upload/strapi-admin");
const i18n = require("@strapi/i18n/strapi-admin");
const contentReleases = require("@strapi/content-releases/strapi-admin");
const reviewWorkflows = require("@strapi/review-workflows/strapi-admin");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const contentTypeBuilder__default = /* @__PURE__ */ _interopDefault(contentTypeBuilder);
const contentManager__default = /* @__PURE__ */ _interopDefault(contentManager);
const email__default = /* @__PURE__ */ _interopDefault(email);
const upload__default = /* @__PURE__ */ _interopDefault(upload);
const i18n__default = /* @__PURE__ */ _interopDefault(i18n);
const contentReleases__default = /* @__PURE__ */ _interopDefault(contentReleases);
const reviewWorkflows__default = /* @__PURE__ */ _interopDefault(reviewWorkflows);
const render = (mountNode, { plugins, ...restArgs }) => {
  return strapiAdmin.renderAdmin(mountNode, {
    ...restArgs,
    plugins: {
      "content-manager": contentManager__default.default,
      "content-type-builder": contentTypeBuilder__default.default,
      email: email__default.default,
      upload: upload__default.default,
      contentReleases: contentReleases__default.default,
      i18n: i18n__default.default,
      reviewWorkflows: reviewWorkflows__default.default,
      ...plugins
    }
  });
};
Object.defineProperty(exports, "private_AutoReloadOverlayBlockerProvider", {
  enumerable: true,
  get: () => contentTypeBuilder.private_AutoReloadOverlayBlockerProvider
});
Object.defineProperty(exports, "private_useAutoReloadOverlayBlocker", {
  enumerable: true,
  get: () => contentTypeBuilder.private_useAutoReloadOverlayBlocker
});
Object.defineProperty(exports, "unstable_useContentManagerContext", {
  enumerable: true,
  get: () => contentManager.unstable_useContentManagerContext
});
Object.defineProperty(exports, "unstable_useDocument", {
  enumerable: true,
  get: () => contentManager.unstable_useDocument
});
Object.defineProperty(exports, "unstable_useDocumentActions", {
  enumerable: true,
  get: () => contentManager.unstable_useDocumentActions
});
Object.defineProperty(exports, "unstable_useDocumentLayout", {
  enumerable: true,
  get: () => contentManager.unstable_useDocumentLayout
});
Object.defineProperty(exports, "useDocumentRBAC", {
  enumerable: true,
  get: () => contentManager.useDocumentRBAC
});
exports.renderAdmin = render;
Object.keys(strapiAdmin).forEach((k) => {
  if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: () => strapiAdmin[k]
  });
});
//# sourceMappingURL=admin.js.map
