"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
class Container {
  registerMap = /* @__PURE__ */ new Map();
  serviceMap = /* @__PURE__ */ new Map();
  add(name, resolver) {
    if (this.registerMap.has(name)) {
      throw new Error(`Cannot register already registered service ${name}`);
    }
    this.registerMap.set(name, resolver);
    return this;
  }
  get(name, args) {
    if (this.serviceMap.has(name)) {
      return this.serviceMap.get(name);
    }
    if (this.registerMap.has(name)) {
      const resolver = this.registerMap.get(name);
      if (typeof resolver === "function") {
        this.serviceMap.set(name, resolver(this, args));
      } else {
        this.serviceMap.set(name, resolver);
      }
      return this.serviceMap.get(name);
    }
    throw new Error(`Could not resolve service ${name}`);
  }
}
exports.Container = Container;
//# sourceMappingURL=container.js.map
