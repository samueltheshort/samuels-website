"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const _5_0_0DiscardDrafts = require("./database/5.0.0-discard-drafts.js");
const enableDraftAndPublish = async ({ oldContentTypes, contentTypes }) => {
  if (!oldContentTypes) {
    return;
  }
  return strapi.db.transaction(async (trx) => {
    for (const uid in contentTypes) {
      if (!oldContentTypes[uid]) {
        continue;
      }
      const oldContentType = oldContentTypes[uid];
      const contentType = contentTypes[uid];
      if (!strapiUtils.contentTypes.hasDraftAndPublish(oldContentType) && strapiUtils.contentTypes.hasDraftAndPublish(contentType)) {
        const discardDraft = async (entry) => strapi.documents(uid).discardDraft({ documentId: entry.documentId, locale: entry.locale });
        for await (const batch of _5_0_0DiscardDrafts.getBatchToDiscard({ db: strapi.db, trx, uid })) {
          await strapiUtils.async.map(batch, discardDraft, { concurrency: 10 });
        }
      }
    }
  });
};
const disableDraftAndPublish = async ({ oldContentTypes, contentTypes }) => {
  if (!oldContentTypes) {
    return;
  }
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    if (strapiUtils.contentTypes.hasDraftAndPublish(oldContentType) && !strapiUtils.contentTypes.hasDraftAndPublish(contentType)) {
      await strapi.db?.queryBuilder(uid).delete().where({ published_at: null }).execute();
    }
  }
};
exports.disable = disableDraftAndPublish;
exports.enable = enableDraftAndPublish;
//# sourceMappingURL=draft-publish.js.map
