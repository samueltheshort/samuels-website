"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const index = require("../../services/document-service/index.js");
const hasDraftAndPublish = async (trx, meta) => {
  const hasTable = await trx.schema.hasTable(meta.tableName);
  if (!hasTable) {
    return false;
  }
  const uid = meta.uid;
  const model = strapi.getModel(uid);
  const hasDP = strapiUtils.contentTypes.hasDraftAndPublish(model);
  if (!hasDP) {
    return false;
  }
  return true;
};
async function copyPublishedEntriesToDraft({
  db,
  trx,
  uid
}) {
  const meta = db.metadata.get(uid);
  const scalarAttributes = Object.values(meta.attributes).reduce((acc, attribute) => {
    if (["id"].includes(attribute.columnName)) {
      return acc;
    }
    if (strapiUtils.contentTypes.isScalarAttribute(attribute)) {
      acc.push(attribute.columnName);
    }
    return acc;
  }, []);
  await trx.into(
    trx.raw(`?? (${scalarAttributes.map(() => `??`).join(", ")})`, [
      meta.tableName,
      ...scalarAttributes
    ])
  ).insert((subQb) => {
    subQb.select(
      ...scalarAttributes.map((att) => {
        if (att === "published_at") {
          return trx.raw("NULL as ??", "published_at");
        }
        return att;
      })
    ).from(meta.tableName).whereNotNull("published_at");
  });
}
async function* getBatchToDiscard({
  db,
  trx,
  uid,
  batchSize = 1e3
}) {
  let offset = 0;
  let hasMore = true;
  while (hasMore) {
    const batch = await db.queryBuilder(uid).select(["id", "documentId", "locale"]).where({ publishedAt: { $ne: null } }).limit(batchSize).offset(offset).orderBy("id").transacting(trx).execute();
    if (batch.length < batchSize) {
      hasMore = false;
    }
    offset += batchSize;
    yield batch;
  }
}
const migrateUp = async (trx, db) => {
  const dpModels = [];
  for (const meta of db.metadata.values()) {
    const hasDP = await hasDraftAndPublish(trx, meta);
    if (hasDP) {
      dpModels.push(meta);
    }
  }
  for (const model of dpModels) {
    await copyPublishedEntriesToDraft({ db, trx, uid: model.uid });
  }
  const documentService = index.createDocumentService(strapi, {
    async validateEntityCreation(_, data) {
      return data;
    },
    async validateEntityUpdate(_, data) {
      return data;
    }
  });
  for (const model of dpModels) {
    const discardDraft = async (entry) => documentService(model.uid).discardDraft({
      documentId: entry.documentId,
      locale: entry.locale
    });
    for await (const batch of getBatchToDiscard({ db, trx, uid: model.uid })) {
      await strapiUtils.async.map(batch, discardDraft, { concurrency: 1 });
    }
  }
};
const discardDocumentDrafts = {
  name: "core::5.0.0-discard-drafts",
  async up(trx, db) {
    await migrateUp(trx, db);
  },
  async down() {
    throw new Error("not implemented");
  }
};
exports.discardDocumentDrafts = discardDocumentDrafts;
exports.getBatchToDiscard = getBatchToDiscard;
//# sourceMappingURL=5.0.0-discard-drafts.js.map
