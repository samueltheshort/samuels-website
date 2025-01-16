"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const strapiUtils = require("@strapi/utils");
const populate = require("./utils/populate.js");
const EVENTS = {
  ENTRY_CREATE: "entry.create",
  ENTRY_UPDATE: "entry.update",
  ENTRY_DELETE: "entry.delete",
  ENTRY_PUBLISH: "entry.publish",
  ENTRY_UNPUBLISH: "entry.unpublish",
  ENTRY_DRAFT_DISCARD: "entry.draft-discard"
};
const createEventManager = (strapi, uid) => {
  const populate$1 = populate.getDeepPopulate(uid, {});
  const model = strapi.getModel(uid);
  const emitEvent = async (eventName, entry) => {
    let populatedEntry = entry;
    if (![EVENTS.ENTRY_DELETE, EVENTS.ENTRY_UNPUBLISH].includes(eventName)) {
      populatedEntry = await strapi.db.query(uid).findOne({ where: { id: entry.id }, populate: populate$1 });
    }
    const sanitizedEntry = await strapiUtils.sanitize.sanitizers.defaultSanitizeOutput(
      {
        schema: model,
        getModel: (uid2) => strapi.getModel(uid2)
      },
      populatedEntry
    );
    await strapi.eventHub.emit(eventName, {
      model: model.modelName,
      uid: model.uid,
      entry: sanitizedEntry
    });
  };
  return {
    /**
     * strapi.db.query might reuse the transaction used in the doc service request,
     * so this is executed after that transaction is committed.
     */
    emitEvent(eventName, entry) {
      strapi.db.transaction(({ onCommit }) => {
        onCommit(() => emitEvent(eventName, entry));
      });
    }
  };
};
exports.createEventManager = createEventManager;
//# sourceMappingURL=events.js.map
