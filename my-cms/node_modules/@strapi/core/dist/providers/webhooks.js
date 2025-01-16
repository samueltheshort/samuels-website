"use strict";
const provider = require("./provider.js");
const webhookStore = require("../services/webhook-store.js");
const webhookRunner = require("../services/webhook-runner.js");
const webhooks = provider.defineProvider({
  init(strapi) {
    strapi.get("models").add(webhookStore.webhookModel);
    strapi.add("webhookStore", () => webhookStore.createWebhookStore({ db: strapi.db }));
    strapi.add(
      "webhookRunner",
      () => webhookRunner({
        eventHub: strapi.eventHub,
        logger: strapi.log,
        configuration: strapi.config.get("server.webhooks", {}),
        fetch: strapi.fetch
      })
    );
  },
  async bootstrap(strapi) {
    const webhooks2 = await strapi.get("webhookStore").findWebhooks();
    if (!webhooks2) {
      return;
    }
    for (const webhook of webhooks2) {
      strapi.get("webhookRunner").add(webhook);
    }
  }
});
module.exports = webhooks;
//# sourceMappingURL=webhooks.js.map
