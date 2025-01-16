"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const fp = require("lodash/fp");
const transforms = require("./transforms.js");
const applyTransforms = fp.curry((schema, data) => {
  const attributeNames = Object.keys(data);
  for (const attributeName of attributeNames) {
    const value = data[attributeName];
    const attribute = schema.attributes[attributeName];
    if (!attribute) {
      continue;
    }
    const transform = transforms[attribute.type];
    if (transform) {
      const attributeContext = { attributeName, attribute };
      data[attributeName] = transform(value, attributeContext);
    }
  }
  return data;
});
exports.applyTransforms = applyTransforms;
//# sourceMappingURL=index.js.map
