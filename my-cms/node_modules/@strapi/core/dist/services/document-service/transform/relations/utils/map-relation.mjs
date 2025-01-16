import { curry, isNil, isObject } from "lodash/fp";
import { async, traverseEntity } from "@strapi/utils";
const isNumeric = (value) => {
  if (Array.isArray(value)) return false;
  const parsed = parseInt(value, 10);
  return !Number.isNaN(parsed);
};
const toArray = (value) => {
  if (isNil(value)) return value;
  if (Array.isArray(value)) return value;
  return [value];
};
const mapRelation = async (callback, rel, isRecursive = false) => {
  let relation = rel;
  const wrapInSet = (value) => {
    if (isRecursive) {
      return value;
    }
    return { set: toArray(value) };
  };
  if (isNil(relation)) {
    return callback(relation);
  }
  if (Array.isArray(relation)) {
    return async.map(relation, (r) => mapRelation(callback, r, true)).then((result) => result.flat().filter(Boolean)).then(wrapInSet);
  }
  if (isObject(relation)) {
    if ("id" in relation || "documentId" in relation) {
      const result = await callback(relation);
      return wrapInSet(result);
    }
    if (!relation.set && !relation.disconnect && !relation.connect) {
      return callback(relation);
    }
    if (relation.set) {
      const set = await mapRelation(callback, relation.set, true);
      relation = { ...relation, set: toArray(set) };
    }
    if (relation.disconnect) {
      const disconnect = await mapRelation(callback, relation.disconnect, true);
      relation = { ...relation, disconnect: toArray(disconnect) };
    }
    if (relation.connect) {
      const connect = await mapRelation(callback, relation.connect, true);
      relation = { ...relation, connect: toArray(connect) };
    }
    return relation;
  }
  if (isNumeric(relation)) {
    const result = await callback({ id: relation });
    return wrapInSet(result);
  }
  if (typeof relation === "string") {
    const result = await callback({ documentId: relation });
    return wrapInSet(result);
  }
  return callback(relation);
};
const traverseEntityRelations = async (visitor, options, data) => {
  return traverseEntity(
    async (options2, utils) => {
      const { attribute } = options2;
      if (!attribute) {
        return;
      }
      if (attribute.type !== "relation") {
        return;
      }
      if (attribute.useJoinTable === false) {
        return;
      }
      return visitor(options2, utils);
    },
    options,
    data
  );
};
const mapRelationCurried = curry(mapRelation);
const traverseEntityRelationsCurried = curry(traverseEntityRelations);
export {
  mapRelationCurried as mapRelation,
  traverseEntityRelationsCurried as traverseEntityRelations
};
//# sourceMappingURL=map-relation.mjs.map
