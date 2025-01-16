import { translatedErrors } from "@strapi/admin/strapi-admin";
import { zonedTimeToUtc } from "date-fns-tz";
import * as yup from "yup";
const RELEASE_SCHEMA = yup.object().shape({
  name: yup.string().trim().required(translatedErrors.required.id).nullable(),
  scheduledAt: yup.string().nullable(),
  isScheduled: yup.boolean().optional(),
  time: yup.string().when("isScheduled", {
    is: true,
    then: yup.string().trim().required(translatedErrors.required.id),
    otherwise: yup.string().nullable()
  }).test(
    "time-in-future-if-today",
    "content-releases.modal.form.time.has-passed",
    function(time) {
      const { date, timezone } = this.parent;
      if (!date || !timezone || !time) {
        return true;
      }
      const region = timezone.split("&")[1];
      const selectedTime = zonedTimeToUtc(`${date} ${time}`, region);
      const now = /* @__PURE__ */ new Date();
      return selectedTime > now;
    }
  ),
  timezone: yup.string().when("isScheduled", {
    is: true,
    then: yup.string().required(translatedErrors.required.id).nullable(),
    otherwise: yup.string().nullable()
  }),
  date: yup.string().when("isScheduled", {
    is: true,
    then: yup.string().required(translatedErrors.required.id).nullable(),
    otherwise: yup.string().nullable()
  })
}).required().noUnknown();
const SETTINGS_SCHEMA = yup.object().shape({
  defaultTimezone: yup.string().nullable().default(null)
}).required().noUnknown();
export {
  RELEASE_SCHEMA as R,
  SETTINGS_SCHEMA as S
};
//# sourceMappingURL=schemas-DdA2ic2U.mjs.map
