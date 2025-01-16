import { errors } from "@strapi/utils";
import { curry, assoc } from "lodash/fp";
const getDefaultLocale = async () => {
  return strapi.plugin("i18n").service("locales").getDefaultLocale();
};
const defaultLocale = async (contentType, params) => {
  if (!strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (!params.locale) {
    return assoc("locale", await getDefaultLocale(), params);
  }
  return params;
};
const localeToLookup = (contentType, params) => {
  if (!params.locale || !strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (typeof params.locale !== "string") {
    throw new errors.ValidationError(
      `Invalid locale param ${String(params.locale)} provided. Document locales must be strings.`
    );
  }
  return assoc(["lookup", "locale"], params.locale, params);
};
const multiLocaleToLookup = (contentType, params) => {
  if (!strapi.plugin("i18n").service("content-types").isLocalizedContentType(contentType)) {
    return params;
  }
  if (params.locale) {
    if (params.locale === "*") {
      return params;
    }
    return assoc(["lookup", "locale"], params.locale, params);
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
      return assoc(["data", "locale"], params.locale, params);
    }
    throw new errors.ValidationError(
      `Invalid locale param ${params.locale} provided. Document locales must be strings.`
    );
  }
  return params;
};
const defaultLocaleCurry = curry(defaultLocale);
const localeToLookupCurry = curry(localeToLookup);
const multiLocaleToLookupCurry = curry(multiLocaleToLookup);
const localeToDataCurry = curry(localeToData);
export {
  defaultLocaleCurry as defaultLocale,
  localeToDataCurry as localeToData,
  localeToLookupCurry as localeToLookup,
  multiLocaleToLookupCurry as multiLocaleToLookup
};
//# sourceMappingURL=internationalization.mjs.map
