import { Cloud } from "@strapi/icons";
import { useRef, useEffect } from "react";
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const pluginId = "cloud";
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(pluginId);
  }, []);
  return null;
};
const prefixPluginTranslations = (trad, pluginId2) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId2}.${current}`] = trad[current];
    return acc;
  }, {});
};
const name = "Deploy";
const index = {
  register(app) {
    const { backendURL } = window.strapi;
    if (backendURL?.includes("localhost")) {
      app.addMenuLink({
        to: `plugins/${pluginId}`,
        icon: Cloud,
        intlLabel: {
          id: `${pluginId}.plugin.name`,
          defaultMessage: name
        },
        Component: async () => {
          const { App } = await import("./App-Dzr5m4eZ.mjs");
          return App;
        }
      });
      const plugin = {
        id: pluginId,
        initializer: Initializer,
        isReady: false,
        name
      };
      app.registerPlugin(plugin);
    }
  },
  async registerTrads(app) {
    const { locales } = app;
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("./en-DqzxMgb_.mjs"), "./translations/fr.json": () => import("./fr-3fwSSssz.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
export {
  index as i,
  pluginId as p
};
