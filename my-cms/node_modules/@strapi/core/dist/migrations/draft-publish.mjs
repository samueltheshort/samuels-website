import { contentTypes, async } from "@strapi/utils";
import { getBatchToDiscard } from "./database/5.0.0-discard-drafts.mjs";
const enableDraftAndPublish = async ({ oldContentTypes, contentTypes: contentTypes$1 }) => {
  if (!oldContentTypes) {
    return;
  }
  return strapi.db.transaction(async (trx) => {
    for (const uid in contentTypes$1) {
      if (!oldContentTypes[uid]) {
        continue;
      }
      const oldContentType = oldContentTypes[uid];
      const contentType = contentTypes$1[uid];
      if (!contentTypes.hasDraftAndPublish(oldContentType) && contentTypes.hasDraftAndPublish(contentType)) {
        const discardDraft = async (entry) => strapi.documents(uid).discardDraft({ documentId: entry.documentId, locale: entry.locale });
        for await (const batch of getBatchToDiscard({ db: strapi.db, trx, uid })) {
          await async.map(batch, discardDraft, { concurrency: 10 });
        }
      }
    }
  });
};
const disableDraftAndPublish = async ({ oldContentTypes, contentTypes: contentTypes$1 }) => {
  if (!oldContentTypes) {
    return;
  }
  for (const uid in contentTypes$1) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes$1[uid];
    if (contentTypes.hasDraftAndPublish(oldContentType) && !contentTypes.hasDraftAndPublish(contentType)) {
      await strapi.db?.queryBuilder(uid).delete().where({ published_at: null }).execute();
    }
  }
};
export {
  disableDraftAndPublish as disable,
  enableDraftAndPublish as enable
};
//# sourceMappingURL=draft-publish.mjs.map
