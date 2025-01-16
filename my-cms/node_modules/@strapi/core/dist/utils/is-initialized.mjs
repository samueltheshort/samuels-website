import { isEmpty, isNil } from "lodash/fp";
const isInitialized = async (strapi) => {
  try {
    if (isEmpty(strapi.admin)) {
      return true;
    }
    const anyAdministrator = await strapi.db.query("admin::user").findOne({ select: ["id"] });
    return !isNil(anyAdministrator);
  } catch (err) {
    strapi.stopWithError(err);
  }
};
export {
  isInitialized
};
//# sourceMappingURL=is-initialized.mjs.map
