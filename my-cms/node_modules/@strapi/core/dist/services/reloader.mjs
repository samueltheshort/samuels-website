const createReloader = (strapi) => {
  const state = {
    shouldReload: 0,
    isWatching: true
  };
  function reload() {
    if (state.shouldReload > 0) {
      state.shouldReload -= 1;
      reload.isReloading = false;
      return;
    }
    if (strapi.config.get("autoReload")) {
      process.send?.("reload");
    }
  }
  Object.defineProperty(reload, "isWatching", {
    configurable: true,
    enumerable: true,
    set(value) {
      if (state.isWatching === false && value === true) {
        state.shouldReload += 1;
      }
      state.isWatching = value;
    },
    get() {
      return state.isWatching;
    }
  });
  reload.isReloading = false;
  reload.isWatching = true;
  return reload;
};
export {
  createReloader
};
//# sourceMappingURL=reloader.mjs.map
