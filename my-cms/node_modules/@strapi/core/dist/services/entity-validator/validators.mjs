import _ from "lodash";
import { yup } from "@strapi/utils";
import { blocksValidator } from "./blocks-validator.mjs";
const addMinLengthValidator = (validator, {
  attr
}, { isDraft }) => {
  return attr.minLength && _.isInteger(attr.minLength) && !isDraft ? validator.min(attr.minLength) : validator;
};
const addMaxLengthValidator = (validator, {
  attr
}) => {
  return attr.maxLength && _.isInteger(attr.maxLength) ? validator.max(attr.maxLength) : validator;
};
const addMinIntegerValidator = (validator, {
  attr
}, { isDraft }) => _.isNumber(attr.min) && !isDraft ? validator.min(_.toInteger(attr.min)) : validator;
const addMaxIntegerValidator = (validator, {
  attr
}) => _.isNumber(attr.max) ? validator.max(_.toInteger(attr.max)) : validator;
const addMinFloatValidator = (validator, {
  attr
}, { isDraft }) => _.isNumber(attr.min) && !isDraft ? validator.min(attr.min) : validator;
const addMaxFloatValidator = (validator, {
  attr
}) => _.isNumber(attr.max) ? validator.max(attr.max) : validator;
const addStringRegexValidator = (validator, {
  attr
}, { isDraft }) => {
  return "regex" in attr && !_.isUndefined(attr.regex) && !isDraft ? validator.matches(new RegExp(attr.regex), { excludeEmptyString: !attr.required }) : validator;
};
const addUniqueValidator = (validator, {
  attr,
  model,
  updatedAttribute,
  entity,
  componentContext
}, options) => {
  if (attr.type !== "uid" && !attr.unique) {
    return validator;
  }
  const validateUniqueFieldWithinComponent = async (value) => {
    if (!componentContext) {
      return false;
    }
    const hasRepeatableData = componentContext.repeatableData.length > 0;
    if (hasRepeatableData) {
      const { name: updatedName, value: updatedValue } = updatedAttribute;
      const pathToCheck = [...componentContext.pathToComponent.slice(1), updatedName].join(".");
      const values = componentContext.repeatableData.map((item) => {
        return pathToCheck.split(".").reduce((acc, key) => acc[key], item);
      });
      const isUpdatedAttributeRepeatedInThisEntity = values.filter((value2) => value2 === updatedValue).length > 1;
      if (isUpdatedAttributeRepeatedInThisEntity) {
        return false;
      }
    }
    const {
      model: parentModel,
      options: parentOptions,
      id: excludeId
    } = componentContext.parentContent;
    const whereConditions = {};
    const isParentDraft = parentOptions && parentOptions.isDraft;
    whereConditions.publishedAt = isParentDraft ? null : { $notNull: true };
    if (parentOptions?.locale) {
      whereConditions.locale = parentOptions.locale;
    }
    if (excludeId && !Number.isNaN(excludeId)) {
      whereConditions.id = { $ne: excludeId };
    }
    const queryUid = parentModel.uid;
    const queryWhere = {
      ...componentContext.pathToComponent.reduceRight((acc, key) => ({ [key]: acc }), {
        [updatedAttribute.name]: value
      }),
      ...whereConditions
    };
    return !await strapi.db.query(queryUid).findOne({ where: queryWhere });
  };
  const validateUniqueFieldWithinDynamicZoneComponent = async (startOfPath) => {
    if (!componentContext) {
      return false;
    }
    const targetComponentUID = model.uid;
    const countOfValueInThisEntity = (componentContext?.fullDynamicZoneContent ?? []).reduce(
      (acc, component) => {
        if (component.__component !== targetComponentUID) {
          return acc;
        }
        const updatedValue = component[updatedAttribute.name];
        return updatedValue === updatedAttribute.value ? acc + 1 : acc;
      },
      0
    );
    if (countOfValueInThisEntity > 1) {
      return false;
    }
    const query = {
      select: ["id"],
      where: {},
      populate: {
        [startOfPath]: {
          on: {
            [targetComponentUID]: {
              select: ["id"],
              where: { [updatedAttribute.name]: updatedAttribute.value }
            }
          }
        }
      }
    };
    const { options: options2, id } = componentContext.parentContent;
    if (options2?.isDraft !== void 0) {
      query.where.published_at = options2.isDraft ? { $eq: null } : { $ne: null };
    }
    if (id) {
      query.where.id = { $ne: id };
    }
    if (options2?.locale) {
      query.where.locale = options2.locale;
    }
    const parentModelQueryResult = await strapi.db.query(componentContext.parentContent.model.uid).findMany(query);
    const filteredResults = parentModelQueryResult.filter((result) => Array.isArray(result[startOfPath]) && result[startOfPath].length).flatMap((result) => result[startOfPath]).filter((dynamicZoneComponent) => dynamicZoneComponent.__component === targetComponentUID);
    if (filteredResults.length >= 1) {
      return false;
    }
    return true;
  };
  return validator.test("unique", "This attribute must be unique", async (value) => {
    if (_.isNil(value) || value === "") {
      return true;
    }
    if (options.isDraft) {
      return true;
    }
    const hasPathToComponent = componentContext && componentContext.pathToComponent.length > 0;
    if (hasPathToComponent) {
      const startOfPath = componentContext.pathToComponent[0];
      const testingDZ = componentContext.parentContent.model.attributes[startOfPath].type === "dynamiczone";
      if (testingDZ) {
        return validateUniqueFieldWithinDynamicZoneComponent(startOfPath);
      }
      return validateUniqueFieldWithinComponent(value);
    }
    const scalarAttributeWhere = {
      [updatedAttribute.name]: value,
      publishedAt: { $notNull: true }
    };
    if (options?.locale) {
      scalarAttributeWhere.locale = options.locale;
    }
    if (entity?.id) {
      scalarAttributeWhere.id = { $ne: entity.id };
    }
    return !await strapi.db.query(model.uid).findOne({ where: scalarAttributeWhere, select: ["id"] });
  });
};
const stringValidator = (metas, options) => {
  let schema = yup.string().transform((val, originalVal) => originalVal);
  schema = addMinLengthValidator(schema, metas, options);
  schema = addMaxLengthValidator(schema, metas);
  schema = addStringRegexValidator(schema, metas, options);
  schema = addUniqueValidator(schema, metas, options);
  return schema;
};
const emailValidator = (metas, options) => {
  const schema = stringValidator(metas, options);
  if (options.isDraft) {
    return schema;
  }
  return schema.email().min(
    1,
    // eslint-disable-next-line no-template-curly-in-string
    "${path} cannot be empty"
  );
};
const uidValidator = (metas, options) => {
  const schema = stringValidator(metas, options);
  if (options.isDraft) {
    return schema;
  }
  return schema.matches(/^[A-Za-z0-9-_.~]*$/);
};
const enumerationValidator = ({ attr }) => {
  return yup.string().oneOf((Array.isArray(attr.enum) ? attr.enum : [attr.enum]).concat(null));
};
const integerValidator = (metas, options) => {
  let schema = yup.number().integer();
  schema = addMinIntegerValidator(schema, metas, options);
  schema = addMaxIntegerValidator(schema, metas);
  schema = addUniqueValidator(schema, metas, options);
  return schema;
};
const floatValidator = (metas, options) => {
  let schema = yup.number();
  schema = addMinFloatValidator(schema, metas, options);
  schema = addMaxFloatValidator(schema, metas);
  schema = addUniqueValidator(schema, metas, options);
  return schema;
};
const bigintegerValidator = (metas, options) => {
  const schema = yup.mixed();
  return addUniqueValidator(schema, metas, options);
};
const datesValidator = (metas, options) => {
  const schema = yup.mixed();
  return addUniqueValidator(schema, metas, options);
};
const Validators = {
  string: stringValidator,
  text: stringValidator,
  richtext: stringValidator,
  password: stringValidator,
  email: emailValidator,
  enumeration: enumerationValidator,
  boolean: () => yup.boolean(),
  uid: uidValidator,
  json: () => yup.mixed(),
  integer: integerValidator,
  biginteger: bigintegerValidator,
  float: floatValidator,
  decimal: floatValidator,
  date: datesValidator,
  time: datesValidator,
  datetime: datesValidator,
  timestamp: datesValidator,
  blocks: blocksValidator
};
export {
  Validators,
  bigintegerValidator,
  datesValidator,
  emailValidator,
  enumerationValidator,
  floatValidator,
  integerValidator,
  uidValidator
};
//# sourceMappingURL=validators.mjs.map
