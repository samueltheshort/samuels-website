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
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  settings: [{ action: "plugin::email.settings.read", subject: null }]
};
const prefixPluginTranslations = (trad, pluginId) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {});
};
const admin = {
  // TODO typing app in strapi/types as every plugin needs it
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register(app) {
    app.createSettingSection(
      {
        id: "email",
        intlLabel: { id: "email.SettingsNav.section-label", defaultMessage: "Email Plugin" }
      },
      [
        {
          intlLabel: {
            id: "email.Settings.email.plugin.title",
            defaultMessage: "Settings"
          },
          id: "settings",
          to: "email",
          Component: () => import("./Settings-DKhINVfQ.mjs").then((mod) => ({
            default: mod.ProtectedSettingsPage
          })),
          permissions: PERMISSIONS.settings
        }
      ]
    );
    app.registerPlugin({
      id: "email",
      name: "email"
    });
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-Bf9XlLLo.mjs"), "./translations/cs.json": () => import("./cs-B0QZJTah.mjs"), "./translations/de.json": () => import("./de-B9kiAC-s.mjs"), "./translations/dk.json": () => import("./dk-DqrbgSkv.mjs"), "./translations/en.json": () => import("./en-DF4KtAAC.mjs"), "./translations/es.json": () => import("./es-BNo7eLLJ.mjs"), "./translations/fr.json": () => import("./fr-hkSxFuzl.mjs"), "./translations/id.json": () => import("./id-CHtAzAUz.mjs"), "./translations/it.json": () => import("./it-C7z82V3g.mjs"), "./translations/ja.json": () => import("./ja-CiekkoEN.mjs"), "./translations/ko.json": () => import("./ko-CJBkZ375.mjs"), "./translations/ms.json": () => import("./ms-C1wNkEQw.mjs"), "./translations/nl.json": () => import("./nl-C79CwB4e.mjs"), "./translations/pl.json": () => import("./pl-DXcJCevg.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-DjINUWGk.mjs"), "./translations/pt.json": () => import("./pt-DEVCt2mt.mjs"), "./translations/ru.json": () => import("./ru-C_7wBr9e.mjs"), "./translations/sk.json": () => import("./sk-i1gQKUBN.mjs"), "./translations/th.json": () => import("./th-D-MxpWKr.mjs"), "./translations/tr.json": () => import("./tr-BXu41MLY.mjs"), "./translations/uk.json": () => import("./uk-C_1qrLRM.mjs"), "./translations/vi.json": () => import("./vi-BfZkgFxI.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-BLEEaLoN.mjs"), "./translations/zh.json": () => import("./zh-BS-XJCSt.mjs") }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, "email"),
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
  PERMISSIONS as P,
  admin as a
};
//# sourceMappingURL=index-D0n2_0zm.mjs.map
