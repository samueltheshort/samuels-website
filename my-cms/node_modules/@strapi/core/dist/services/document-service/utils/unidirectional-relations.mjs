import { omit, keyBy } from "lodash/fp";
const load = async (uid, { oldVersions, newVersions }) => {
  const updates = [];
  await strapi.db.transaction(async ({ trx }) => {
    const contentTypes = Object.values(strapi.contentTypes);
    const components = Object.values(strapi.components);
    for (const model of [...contentTypes, ...components]) {
      const dbModel = strapi.db.metadata.get(model.uid);
      for (const attribute of Object.values(dbModel.attributes)) {
        if (attribute.type !== "relation" || attribute.target !== uid || attribute.inversedBy || attribute.mappedBy) {
          continue;
        }
        const joinTable = attribute.joinTable;
        if (!joinTable) {
          continue;
        }
        const { name: sourceColumnName } = joinTable.joinColumn;
        const { name: targetColumnName } = joinTable.inverseJoinColumn;
        const ids = oldVersions.map((entry) => entry.id);
        const oldVersionsRelations = await strapi.db.getConnection().select("*").from(joinTable.name).whereIn(targetColumnName, ids).transacting(trx);
        if (oldVersionsRelations.length > 0) {
          updates.push({ joinTable, relations: oldVersionsRelations });
        }
        if (!model.options?.draftAndPublish) {
          const ids2 = newVersions.map((entry) => entry.id);
          const newVersionsRelations = await strapi.db.getConnection().select("*").from(joinTable.name).whereIn(targetColumnName, ids2).transacting(trx);
          if (newVersionsRelations.length > 0) {
            const discardToAdd = newVersionsRelations.filter((relation) => {
              const matchingOldVerion = oldVersionsRelations.find((oldRelation) => {
                return oldRelation[sourceColumnName] === relation[sourceColumnName];
              });
              return !matchingOldVerion;
            }).map(omit("id"));
            updates.push({ joinTable, relations: discardToAdd });
          }
        }
      }
    }
  });
  return updates;
};
const sync = async (oldEntries, newEntries, oldRelations) => {
  const newEntryByLocale = keyBy("locale", newEntries);
  const oldEntriesMap = oldEntries.reduce(
    (acc, entry) => {
      const newEntry = newEntryByLocale[entry.locale];
      if (!newEntry) return acc;
      acc[entry.id] = newEntry.id;
      return acc;
    },
    {}
  );
  await strapi.db.transaction(async ({ trx }) => {
    for (const { joinTable, relations } of oldRelations) {
      const column = joinTable.inverseJoinColumn.name;
      const newRelations = relations.map((relation) => {
        const newId = oldEntriesMap[relation[column]];
        return { ...relation, [column]: newId };
      });
      await trx.batchInsert(joinTable.name, newRelations, 1e3);
    }
  });
};
export {
  load,
  sync
};
//# sourceMappingURL=unidirectional-relations.mjs.map
