"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const boxen = require("boxen");
const chalk = require("chalk");
const os = require("node:os");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const boxen__default = /* @__PURE__ */ _interopDefault(boxen);
const chalk__default = /* @__PURE__ */ _interopDefault(chalk);
const os__default = /* @__PURE__ */ _interopDefault(os);
const isError = (err) => err instanceof Error;
const handleUnexpectedError = (err) => {
  console.error(
    chalk__default.default.red(
      `[ERROR] `,
      "There seems to be an unexpected error, try again with --debug for more information",
      os__default.default.EOL
    )
  );
  if (isError(err) && err.stack) {
    console.log(
      chalk__default.default.red(
        boxen__default.default(err.stack, {
          padding: 1,
          align: "left"
        })
      )
    );
  }
  process.exit(1);
};
exports.handleUnexpectedError = handleUnexpectedError;
exports.isError = isError;
//# sourceMappingURL=errors.js.map
