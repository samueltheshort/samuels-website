"use strict";
const provider = require("./provider.js");
const cron$1 = require("../services/cron.js");
const cron = provider.defineProvider({
  init(strapi) {
    strapi.add("cron", () => cron$1());
  },
  async bootstrap(strapi) {
    if (strapi.config.get("server.cron.enabled", true)) {
      const cronTasks = strapi.config.get("server.cron.tasks", {});
      strapi.get("cron").add(cronTasks);
    }
    strapi.get("cron").start();
  },
  async destroy(strapi) {
    strapi.get("cron").destroy();
  }
});
module.exports = cron;
//# sourceMappingURL=cron.js.map
