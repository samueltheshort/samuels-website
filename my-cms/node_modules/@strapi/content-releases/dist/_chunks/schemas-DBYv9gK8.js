"use strict";
const strapiAdmin = require("@strapi/admin/strapi-admin");
const dateFnsTz = require("date-fns-tz");
const yup = require("yup");
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const RELEASE_SCHEMA = yup__namespace.object().shape({
  name: yup__namespace.string().trim().required(strapiAdmin.translatedErrors.required.id).nullable(),
  scheduledAt: yup__namespace.string().nullable(),
  isScheduled: yup__namespace.boolean().optional(),
  time: yup__namespace.string().when("isScheduled", {
    is: true,
    then: yup__namespace.string().trim().required(strapiAdmin.translatedErrors.required.id),
    otherwise: yup__namespace.string().nullable()
  }).test(
    "time-in-future-if-today",
    "content-releases.modal.form.time.has-passed",
    function(time) {
      const { date, timezone } = this.parent;
      if (!date || !timezone || !time) {
        return true;
      }
      const region = timezone.split("&")[1];
      const selectedTime = dateFnsTz.zonedTimeToUtc(`${date} ${time}`, region);
      const now = /* @__PURE__ */ new Date();
      return selectedTime > now;
    }
  ),
  timezone: yup__namespace.string().when("isScheduled", {
    is: true,
    then: yup__namespace.string().required(strapiAdmin.translatedErrors.required.id).nullable(),
    otherwise: yup__namespace.string().nullable()
  }),
  date: yup__namespace.string().when("isScheduled", {
    is: true,
    then: yup__namespace.string().required(strapiAdmin.translatedErrors.required.id).nullable(),
    otherwise: yup__namespace.string().nullable()
  })
}).required().noUnknown();
const SETTINGS_SCHEMA = yup__namespace.object().shape({
  defaultTimezone: yup__namespace.string().nullable().default(null)
}).required().noUnknown();
exports.RELEASE_SCHEMA = RELEASE_SCHEMA;
exports.SETTINGS_SCHEMA = SETTINGS_SCHEMA;
//# sourceMappingURL=schemas-DBYv9gK8.js.map
