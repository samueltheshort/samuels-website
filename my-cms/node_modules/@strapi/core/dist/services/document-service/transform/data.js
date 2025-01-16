"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const idMap = require("./id-map.js");
const dataIds = require("./relations/extract/data-ids.js");
const dataIds$1 = require("./relations/transform/data-ids.js");
const defaultLocale = require("./relations/transform/default-locale.js");
const transformData = async (data, opts) => {
  const idMap$1 = idMap.createIdMap({ strapi });
  const transformedData = await defaultLocale.setDefaultLocaleToRelations(data, opts.uid);
  await dataIds.extractDataIds(idMap$1, transformedData, opts);
  await idMap$1.load();
  return dataIds$1.transformDataIdsVisitor(idMap$1, transformedData, opts);
};
exports.transformData = transformData;
//# sourceMappingURL=data.js.map
