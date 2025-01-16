"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const enableI18n = async ({ oldContentTypes, contentTypes }) => {
  const { isLocalizedContentType } = strapi.plugin("i18n")?.service("content-types") ?? {};
  const { getDefaultLocale } = strapi.plugin("i18n")?.service("locales") ?? {};
  if (!oldContentTypes) {
    return;
  }
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    if (!isLocalizedContentType(oldContentType) && isLocalizedContentType(contentType)) {
      const defaultLocale = await getDefaultLocale();
      await strapi.db.query(uid).updateMany({
        where: { locale: null },
        data: { locale: defaultLocale }
      });
    }
  }
};
const disableI18n = async ({ oldContentTypes, contentTypes }) => {
  const { isLocalizedContentType } = strapi.plugin("i18n")?.service("content-types") ?? {};
  const { getDefaultLocale } = strapi.plugin("i18n")?.service("locales") ?? {};
  if (!oldContentTypes) {
    return;
  }
  for (const uid in contentTypes) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes[uid];
    if (isLocalizedContentType(oldContentType) && !isLocalizedContentType(contentType)) {
      const defaultLocale = await getDefaultLocale();
      await Promise.all([
        // Delete all entities that are not in the default locale
        strapi.db.query(uid).deleteMany({
          where: { locale: { $ne: defaultLocale } }
        }),
        // Set locale to null for the rest
        strapi.db.query(uid).updateMany({
          where: { locale: { $eq: defaultLocale } },
          data: { locale: null }
        })
      ]);
    }
  }
};
exports.disable = disableI18n;
exports.enable = enableI18n;
//# sourceMappingURL=i18n.js.map
