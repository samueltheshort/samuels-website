import { async } from "@strapi/utils";
import { omit, assoc } from "lodash/fp";
import { createComponents, assignComponentData, getComponents, deleteComponents, updateComponents } from "./components.mjs";
import { transformParamsDocumentId as curriedTransformParamsDocumentId } from "./transform/id-transform.mjs";
import { transformParamsToQuery } from "./transform/query.mjs";
import { pickSelectionParams } from "./params.mjs";
import { applyTransforms } from "./attributes/index.mjs";
import { transformData } from "./transform/data.mjs";
const createEntriesService = (uid, entityValidator) => {
  const contentType = strapi.contentType(uid);
  async function createEntry(params = {}) {
    const { data, ...restParams } = await curriedTransformParamsDocumentId(uid, params);
    const query = transformParamsToQuery(uid, pickSelectionParams(restParams));
    if (!data) {
      throw new Error("Create requires data attribute");
    }
    const validData = await entityValidator.validateEntityCreation(contentType, data, {
      // Note: publishedAt value will always be set when DP is disabled
      isDraft: !params?.data?.publishedAt,
      locale: params?.locale
    });
    const componentData = await createComponents(uid, validData);
    const dataWithComponents = assignComponentData(
      contentType,
      componentData,
      validData
    );
    const entryData = applyTransforms(contentType, dataWithComponents);
    const doc = await strapi.db.query(uid).create({ ...query, data: entryData });
    return doc;
  }
  async function deleteEntry(id) {
    const componentsToDelete = await getComponents(uid, { id });
    const deletedEntry = await strapi.db.query(uid).delete({ where: { id } });
    await deleteComponents(uid, componentsToDelete, { loadComponents: false });
    return deletedEntry;
  }
  async function updateEntry(entryToUpdate, params = {}) {
    const { data, ...restParams } = await curriedTransformParamsDocumentId(uid, params);
    const query = transformParamsToQuery(uid, pickSelectionParams(restParams));
    const validData = await entityValidator.validateEntityUpdate(
      contentType,
      data,
      {
        isDraft: !params?.data?.publishedAt,
        // Always update the draft version
        locale: params?.locale
      },
      entryToUpdate
    );
    const componentData = await updateComponents(uid, entryToUpdate, validData);
    const dataWithComponents = assignComponentData(
      contentType,
      componentData,
      validData
    );
    const entryData = applyTransforms(contentType, dataWithComponents);
    return strapi.db.query(uid).update({ ...query, where: { id: entryToUpdate.id }, data: entryData });
  }
  async function publishEntry(entry, params = {}) {
    return async.pipe(
      omit("id"),
      assoc("publishedAt", /* @__PURE__ */ new Date()),
      (draft) => {
        const opts = { uid, locale: draft.locale, status: "published", allowMissingId: true };
        return transformData(draft, opts);
      },
      // Create the published entry
      (draft) => createEntry({ ...params, data: draft, locale: draft.locale, status: "published" })
    )(entry);
  }
  async function discardDraftEntry(entry, params = {}) {
    return async.pipe(
      omit("id"),
      assoc("publishedAt", null),
      (entry2) => {
        const opts = { uid, locale: entry2.locale, status: "draft", allowMissingId: true };
        return transformData(entry2, opts);
      },
      // Create the draft entry
      (data) => createEntry({ ...params, locale: data.locale, data, status: "draft" })
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
export {
  createEntriesService
};
//# sourceMappingURL=entries.mjs.map
