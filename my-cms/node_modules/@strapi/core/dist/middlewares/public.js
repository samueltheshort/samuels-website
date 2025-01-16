"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const koaStatic = require("koa-static");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const koaStatic__default = /* @__PURE__ */ _interopDefault(koaStatic);
const defaults = {
  maxAge: 6e4
};
const publicStatic = (config, { strapi }) => {
  const { maxAge } = fp.defaultsDeep(defaults, config);
  strapi.server.routes([
    {
      method: "GET",
      path: "/",
      handler(ctx) {
        ctx.redirect(strapi.config.get("admin.url", "/admin"));
      },
      config: { auth: false }
    },
    // All other public GET-routes except /uploads/(.*) which is handled in upload middleware
    {
      method: "GET",
      path: "/((?!uploads/).+)",
      handler: koaStatic__default.default(strapi.dirs.static.public, {
        maxage: maxAge,
        defer: true
      }),
      config: { auth: false }
    }
  ]);
};
exports.publicStatic = publicStatic;
//# sourceMappingURL=public.js.map
