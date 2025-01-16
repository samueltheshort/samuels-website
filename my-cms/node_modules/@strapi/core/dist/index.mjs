import Strapi from "./Strapi.mjs";
import "open";
import "lodash/fp";
import "path";
import "./ee/license.mjs";
import { createUpdateNotifier } from "./utils/update-notifier/index.mjs";
import "undici";
import "chalk";
import "cli-table3";
import "@paralleldrive/cuid2";
import "node:assert";
import { destroyOnSignal } from "./utils/signals.mjs";
import { resolveWorkingDirectories } from "./utils/resolve-working-dirs.mjs";
import { default as default2 } from "./compile.mjs";
import * as factories from "./factories.mjs";
const createStrapi = (options = {}) => {
  const strapi = new Strapi({
    ...options,
    ...resolveWorkingDirectories(options)
  });
  destroyOnSignal(strapi);
  createUpdateNotifier(strapi);
  global.strapi = strapi;
  return strapi;
};
export {
  default2 as compileStrapi,
  createStrapi,
  factories
};
//# sourceMappingURL=index.mjs.map
