"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const undici = require("undici");
const createStrapiFetch = (strapi) => {
  function strapiFetch(url, options) {
    const fetchOptions = {
      ...strapiFetch.dispatcher ? { dispatcher: strapiFetch.dispatcher } : {},
      ...options
    };
    strapi.log.debug(`Making request for ${url}`);
    return fetch(url, fetchOptions);
  }
  const proxy = strapi.config.get("server.proxy.fetch") || strapi.config.get("server.proxy.global");
  if (proxy) {
    strapi.log.info(`Using proxy for Fetch requests: ${proxy}`);
    strapiFetch.dispatcher = new undici.ProxyAgent(proxy);
  }
  return strapiFetch;
};
exports.createStrapiFetch = createStrapiFetch;
//# sourceMappingURL=fetch.js.map
