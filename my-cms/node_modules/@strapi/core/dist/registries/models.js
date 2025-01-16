"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const registry = () => {
  const models = [];
  return {
    add(model) {
      models.push(model);
      return this;
    },
    get() {
      return models;
    }
  };
};
exports.registry = registry;
//# sourceMappingURL=models.js.map
