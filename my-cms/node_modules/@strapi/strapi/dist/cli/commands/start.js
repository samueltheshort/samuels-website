"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const commander = require("commander");
const fs = require("fs");
const tsUtils = require("@strapi/typescript-utils");
const core = require("@strapi/core");
const helpers = require("../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const tsUtils__default = /* @__PURE__ */ _interopDefault(tsUtils);
const action = async () => {
  const appDir = process.cwd();
  const isTSProject = await tsUtils__default.default.isUsingTypeScript(appDir);
  const outDir = await tsUtils__default.default.resolveOutDir(appDir);
  const distDir = isTSProject ? outDir : appDir;
  const buildDirExists = fs__default.default.existsSync(outDir);
  if (isTSProject && !buildDirExists)
    throw new Error(
      `${outDir} directory not found. Please run the build command before starting your application`
    );
  core.createStrapi({ appDir, distDir }).start();
};
const command = () => {
  return commander.createCommand("start").description("Start your Strapi application").action(helpers.runAction("start", action));
};
exports.command = command;
//# sourceMappingURL=start.js.map
