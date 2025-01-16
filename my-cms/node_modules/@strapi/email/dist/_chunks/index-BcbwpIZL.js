"use strict";
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
          Component: () => Promise.resolve().then(() => require("./Settings-DzVN5TCM.js")).then((mod) => ({
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
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-C_tQu1XS.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-CPKIUWLp.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-K6IYQk2d.js")), "./translations/dk.json": () => Promise.resolve().then(() => require("./dk-31mOPYpI.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-BCu4d6-o.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-Dl2HVmwz.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-C8Qw4iPZ.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-CvE5f0zz.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-DYpuAHa5.js")), "./translations/ja.json": () => Promise.resolve().then(() => require("./ja-PL3WilO7.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-CL2BB_w_.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-BGlHkuJz.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-BuofSsmb.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-DdtXf3SH.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-B_ii8U63.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-CzRDvk6c.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-Dc-rSPqb.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-Cnpb4YOK.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-BXTLF08M.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-DwBySNgJ.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-CxIePjBD.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-B4uqmjm6.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-CmL3sY9o.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-DsMIjTgu.js")) }), `./translations/${locale}.json`, 3).then(({ default: data }) => {
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
exports.PERMISSIONS = PERMISSIONS;
exports.admin = admin;
//# sourceMappingURL=index-BcbwpIZL.js.map
