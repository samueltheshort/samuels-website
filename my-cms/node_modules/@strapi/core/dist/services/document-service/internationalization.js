"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const fp = require("lodash/fp");
const getDefaultLocale = async () => {
  return strapi.plugin("i18n").service("locales").getDefaultLocale();
};
const defaultLocale = async (contentType, params) => {
  if (!strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (!params.locale) {
    return fp.assoc("locale", await getDefaultLocale(), params);
  }
  return params;
};
const localeToLookup = (contentType, params) => {
  if (!params.locale || !strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (typeof params.locale !== "string") {
    throw new strapiUtils.errors.ValidationError(
      `Invalid locale param ${String(params.locale)} provided. Document locales must be strings.`
    );
  }
  return fp.assoc(["lookup", "locale"], params.locale, params);
};
const multiLocaleToLookup = (contentType, params) => {
  if (!strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (params.locale) {
    if (params.locale === "*") {
      return params;
    }
    return fp.assoc(["lookup", "locale"], params.locale, params);
  }
  return params;
};
const localeToData = (contentType, params) => {
  if (!strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (params.locale) {
    const isValidLocale = typeof params.locale === "string" && params.locale !== "*";
    if (isValidLocale) {
      return fp.assoc(["data", "locale"], params.locale, params);
    }
    throw new strapiUtils.errors.ValidationError(
      `Invalid locale param ${params.locale} provided. Document locales must be strings.`
    );
  }
  return params;
};
const defaultLocaleCurry = fp.curry(defaultLocale);
const localeToLookupCurry = fp.curry(localeToLookup);
const multiLocaleToLookupCurry = fp.curry(multiLocaleToLookup);
const localeToDataCurry = fp.curry(localeToData);
exports.defaultLocale = defaultLocaleCurry;
exports.localeToData = localeToDataCurry;
exports.localeToLookup = localeToLookupCurry;
exports.multiLocaleToLookup = multiLocaleToLookupCurry;
//# sourceMappingURL=internationalization.js.map
