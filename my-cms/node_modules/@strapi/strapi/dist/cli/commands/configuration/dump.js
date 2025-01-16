"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fs = require("fs");
const commander = require("commander");
const core = require("@strapi/core");
const helpers = require("../../utils/helpers.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const CHUNK_SIZE = 100;
const action = async ({ file: filePath, pretty }) => {
  const output = filePath ? fs__default.default.createWriteStream(filePath) : process.stdout;
  const appContext = await core.compileStrapi();
  const app = await core.createStrapi(appContext).load();
  const count = await app.query("strapi::core-store").count();
  const exportData = [];
  const pageCount = Math.ceil(count / CHUNK_SIZE);
  for (let page = 0; page < pageCount; page += 1) {
    const results = await app.query("strapi::core-store").findMany({ limit: CHUNK_SIZE, offset: page * CHUNK_SIZE, orderBy: "key" });
    results.filter((result) => result.key.startsWith("plugin_")).forEach((result) => {
      exportData.push({
        key: result.key,
        value: result.value,
        type: result.type,
        environment: result.environment,
        tag: result.tag
      });
    });
  }
  const str = JSON.stringify(exportData, null, pretty ? 2 : void 0);
  output.write(str);
  output.write("\n");
  output.end();
  if (filePath) {
    console.log(`Successfully exported ${exportData.length} configuration entries`);
  }
  process.exit(0);
};
const command = () => {
  return commander.createCommand("configuration:dump").alias("config:dump").description("Dump configurations of your application").option("-f, --file <file>", "Output file, default output is stdout").option("-p, --pretty", "Format the output JSON with indentation and line breaks", false).action(helpers.runAction("configuration:dump", action));
};
exports.action = action;
exports.command = command;
//# sourceMappingURL=dump.js.map
