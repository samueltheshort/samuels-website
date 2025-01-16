import _ from "lodash";
import { curry, omit, pipe, assign, has } from "lodash/fp";
import { contentTypes, async, errors } from "@strapi/utils";
const omitComponentData = curry(
  (schema, data) => {
    const { attributes } = schema;
    const componentAttributes = Object.keys(attributes).filter(
      (attributeName) => contentTypes.isComponentAttribute(attributes[attributeName])
    );
    return omit(componentAttributes, data);
  }
);
const createComponents = async (uid, data) => {
  const { attributes = {} } = strapi.getModel(uid);
  const componentBody = {};
  const attributeNames = Object.keys(attributes);
  for (const attributeName of attributeNames) {
    const attribute = attributes[attributeName];
    if (!has(attributeName, data) || !contentTypes.isComponentAttribute(attribute)) {
      continue;
    }
    if (attribute.type === "component") {
      const { component: componentUID, repeatable = false } = attribute;
      const componentValue = data[attributeName];
      if (componentValue === null) {
        continue;
      }
      if (repeatable === true) {
        if (!Array.isArray(componentValue)) {
          throw new Error("Expected an array to create repeatable component");
        }
        const components = await async.map(
          componentValue,
          (value) => createComponent(componentUID, value)
        );
        componentBody[attributeName] = components.map(({ id }) => {
          return {
            id,
            __pivot: {
              field: attributeName,
              component_type: componentUID
            }
          };
        });
      } else {
        const component = await createComponent(
          componentUID,
          componentValue
        );
        componentBody[attributeName] = {
          id: component.id,
          __pivot: {
            field: attributeName,
            component_type: componentUID
          }
        };
      }
      continue;
    }
    if (attribute.type === "dynamiczone") {
      const dynamiczoneValues = data[attributeName];
      if (!Array.isArray(dynamiczoneValues)) {
        throw new Error("Expected an array to create repeatable component");
      }
      const createDynamicZoneComponents = async (value) => {
        const { id } = await createComponent(value.__component, value);
        return {
          id,
          __component: value.__component,
          __pivot: {
            field: attributeName
          }
        };
      };
      componentBody[attributeName] = await async.map(
        dynamiczoneValues,
        createDynamicZoneComponents
      );
      continue;
    }
  }
  return componentBody;
};
const getComponents = async (uid, entity) => {
  const componentAttributes = contentTypes.getComponentAttributes(strapi.getModel(uid));
  if (_.isEmpty(componentAttributes)) {
    return {};
  }
  return strapi.db.query(uid).load(entity, componentAttributes);
};
const updateComponents = async (uid, entityToUpdate, data) => {
  const { attributes = {} } = strapi.getModel(uid);
  const componentBody = {};
  for (const attributeName of Object.keys(attributes)) {
    const attribute = attributes[attributeName];
    if (!has(attributeName, data)) {
      continue;
    }
    if (attribute.type === "component") {
      const { component: componentUID, repeatable = false } = attribute;
      const componentValue = data[attributeName];
      await deleteOldComponents(uid, componentUID, entityToUpdate, attributeName, componentValue);
      if (repeatable === true) {
        if (!Array.isArray(componentValue)) {
          throw new Error("Expected an array to create repeatable component");
        }
        const components = await async.map(
          componentValue,
          (value) => updateOrCreateComponent(componentUID, value)
        );
        componentBody[attributeName] = components.filter(_.negate(_.isNil)).map(({ id }) => {
          return {
            id,
            __pivot: {
              field: attributeName,
              component_type: componentUID
            }
          };
        });
      } else {
        const component = await updateOrCreateComponent(componentUID, componentValue);
        componentBody[attributeName] = component && {
          id: component.id,
          __pivot: {
            field: attributeName,
            component_type: componentUID
          }
        };
      }
    } else if (attribute.type === "dynamiczone") {
      const dynamiczoneValues = data[attributeName];
      await deleteOldDZComponents(uid, entityToUpdate, attributeName, dynamiczoneValues);
      if (!Array.isArray(dynamiczoneValues)) {
        throw new Error("Expected an array to create repeatable component");
      }
      componentBody[attributeName] = await async.map(dynamiczoneValues, async (value) => {
        const { id } = await updateOrCreateComponent(value.__component, value);
        return {
          id,
          __component: value.__component,
          __pivot: {
            field: attributeName
          }
        };
      });
    }
  }
  return componentBody;
};
const pickStringifiedId = ({
  id
}) => {
  if (typeof id === "string") {
    return id;
  }
  return `${id}`;
};
const deleteOldComponents = async (uid, componentUID, entityToUpdate, attributeName, componentValue) => {
  const previousValue = await strapi.db.query(uid).load(entityToUpdate, attributeName);
  const idsToKeep = _.castArray(componentValue).filter(has("id")).map(pickStringifiedId);
  const allIds = _.castArray(previousValue).filter(has("id")).map(pickStringifiedId);
  idsToKeep.forEach((id) => {
    if (!allIds.includes(id)) {
      throw new errors.ApplicationError(
        `Some of the provided components in ${attributeName} are not related to the entity`
      );
    }
  });
  const idsToDelete = _.difference(allIds, idsToKeep);
  if (idsToDelete.length > 0) {
    for (const idToDelete of idsToDelete) {
      await deleteComponent(componentUID, { id: idToDelete });
    }
  }
};
const deleteOldDZComponents = async (uid, entityToUpdate, attributeName, dynamiczoneValues) => {
  const previousValue = await strapi.db.query(uid).load(entityToUpdate, attributeName);
  const idsToKeep = _.castArray(dynamiczoneValues).filter(has("id")).map((v) => ({
    id: pickStringifiedId(v),
    __component: v.__component
  }));
  const allIds = _.castArray(previousValue).filter(has("id")).map((v) => ({
    id: pickStringifiedId(v),
    __component: v.__component
  }));
  idsToKeep.forEach(({ id, __component }) => {
    if (!allIds.find((el) => el.id === id && el.__component === __component)) {
      const err = new Error(
        `Some of the provided components in ${attributeName} are not related to the entity`
      );
      Object.assign(err, { status: 400 });
      throw err;
    }
  });
  const idsToDelete = allIds.reduce((acc, { id, __component }) => {
    if (!idsToKeep.find((el) => el.id === id && el.__component === __component)) {
      acc.push({ id, __component });
    }
    return acc;
  }, []);
  if (idsToDelete.length > 0) {
    for (const idToDelete of idsToDelete) {
      const { id, __component } = idToDelete;
      await deleteComponent(__component, { id });
    }
  }
};
const deleteComponents = async (uid, entityToDelete, { loadComponents = true } = {}) => {
  const { attributes = {} } = strapi.getModel(uid);
  const attributeNames = Object.keys(attributes);
  for (const attributeName of attributeNames) {
    const attribute = attributes[attributeName];
    if (attribute.type === "component" || attribute.type === "dynamiczone") {
      let value;
      if (loadComponents) {
        value = await strapi.db.query(uid).load(entityToDelete, attributeName);
      } else {
        value = entityToDelete[attributeName];
      }
      if (!value) {
        continue;
      }
      if (attribute.type === "component") {
        const { component: componentUID } = attribute;
        await async.map(
          _.castArray(value),
          (subValue) => deleteComponent(componentUID, subValue)
        );
      } else {
        await async.map(
          _.castArray(value),
          (subValue) => deleteComponent(subValue.__component, subValue)
        );
      }
      continue;
    }
  }
};
const createComponent = async (uid, data) => {
  const schema = strapi.getModel(uid);
  const componentData = await createComponents(uid, data);
  const transform = pipe(
    // Make sure we don't save the component with a pre-defined ID
    omit("id"),
    assignComponentData(schema, componentData)
  );
  return strapi.db.query(uid).create({ data: transform(data) });
};
const updateComponent = async (uid, componentToUpdate, data) => {
  const schema = strapi.getModel(uid);
  const componentData = await updateComponents(uid, componentToUpdate, data);
  return strapi.db.query(uid).update({
    where: {
      id: componentToUpdate.id
    },
    data: assignComponentData(schema, componentData, data)
  });
};
const updateOrCreateComponent = (componentUID, value) => {
  if (value === null) {
    return null;
  }
  if ("id" in value && typeof value.id !== "undefined") {
    return updateComponent(componentUID, { id: value.id }, value);
  }
  return createComponent(componentUID, value);
};
const deleteComponent = async (uid, componentToDelete) => {
  await deleteComponents(uid, componentToDelete);
  await strapi.db.query(uid).delete({ where: { id: componentToDelete.id } });
};
const assignComponentData = curry(
  (schema, componentData, data) => {
    return pipe(omitComponentData(schema), assign(componentData))(data);
  }
);
export {
  assignComponentData,
  createComponents,
  deleteComponent,
  deleteComponents,
  getComponents,
  omitComponentData,
  updateComponents
};
//# sourceMappingURL=components.mjs.map
