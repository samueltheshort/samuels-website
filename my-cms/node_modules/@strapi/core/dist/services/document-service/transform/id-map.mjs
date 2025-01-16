import { async, contentTypes } from "@strapi/utils";
const hasDraftAndPublish = (uid) => {
  const model = strapi.getModel(uid);
  return contentTypes.hasDraftAndPublish(model);
};
const encodeKey = (obj) => {
  if (!hasDraftAndPublish(obj.uid)) {
    delete obj.status;
  }
  const keys = Object.keys(obj).sort();
  return keys.map((key) => `${key}:::${obj[key]}`).join("&&");
};
const createIdMap = ({ strapi: strapi2 }) => {
  const loadedIds = /* @__PURE__ */ new Map();
  const toLoadIds = /* @__PURE__ */ new Map();
  return {
    loadedIds,
    toLoadIds,
    /**
     * Register a new document id and its corresponding entity id.
     */
    add(keyFields) {
      const key = encodeKey({ status: "published", locale: null, ...keyFields });
      if (loadedIds.has(key)) return;
      if (toLoadIds.has(key)) return;
      toLoadIds.set(key, keyFields);
    },
    /**
     * Load all ids from the registry.
     */
    async load() {
      const loadIdValues = Array.from(toLoadIds.values());
      const idsByUidAndLocale = loadIdValues.reduce((acc, { documentId, ...rest }) => {
        const key = encodeKey(rest);
        const ids = acc[key] || { ...rest, documentIds: [] };
        ids.documentIds.push(documentId);
        return { ...acc, [key]: ids };
      }, {});
      await async.map(
        Object.values(idsByUidAndLocale),
        async ({ uid, locale, documentIds, status }) => {
          const findParams = {
            select: ["id", "documentId", "locale", "publishedAt"],
            where: {
              documentId: { $in: documentIds },
              locale: locale || null
            }
          };
          if (hasDraftAndPublish(uid)) {
            findParams.where.publishedAt = status === "draft" ? null : { $ne: null };
          }
          const result = await strapi2?.db?.query(uid).findMany(findParams);
          result?.forEach(({ documentId, id, locale: locale2, publishedAt }) => {
            const key = encodeKey({
              documentId,
              uid,
              locale: locale2,
              status: publishedAt ? "published" : "draft"
            });
            loadedIds.set(key, id);
          });
        }
      );
      toLoadIds.clear();
    },
    /**
     * Get the entity id for a given document id.
     */
    get(keys) {
      const key = encodeKey({ status: "published", locale: null, ...keys });
      return loadedIds.get(key);
    },
    /**
     * Clear the registry.
     */
    clear() {
      loadedIds.clear();
      toLoadIds.clear();
    }
  };
};
export {
  createIdMap
};
//# sourceMappingURL=id-map.mjs.map
