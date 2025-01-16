"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const webpack = require("webpack");
const config = require("./config.js");
const errors = require("../core/errors.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const webpack__default = /* @__PURE__ */ _interopDefault(webpack);
const build = async (ctx) => {
  const config$1 = await config.resolveProductionConfig(ctx);
  const finalConfig = await config.mergeConfigWithUserConfig(config$1, ctx);
  ctx.logger.debug("Webpack config", finalConfig);
  return new Promise((resolve, reject) => {
    webpack__default.default(finalConfig, (err, stats) => {
      if (stats) {
        if (stats.hasErrors()) {
          ctx.logger.error(
            stats.toString({
              chunks: false,
              colors: true
            })
          );
          reject();
        } else if (ctx.options.stats) {
          ctx.logger.info(
            stats.toString({
              chunks: false,
              colors: true
            })
          );
        }
        resolve(true);
      }
      if (err && errors.isError(err)) {
        ctx.logger.error(err.message);
        reject();
      }
    });
  });
};
exports.build = build;
//# sourceMappingURL=build.js.map
