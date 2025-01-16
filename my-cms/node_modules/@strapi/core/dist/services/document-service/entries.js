"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const fp = require("lodash/fp");
const components = require("./components.js");
const idTransform = require("./transform/id-transform.js");
const query = require("./transform/query.js");
const params = require("./params.js");
const index = require("./attributes/index.js");
const data = require("./transform/data.js");
const createEntriesService = (uid, entityValidator) => {
  const contentType = strapi.contentType(uid);
  async function createEntry(params$1 = {}) {
    const { data: data2, ...restParams } = await idTransform.transformParamsDocumentId(uid, params$1);
    const query$1 = query.transformParamsToQuery(uid, params.pickSelectionParams(restParams));
    if (!data2) {
      throw new Error("Create requires data attribute");
    }
    const validData = await entityValidator.validateEntityCreation(contentType, data2, {
      // Note: publishedAt value will always be set when DP is disabled
      isDraft: !params$1?.data?.publishedAt,
      locale: params$1?.locale
    });
    const componentData = await components.createComponents(uid, validData);
    const dataWithComponents = components.assignComponentData(
      contentType,
      componentData,
      validData
    );
    const entryData = index.applyTransforms(contentType, dataWithComponents);
    const doc = await strapi.db.query(uid).create({ ...query$1, data: entryData });
    return doc;
  }
  async function deleteEntry(id) {
    const componentsToDelete = await components.getComponents(uid, { id });
    const deletedEntry = await strapi.db.query(uid).delete({ where: { id } });
    await components.deleteComponents(uid, componentsToDelete, { loadComponents: false });
    return deletedEntry;
  }
  async function updateEntry(entryToUpdate, params$1 = {}) {
    const { data: data2, ...restParams } = await idTransform.transformParamsDocumentId(uid, params$1);
    const query$1 = query.transformParamsToQuery(uid, params.pickSelectionParams(restParams));
    const validData = await entityValidator.validateEntityUpdate(
      contentType,
      data2,
      {
        isDraft: !params$1?.data?.publishedAt,
        // Always update the draft version
        locale: params$1?.locale
      },
      entryToUpdate
    );
    const componentData = await components.updateComponents(uid, entryToUpdate, validData);
    const dataWithComponents = components.assignComponentData(
      contentType,
      componentData,
      validData
    );
    const entryData = index.applyTransforms(contentType, dataWithComponents);
    return strapi.db.query(uid).update({ ...query$1, where: { id: entryToUpdate.id }, data: entryData });
  }
  async function publishEntry(entry, params2 = {}) {
    return strapiUtils.async.pipe(
      fp.omit("id"),
      fp.assoc("publishedAt", /* @__PURE__ */ new Date()),
      (draft) => {
        const opts = { uid, locale: draft.locale, status: "published", allowMissingId: true };
        return data.transformData(draft, opts);
      },
      // Create the published entry
      (draft) => createEntry({ ...params2, data: draft, locale: draft.locale, status: "published" })
    )(entry);
  }
  async function discardDraftEntry(entry, params2 = {}) {
    return strapiUtils.async.pipe(
      fp.omit("id"),
      fp.assoc("publishedAt", null),
      (entry2) => {
        const opts = { uid, locale: entry2.locale, status: "draft", allowMissingId: true };
        return data.transformData(entry2, opts);
      },
      // Create the draft entry
      (data2) => createEntry({ ...params2, locale: data2.locale, data: data2, status: "draft" })
    )(entry);
  }
  return {
    create: createEntry,
    delete: deleteEntry,
    update: updateEntry,
    publish: publishEntry,
    discardDraft: discardDraftEntry
  };
};
exports.createEntriesService = createEntriesService;
//# sourceMappingURL=entries.js.map
