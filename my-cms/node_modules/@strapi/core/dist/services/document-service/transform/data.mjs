import { createIdMap } from "./id-map.mjs";
import { extractDataIds } from "./relations/extract/data-ids.mjs";
import { transformDataIdsVisitor } from "./relations/transform/data-ids.mjs";
import { setDefaultLocaleToRelations } from "./relations/transform/default-locale.mjs";
const transformData = async (data, opts) => {
  const idMap = createIdMap({ strapi });
  const transformedData = await setDefaultLocaleToRelations(data, opts.uid);
  await extractDataIds(idMap, transformedData, opts);
  await idMap.load();
  return transformDataIdsVisitor(idMap, transformedData, opts);
};
export {
  transformData
};
//# sourceMappingURL=data.mjs.map
