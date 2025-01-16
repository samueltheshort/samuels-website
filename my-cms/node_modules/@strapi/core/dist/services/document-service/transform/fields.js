"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const transformFields = (fields) => {
  if (typeof fields === "string") {
    if (fields === "*") {
      return fields;
    }
    if (fields === "") {
      return "documentId";
    }
    if (!fields.split(",").includes("documentId")) {
      return `${fields},documentId`;
    }
  }
  if (!fields || !Array.isArray(fields)) {
    return fields;
  }
  if (!fields.includes("documentId")) {
    fields.push("documentId");
  }
  return fields;
};
exports.transformFields = transformFields;
//# sourceMappingURL=fields.js.map
