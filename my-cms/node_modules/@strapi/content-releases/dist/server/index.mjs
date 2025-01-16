import { contentTypes as contentTypes$1, async, setCreatorFields, errors, yup as yup$1, validateYupSchema } from "@strapi/utils";
import isEqual from "lodash/isEqual";
import { difference, keys } from "lodash";
import _ from "lodash/fp";
import { scheduleJob } from "node-schedule";
import * as yup from "yup";
const RELEASE_MODEL_UID = "plugin::content-releases.release";
const RELEASE_ACTION_MODEL_UID = "plugin::content-releases.release-action";
const ACTIONS = [
  {
    section: "plugins",
    displayName: "Read",
    uid: "read",
    pluginName: "content-releases"
  },
  {
    section: "plugins",
    displayName: "Create",
    uid: "create",
    pluginName: "content-releases"
  },
  {
    section: "plugins",
    displayName: "Edit",
    uid: "update",
    pluginName: "content-releases"
  },
  {
    section: "plugins",
    displayName: "Delete",
    uid: "delete",
    pluginName: "content-releases"
  },
  {
    section: "plugins",
    displayName: "Publish",
    uid: "publish",
    pluginName: "content-releases"
  },
  {
    section: "plugins",
    displayName: "Remove an entry from a release",
    uid: "delete-action",
    pluginName: "content-releases"
  },
  {
    section: "plugins",
    displayName: "Add an entry to a release",
    uid: "create-action",
    pluginName: "content-releases"
  },
  // Settings
  {
    uid: "settings.read",
    section: "settings",
    displayName: "Read",
    category: "content releases",
    subCategory: "options",
    pluginName: "content-releases"
  },
  {
    uid: "settings.update",
    section: "settings",
    displayName: "Edit",
    category: "content releases",
    subCategory: "options",
    pluginName: "content-releases"
  }
];
const ALLOWED_WEBHOOK_EVENTS = {
  RELEASES_PUBLISH: "releases.publish"
};
const getService = (name, { strapi: strapi2 }) => {
  return strapi2.plugin("content-releases").service(name);
};
const getDraftEntryValidStatus = async ({ contentType, documentId, locale }, { strapi: strapi2 }) => {
  const populateBuilderService = strapi2.plugin("content-manager").service("populate-builder");
  const populate = await populateBuilderService(contentType).populateDeep(Infinity).build();
  const entry = await getEntry({ contentType, documentId, locale, populate }, { strapi: strapi2 });
  return isEntryValid(contentType, entry, { strapi: strapi2 });
};
const isEntryValid = async (contentTypeUid, entry, { strapi: strapi2 }) => {
  try {
    await strapi2.entityValidator.validateEntityCreation(
      strapi2.getModel(contentTypeUid),
      entry,
      void 0,
      // @ts-expect-error - FIXME: entity here is unnecessary
      entry
    );
    const workflowsService = strapi2.plugin("review-workflows").service("workflows");
    const workflow = await workflowsService.getAssignedWorkflow(contentTypeUid, {
      populate: "stageRequiredToPublish"
    });
    if (workflow?.stageRequiredToPublish) {
      return entry.strapi_stage.id === workflow.stageRequiredToPublish.id;
    }
    return true;
  } catch {
    return false;
  }
};
const getEntry = async ({
  contentType,
  documentId,
  locale,
  populate,
  status = "draft"
}, { strapi: strapi2 }) => {
  if (documentId) {
    const entry = await strapi2.documents(contentType).findOne({ documentId, locale, populate, status });
    if (status === "published" && !entry) {
      return strapi2.documents(contentType).findOne({ documentId, locale, populate, status: "draft" });
    }
    return entry;
  }
  return strapi2.documents(contentType).findFirst({ locale, populate, status });
};
const getEntryStatus = async (contentType, entry) => {
  if (entry.publishedAt) {
    return "published";
  }
  const publishedEntry = await strapi.documents(contentType).findOne({
    documentId: entry.documentId,
    locale: entry.locale,
    status: "published",
    fields: ["updatedAt"]
  });
  if (!publishedEntry) {
    return "draft";
  }
  const entryUpdatedAt = new Date(entry.updatedAt).getTime();
  const publishedEntryUpdatedAt = new Date(publishedEntry.updatedAt).getTime();
  if (entryUpdatedAt > publishedEntryUpdatedAt) {
    return "modified";
  }
  return "published";
};
async function deleteActionsOnDisableDraftAndPublish({
  oldContentTypes,
  contentTypes: contentTypes2
}) {
  if (!oldContentTypes) {
    return;
  }
  for (const uid in contentTypes2) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes2[uid];
    if (contentTypes$1.hasDraftAndPublish(oldContentType) && !contentTypes$1.hasDraftAndPublish(contentType)) {
      await strapi.db?.queryBuilder(RELEASE_ACTION_MODEL_UID).delete().where({ contentType: uid }).execute();
    }
  }
}
async function deleteActionsOnDeleteContentType({ oldContentTypes, contentTypes: contentTypes2 }) {
  const deletedContentTypes = difference(keys(oldContentTypes), keys(contentTypes2)) ?? [];
  if (deletedContentTypes.length) {
    await async.map(deletedContentTypes, async (deletedContentTypeUID) => {
      return strapi.db?.queryBuilder(RELEASE_ACTION_MODEL_UID).delete().where({ contentType: deletedContentTypeUID }).execute();
    });
  }
}
async function migrateIsValidAndStatusReleases() {
  const releasesWithoutStatus = await strapi.db.query(RELEASE_MODEL_UID).findMany({
    where: {
      status: null,
      releasedAt: null
    },
    populate: {
      actions: {
        populate: {
          entry: true
        }
      }
    }
  });
  async.map(releasesWithoutStatus, async (release2) => {
    const actions = release2.actions;
    const notValidatedActions = actions.filter((action) => action.isEntryValid === null);
    for (const action of notValidatedActions) {
      if (action.entry) {
        const isEntryValid2 = getDraftEntryValidStatus(
          {
            contentType: action.contentType,
            documentId: action.entryDocumentId,
            locale: action.locale
          },
          { strapi }
        );
        await strapi.db.query(RELEASE_ACTION_MODEL_UID).update({
          where: {
            id: action.id
          },
          data: {
            isEntryValid: isEntryValid2
          }
        });
      }
    }
    return getService("release", { strapi }).updateReleaseStatus(release2.id);
  });
  const publishedReleases = await strapi.db.query(RELEASE_MODEL_UID).findMany({
    where: {
      status: null,
      releasedAt: {
        $notNull: true
      }
    }
  });
  async.map(publishedReleases, async (release2) => {
    return strapi.db.query(RELEASE_MODEL_UID).update({
      where: {
        id: release2.id
      },
      data: {
        status: "done"
      }
    });
  });
}
async function revalidateChangedContentTypes({ oldContentTypes, contentTypes: contentTypes2 }) {
  if (oldContentTypes !== void 0 && contentTypes2 !== void 0) {
    const contentTypesWithDraftAndPublish = Object.keys(oldContentTypes).filter(
      (uid) => oldContentTypes[uid]?.options?.draftAndPublish
    );
    const releasesAffected = /* @__PURE__ */ new Set();
    async.map(contentTypesWithDraftAndPublish, async (contentTypeUID) => {
      const oldContentType = oldContentTypes[contentTypeUID];
      const contentType = contentTypes2[contentTypeUID];
      if (!isEqual(oldContentType?.attributes, contentType?.attributes)) {
        const actions = await strapi.db.query(RELEASE_ACTION_MODEL_UID).findMany({
          where: {
            contentType: contentTypeUID
          },
          populate: {
            entry: true,
            release: true
          }
        });
        await async.map(actions, async (action) => {
          if (action.entry && action.release && action.type === "publish") {
            const isEntryValid2 = await getDraftEntryValidStatus(
              {
                contentType: contentTypeUID,
                documentId: action.entryDocumentId,
                locale: action.locale
              },
              { strapi }
            );
            releasesAffected.add(action.release.id);
            await strapi.db.query(RELEASE_ACTION_MODEL_UID).update({
              where: {
                id: action.id
              },
              data: {
                isEntryValid: isEntryValid2
              }
            });
          }
        });
      }
    }).then(() => {
      async.map(releasesAffected, async (releaseId) => {
        return getService("release", { strapi }).updateReleaseStatus(releaseId);
      });
    });
  }
}
async function disableContentTypeLocalized({ oldContentTypes, contentTypes: contentTypes2 }) {
  if (!oldContentTypes) {
    return;
  }
  const i18nPlugin = strapi.plugin("i18n");
  if (!i18nPlugin) {
    return;
  }
  for (const uid in contentTypes2) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes2[uid];
    const { isLocalizedContentType } = i18nPlugin.service("content-types");
    if (isLocalizedContentType(oldContentType) && !isLocalizedContentType(contentType)) {
      await strapi.db.queryBuilder(RELEASE_ACTION_MODEL_UID).update({
        locale: null
      }).where({ contentType: uid }).execute();
    }
  }
}
async function enableContentTypeLocalized({ oldContentTypes, contentTypes: contentTypes2 }) {
  if (!oldContentTypes) {
    return;
  }
  const i18nPlugin = strapi.plugin("i18n");
  if (!i18nPlugin) {
    return;
  }
  for (const uid in contentTypes2) {
    if (!oldContentTypes[uid]) {
      continue;
    }
    const oldContentType = oldContentTypes[uid];
    const contentType = contentTypes2[uid];
    const { isLocalizedContentType } = i18nPlugin.service("content-types");
    const { getDefaultLocale } = i18nPlugin.service("locales");
    if (!isLocalizedContentType(oldContentType) && isLocalizedContentType(contentType)) {
      const defaultLocale = await getDefaultLocale();
      await strapi.db.queryBuilder(RELEASE_ACTION_MODEL_UID).update({
        locale: defaultLocale
      }).where({ contentType: uid }).execute();
    }
  }
}
const addEntryDocumentToReleaseActions = {
  name: "content-releases::5.0.0-add-entry-document-id-to-release-actions",
  async up(trx, db) {
    const hasTable = await trx.schema.hasTable("strapi_release_actions");
    if (!hasTable) {
      return;
    }
    const hasPolymorphicColumn = await trx.schema.hasColumn("strapi_release_actions", "target_id");
    if (hasPolymorphicColumn) {
      const hasEntryDocumentIdColumn = await trx.schema.hasColumn(
        "strapi_release_actions",
        "entry_document_id"
      );
      if (!hasEntryDocumentIdColumn) {
        await trx.schema.alterTable("strapi_release_actions", (table) => {
          table.string("entry_document_id");
        });
      }
      const releaseActions = await trx.select("*").from("strapi_release_actions");
      async.map(releaseActions, async (action) => {
        const { target_type, target_id } = action;
        const entry = await db.query(target_type).findOne({ where: { id: target_id } });
        if (entry) {
          await trx("strapi_release_actions").update({ entry_document_id: entry.documentId }).where("id", action.id);
        }
      });
    }
  },
  async down() {
    throw new Error("not implemented");
  }
};
const register = async ({ strapi: strapi2 }) => {
  if (strapi2.ee.features.isEnabled("cms-content-releases")) {
    await strapi2.service("admin::permission").actionProvider.registerMany(ACTIONS);
    strapi2.db.migrations.providers.internal.register(addEntryDocumentToReleaseActions);
    strapi2.hook("strapi::content-types.beforeSync").register(disableContentTypeLocalized).register(deleteActionsOnDisableDraftAndPublish);
    strapi2.hook("strapi::content-types.afterSync").register(deleteActionsOnDeleteContentType).register(enableContentTypeLocalized).register(revalidateChangedContentTypes).register(migrateIsValidAndStatusReleases);
  }
  if (strapi2.plugin("graphql")) {
    const graphqlExtensionService = strapi2.plugin("graphql").service("extension");
    graphqlExtensionService.shadowCRUD(RELEASE_MODEL_UID).disable();
    graphqlExtensionService.shadowCRUD(RELEASE_ACTION_MODEL_UID).disable();
  }
};
const updateActionsStatusAndUpdateReleaseStatus = async (contentType, entry) => {
  const releases = await strapi.db.query(RELEASE_MODEL_UID).findMany({
    where: {
      releasedAt: null,
      actions: {
        contentType,
        entryDocumentId: entry.documentId,
        locale: entry.locale
      }
    }
  });
  const entryStatus = await isEntryValid(contentType, entry, { strapi });
  await strapi.db.query(RELEASE_ACTION_MODEL_UID).updateMany({
    where: {
      contentType,
      entryDocumentId: entry.documentId,
      locale: entry.locale
    },
    data: {
      isEntryValid: entryStatus
    }
  });
  for (const release2 of releases) {
    getService("release", { strapi }).updateReleaseStatus(release2.id);
  }
};
const deleteActionsAndUpdateReleaseStatus = async (params) => {
  const releases = await strapi.db.query(RELEASE_MODEL_UID).findMany({
    where: {
      actions: params
    }
  });
  await strapi.db.query(RELEASE_ACTION_MODEL_UID).deleteMany({
    where: params
  });
  for (const release2 of releases) {
    getService("release", { strapi }).updateReleaseStatus(release2.id);
  }
};
const deleteActionsOnDelete = async (ctx, next) => {
  if (ctx.action !== "delete") {
    return next();
  }
  if (!contentTypes$1.hasDraftAndPublish(ctx.contentType)) {
    return next();
  }
  const contentType = ctx.contentType.uid;
  const { documentId, locale } = ctx.params;
  const result = await next();
  if (!result) {
    return result;
  }
  try {
    deleteActionsAndUpdateReleaseStatus({
      contentType,
      entryDocumentId: documentId,
      ...locale !== "*" && { locale }
    });
  } catch (error) {
    strapi.log.error("Error while deleting release actions after delete", {
      error
    });
  }
  return result;
};
const updateActionsOnUpdate = async (ctx, next) => {
  if (ctx.action !== "update") {
    return next();
  }
  if (!contentTypes$1.hasDraftAndPublish(ctx.contentType)) {
    return next();
  }
  const contentType = ctx.contentType.uid;
  const result = await next();
  if (!result) {
    return result;
  }
  try {
    updateActionsStatusAndUpdateReleaseStatus(contentType, result);
  } catch (error) {
    strapi.log.error("Error while updating release actions after update", {
      error
    });
  }
  return result;
};
const deleteReleasesActionsAndUpdateReleaseStatus = async (params) => {
  const releases = await strapi.db.query(RELEASE_MODEL_UID).findMany({
    where: {
      actions: params
    }
  });
  await strapi.db.query(RELEASE_ACTION_MODEL_UID).deleteMany({
    where: params
  });
  for (const release2 of releases) {
    getService("release", { strapi }).updateReleaseStatus(release2.id);
  }
};
const bootstrap = async ({ strapi: strapi2 }) => {
  if (strapi2.ee.features.isEnabled("cms-content-releases")) {
    const contentTypesWithDraftAndPublish = Object.keys(strapi2.contentTypes).filter(
      (uid) => strapi2.contentTypes[uid]?.options?.draftAndPublish
    );
    strapi2.db.lifecycles.subscribe({
      models: contentTypesWithDraftAndPublish,
      /**
       * deleteMany is still used outside documents service, for example when deleting a locale
       */
      async afterDeleteMany(event) {
        try {
          const model = strapi2.getModel(event.model.uid);
          if (model.kind === "collectionType" && model.options?.draftAndPublish) {
            const { where } = event.params;
            deleteReleasesActionsAndUpdateReleaseStatus({
              contentType: model.uid,
              locale: where?.locale ?? null,
              ...where?.documentId && { entryDocumentId: where.documentId }
            });
          }
        } catch (error) {
          strapi2.log.error("Error while deleting release actions after entry deleteMany", {
            error
          });
        }
      }
    });
    strapi2.documents.use(deleteActionsOnDelete);
    strapi2.documents.use(updateActionsOnUpdate);
    getService("scheduling", { strapi: strapi2 }).syncFromDatabase().catch((err) => {
      strapi2.log.error(
        "Error while syncing scheduled jobs from the database in the content-releases plugin. This could lead to errors in the releases scheduling."
      );
      throw err;
    });
    Object.entries(ALLOWED_WEBHOOK_EVENTS).forEach(([key, value]) => {
      strapi2.get("webhookStore").addAllowedEvent(key, value);
    });
  }
};
const destroy = async ({ strapi: strapi2 }) => {
  const scheduledJobs = getService("scheduling", {
    strapi: strapi2
  }).getAll();
  for (const [, job] of scheduledJobs) {
    job.cancel();
  }
};
const schema$1 = {
  collectionName: "strapi_releases",
  info: {
    singularName: "release",
    pluralName: "releases",
    displayName: "Release"
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    "content-manager": {
      visible: false
    },
    "content-type-builder": {
      visible: false
    }
  },
  attributes: {
    name: {
      type: "string",
      required: true
    },
    releasedAt: {
      type: "datetime"
    },
    scheduledAt: {
      type: "datetime"
    },
    timezone: {
      type: "string"
    },
    status: {
      type: "enumeration",
      enum: ["ready", "blocked", "failed", "done", "empty"],
      required: true
    },
    actions: {
      type: "relation",
      relation: "oneToMany",
      target: RELEASE_ACTION_MODEL_UID,
      mappedBy: "release"
    }
  }
};
const release$1 = {
  schema: schema$1
};
const schema = {
  collectionName: "strapi_release_actions",
  info: {
    singularName: "release-action",
    pluralName: "release-actions",
    displayName: "Release Action"
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    "content-manager": {
      visible: false
    },
    "content-type-builder": {
      visible: false
    }
  },
  attributes: {
    type: {
      type: "enumeration",
      enum: ["publish", "unpublish"],
      required: true
    },
    contentType: {
      type: "string",
      required: true
    },
    entryDocumentId: {
      type: "string"
    },
    locale: {
      type: "string"
    },
    release: {
      type: "relation",
      relation: "manyToOne",
      target: RELEASE_MODEL_UID,
      inversedBy: "actions"
    },
    isEntryValid: {
      type: "boolean"
    }
  }
};
const releaseAction$1 = {
  schema
};
const contentTypes = {
  release: release$1,
  "release-action": releaseAction$1
};
const createReleaseService = ({ strapi: strapi2 }) => {
  const dispatchWebhook = (event, { isPublished, release: release2, error }) => {
    strapi2.eventHub.emit(event, {
      isPublished,
      error,
      release: release2
    });
  };
  const getFormattedActions = async (releaseId) => {
    const actions = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).findMany({
      where: {
        release: {
          id: releaseId
        }
      }
    });
    if (actions.length === 0) {
      throw new errors.ValidationError("No entries to publish");
    }
    const formattedActions = {};
    for (const action of actions) {
      const contentTypeUid = action.contentType;
      if (!formattedActions[contentTypeUid]) {
        formattedActions[contentTypeUid] = {
          publish: [],
          unpublish: []
        };
      }
      formattedActions[contentTypeUid][action.type].push({
        documentId: action.entryDocumentId,
        locale: action.locale
      });
    }
    return formattedActions;
  };
  return {
    async create(releaseData, { user }) {
      const releaseWithCreatorFields = await setCreatorFields({ user })(releaseData);
      const {
        validatePendingReleasesLimit,
        validateUniqueNameForPendingRelease,
        validateScheduledAtIsLaterThanNow
      } = getService("release-validation", { strapi: strapi2 });
      await Promise.all([
        validatePendingReleasesLimit(),
        validateUniqueNameForPendingRelease(releaseWithCreatorFields.name),
        validateScheduledAtIsLaterThanNow(releaseWithCreatorFields.scheduledAt)
      ]);
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).create({
        data: {
          ...releaseWithCreatorFields,
          status: "empty"
        }
      });
      if (releaseWithCreatorFields.scheduledAt) {
        const schedulingService = getService("scheduling", { strapi: strapi2 });
        await schedulingService.set(release2.id, release2.scheduledAt);
      }
      strapi2.telemetry.send("didCreateContentRelease");
      return release2;
    },
    async findOne(id, query = {}) {
      const dbQuery = strapi2.get("query-params").transform(RELEASE_MODEL_UID, query);
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({
        ...dbQuery,
        where: { id }
      });
      return release2;
    },
    findPage(query) {
      const dbQuery = strapi2.get("query-params").transform(RELEASE_MODEL_UID, query ?? {});
      return strapi2.db.query(RELEASE_MODEL_UID).findPage({
        ...dbQuery,
        populate: {
          actions: {
            count: true
          }
        }
      });
    },
    findMany(query) {
      const dbQuery = strapi2.get("query-params").transform(RELEASE_MODEL_UID, query ?? {});
      return strapi2.db.query(RELEASE_MODEL_UID).findMany({
        ...dbQuery
      });
    },
    async update(id, releaseData, { user }) {
      const releaseWithCreatorFields = await setCreatorFields({ user, isEdition: true })(
        releaseData
      );
      const { validateUniqueNameForPendingRelease, validateScheduledAtIsLaterThanNow } = getService(
        "release-validation",
        { strapi: strapi2 }
      );
      await Promise.all([
        validateUniqueNameForPendingRelease(releaseWithCreatorFields.name, id),
        validateScheduledAtIsLaterThanNow(releaseWithCreatorFields.scheduledAt)
      ]);
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({ where: { id } });
      if (!release2) {
        throw new errors.NotFoundError(`No release found for id ${id}`);
      }
      if (release2.releasedAt) {
        throw new errors.ValidationError("Release already published");
      }
      const updatedRelease = await strapi2.db.query(RELEASE_MODEL_UID).update({
        where: { id },
        data: releaseWithCreatorFields
      });
      const schedulingService = getService("scheduling", { strapi: strapi2 });
      if (releaseData.scheduledAt) {
        await schedulingService.set(id, releaseData.scheduledAt);
      } else if (release2.scheduledAt) {
        schedulingService.cancel(id);
      }
      this.updateReleaseStatus(id);
      strapi2.telemetry.send("didUpdateContentRelease");
      return updatedRelease;
    },
    async getAllComponents() {
      const contentManagerComponentsService = strapi2.plugin("content-manager").service("components");
      const components = await contentManagerComponentsService.findAllComponents();
      const componentsMap = components.reduce(
        (acc, component) => {
          acc[component.uid] = component;
          return acc;
        },
        {}
      );
      return componentsMap;
    },
    async delete(releaseId) {
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({
        where: { id: releaseId },
        populate: {
          actions: {
            select: ["id"]
          }
        }
      });
      if (!release2) {
        throw new errors.NotFoundError(`No release found for id ${releaseId}`);
      }
      if (release2.releasedAt) {
        throw new errors.ValidationError("Release already published");
      }
      await strapi2.db.transaction(async () => {
        await strapi2.db.query(RELEASE_ACTION_MODEL_UID).deleteMany({
          where: {
            id: {
              $in: release2.actions.map((action) => action.id)
            }
          }
        });
        await strapi2.db.query(RELEASE_MODEL_UID).delete({
          where: {
            id: releaseId
          }
        });
      });
      if (release2.scheduledAt) {
        const schedulingService = getService("scheduling", { strapi: strapi2 });
        await schedulingService.cancel(release2.id);
      }
      strapi2.telemetry.send("didDeleteContentRelease");
      return release2;
    },
    async publish(releaseId) {
      const {
        release: release2,
        error
      } = await strapi2.db.transaction(async ({ trx }) => {
        const lockedRelease = await strapi2.db?.queryBuilder(RELEASE_MODEL_UID).where({ id: releaseId }).select(["id", "name", "releasedAt", "status"]).first().transacting(trx).forUpdate().execute();
        if (!lockedRelease) {
          throw new errors.NotFoundError(`No release found for id ${releaseId}`);
        }
        if (lockedRelease.releasedAt) {
          throw new errors.ValidationError("Release already published");
        }
        if (lockedRelease.status === "failed") {
          throw new errors.ValidationError("Release failed to publish");
        }
        try {
          strapi2.log.info(`[Content Releases] Starting to publish release ${lockedRelease.name}`);
          const formattedActions = await getFormattedActions(releaseId);
          await strapi2.db.transaction(
            async () => Promise.all(
              Object.keys(formattedActions).map(async (contentTypeUid) => {
                const contentType = contentTypeUid;
                const { publish, unpublish } = formattedActions[contentType];
                return Promise.all([
                  ...publish.map((params) => strapi2.documents(contentType).publish(params)),
                  ...unpublish.map((params) => strapi2.documents(contentType).unpublish(params))
                ]);
              })
            )
          );
          const release22 = await strapi2.db.query(RELEASE_MODEL_UID).update({
            where: {
              id: releaseId
            },
            data: {
              status: "done",
              releasedAt: /* @__PURE__ */ new Date()
            }
          });
          dispatchWebhook(ALLOWED_WEBHOOK_EVENTS.RELEASES_PUBLISH, {
            isPublished: true,
            release: release22
          });
          strapi2.telemetry.send("didPublishContentRelease");
          return { release: release22, error: null };
        } catch (error2) {
          dispatchWebhook(ALLOWED_WEBHOOK_EVENTS.RELEASES_PUBLISH, {
            isPublished: false,
            error: error2
          });
          await strapi2.db?.queryBuilder(RELEASE_MODEL_UID).where({ id: releaseId }).update({
            status: "failed"
          }).transacting(trx).execute();
          return {
            release: null,
            error: error2
          };
        }
      });
      if (error instanceof Error) {
        throw error;
      }
      return release2;
    },
    async updateReleaseStatus(releaseId) {
      const releaseActionService = getService("release-action", { strapi: strapi2 });
      const [totalActions, invalidActions] = await Promise.all([
        releaseActionService.countActions({
          filters: {
            release: releaseId
          }
        }),
        releaseActionService.countActions({
          filters: {
            release: releaseId,
            isEntryValid: false
          }
        })
      ]);
      if (totalActions > 0) {
        if (invalidActions > 0) {
          return strapi2.db.query(RELEASE_MODEL_UID).update({
            where: {
              id: releaseId
            },
            data: {
              status: "blocked"
            }
          });
        }
        return strapi2.db.query(RELEASE_MODEL_UID).update({
          where: {
            id: releaseId
          },
          data: {
            status: "ready"
          }
        });
      }
      return strapi2.db.query(RELEASE_MODEL_UID).update({
        where: {
          id: releaseId
        },
        data: {
          status: "empty"
        }
      });
    }
  };
};
const getGroupName = (queryValue) => {
  switch (queryValue) {
    case "contentType":
      return "contentType.displayName";
    case "type":
      return "type";
    case "locale":
      return _.getOr("No locale", "locale.name");
    default:
      return "contentType.displayName";
  }
};
const createReleaseActionService = ({ strapi: strapi2 }) => {
  const getLocalesDataForActions = async () => {
    if (!strapi2.plugin("i18n")) {
      return {};
    }
    const allLocales = await strapi2.plugin("i18n").service("locales").find() || [];
    return allLocales.reduce((acc, locale) => {
      acc[locale.code] = { name: locale.name, code: locale.code };
      return acc;
    }, {});
  };
  const getContentTypesDataForActions = async (contentTypesUids) => {
    const contentManagerContentTypeService = strapi2.plugin("content-manager").service("content-types");
    const contentTypesData = {};
    for (const contentTypeUid of contentTypesUids) {
      const contentTypeConfig = await contentManagerContentTypeService.findConfiguration({
        uid: contentTypeUid
      });
      contentTypesData[contentTypeUid] = {
        mainField: contentTypeConfig.settings.mainField,
        displayName: strapi2.getModel(contentTypeUid).info.displayName
      };
    }
    return contentTypesData;
  };
  return {
    async create(releaseId, action, { disableUpdateReleaseStatus = false } = {}) {
      const { validateEntryData, validateUniqueEntry } = getService("release-validation", {
        strapi: strapi2
      });
      await Promise.all([
        validateEntryData(action.contentType, action.entryDocumentId),
        validateUniqueEntry(releaseId, action)
      ]);
      const model = strapi2.contentType(action.contentType);
      if (model.kind === "singleType") {
        const document = await strapi2.db.query(model.uid).findOne({ select: ["documentId"] });
        if (!document) {
          throw new errors.NotFoundError(`No entry found for contentType ${action.contentType}`);
        }
        action.entryDocumentId = document.documentId;
      }
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({ where: { id: releaseId } });
      if (!release2) {
        throw new errors.NotFoundError(`No release found for id ${releaseId}`);
      }
      if (release2.releasedAt) {
        throw new errors.ValidationError("Release already published");
      }
      const actionStatus = action.type === "publish" ? await getDraftEntryValidStatus(
        {
          contentType: action.contentType,
          documentId: action.entryDocumentId,
          locale: action.locale
        },
        {
          strapi: strapi2
        }
      ) : true;
      const releaseAction2 = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).create({
        data: {
          ...action,
          release: release2.id,
          isEntryValid: actionStatus
        },
        populate: { release: { select: ["id"] } }
      });
      if (!disableUpdateReleaseStatus) {
        getService("release", { strapi: strapi2 }).updateReleaseStatus(release2.id);
      }
      return releaseAction2;
    },
    async findPage(releaseId, query) {
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({
        where: { id: releaseId },
        select: ["id"]
      });
      if (!release2) {
        throw new errors.NotFoundError(`No release found for id ${releaseId}`);
      }
      const dbQuery = strapi2.get("query-params").transform(RELEASE_ACTION_MODEL_UID, query ?? {});
      const { results: actions, pagination } = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).findPage({
        ...dbQuery,
        where: {
          release: releaseId
        }
      });
      const populateBuilderService = strapi2.plugin("content-manager").service("populate-builder");
      const actionsWithEntry = await async.map(actions, async (action) => {
        const populate = await populateBuilderService(action.contentType).populateDeep(Infinity).build();
        const entry = await getEntry(
          {
            contentType: action.contentType,
            documentId: action.entryDocumentId,
            locale: action.locale,
            populate,
            status: action.type === "publish" ? "draft" : "published"
          },
          { strapi: strapi2 }
        );
        return {
          ...action,
          entry,
          status: entry ? await getEntryStatus(action.contentType, entry) : null
        };
      });
      return {
        results: actionsWithEntry,
        pagination
      };
    },
    async groupActions(actions, groupBy) {
      const contentTypeUids = actions.reduce((acc, action) => {
        if (!acc.includes(action.contentType)) {
          acc.push(action.contentType);
        }
        return acc;
      }, []);
      const allReleaseContentTypesDictionary = await getContentTypesDataForActions(contentTypeUids);
      const allLocalesDictionary = await getLocalesDataForActions();
      const formattedData = actions.map((action) => {
        const { mainField, displayName } = allReleaseContentTypesDictionary[action.contentType];
        return {
          ...action,
          locale: action.locale ? allLocalesDictionary[action.locale] : null,
          contentType: {
            displayName,
            mainFieldValue: action.entry[mainField],
            uid: action.contentType
          }
        };
      });
      const groupName = getGroupName(groupBy);
      return _.groupBy(groupName)(formattedData);
    },
    async getContentTypeModelsFromActions(actions) {
      const contentTypeUids = actions.reduce((acc, action) => {
        if (!acc.includes(action.contentType)) {
          acc.push(action.contentType);
        }
        return acc;
      }, []);
      const workflowsService = strapi2.plugin("review-workflows").service("workflows");
      const contentTypeModelsMap = await async.reduce(contentTypeUids)(
        async (accPromise, contentTypeUid) => {
          const acc = await accPromise;
          const contentTypeModel = strapi2.getModel(contentTypeUid);
          const workflow = await workflowsService.getAssignedWorkflow(contentTypeUid, {
            populate: "stageRequiredToPublish"
          });
          acc[contentTypeUid] = {
            ...contentTypeModel,
            hasReviewWorkflow: !!workflow,
            stageRequiredToPublish: workflow?.stageRequiredToPublish
          };
          return acc;
        },
        {}
      );
      return contentTypeModelsMap;
    },
    async countActions(query) {
      const dbQuery = strapi2.get("query-params").transform(RELEASE_ACTION_MODEL_UID, query ?? {});
      return strapi2.db.query(RELEASE_ACTION_MODEL_UID).count(dbQuery);
    },
    async update(actionId, releaseId, update) {
      const action = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).findOne({
        where: {
          id: actionId,
          release: {
            id: releaseId,
            releasedAt: {
              $null: true
            }
          }
        }
      });
      if (!action) {
        throw new errors.NotFoundError(
          `Action with id ${actionId} not found in release with id ${releaseId} or it is already published`
        );
      }
      const actionStatus = update.type === "publish" ? await getDraftEntryValidStatus(
        {
          contentType: action.contentType,
          documentId: action.entryDocumentId,
          locale: action.locale
        },
        {
          strapi: strapi2
        }
      ) : true;
      const updatedAction = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).update({
        where: {
          id: actionId,
          release: {
            id: releaseId,
            releasedAt: {
              $null: true
            }
          }
        },
        data: {
          ...update,
          isEntryValid: actionStatus
        }
      });
      getService("release", { strapi: strapi2 }).updateReleaseStatus(releaseId);
      return updatedAction;
    },
    async delete(actionId, releaseId) {
      const deletedAction = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).delete({
        where: {
          id: actionId,
          release: {
            id: releaseId,
            releasedAt: {
              $null: true
            }
          }
        }
      });
      if (!deletedAction) {
        throw new errors.NotFoundError(
          `Action with id ${actionId} not found in release with id ${releaseId} or it is already published`
        );
      }
      getService("release", { strapi: strapi2 }).updateReleaseStatus(releaseId);
      return deletedAction;
    },
    async validateActionsByContentTypes(contentTypeUids) {
      const actions = await strapi2.db.query(RELEASE_ACTION_MODEL_UID).findMany({
        where: {
          contentType: {
            $in: contentTypeUids
          },
          // We only want to validate actions that are going to be published
          type: "publish",
          release: {
            releasedAt: {
              $null: true
            }
          }
        },
        populate: { release: true }
      });
      const releasesUpdated = [];
      await async.map(actions, async (action) => {
        const isValid = await getDraftEntryValidStatus(
          {
            contentType: action.contentType,
            documentId: action.entryDocumentId,
            locale: action.locale
          },
          { strapi: strapi2 }
        );
        await strapi2.db.query(RELEASE_ACTION_MODEL_UID).update({
          where: {
            id: action.id
          },
          data: {
            isEntryValid: isValid
          }
        });
        if (!releasesUpdated.includes(action.release.id)) {
          releasesUpdated.push(action.release.id);
        }
        return {
          id: action.id,
          isEntryValid: isValid
        };
      });
      if (releasesUpdated.length > 0) {
        await async.map(releasesUpdated, async (releaseId) => {
          await getService("release", { strapi: strapi2 }).updateReleaseStatus(releaseId);
        });
      }
    }
  };
};
class AlreadyOnReleaseError extends errors.ApplicationError {
  constructor(message) {
    super(message);
    this.name = "AlreadyOnReleaseError";
  }
}
const createReleaseValidationService = ({ strapi: strapi2 }) => ({
  async validateUniqueEntry(releaseId, releaseActionArgs) {
    const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({
      where: {
        id: releaseId
      },
      populate: {
        actions: true
      }
    });
    if (!release2) {
      throw new errors.NotFoundError(`No release found for id ${releaseId}`);
    }
    const isEntryInRelease = release2.actions.some(
      (action) => action.entryDocumentId === releaseActionArgs.entryDocumentId && action.contentType === releaseActionArgs.contentType && (releaseActionArgs.locale ? action.locale === releaseActionArgs.locale : true)
    );
    if (isEntryInRelease) {
      throw new AlreadyOnReleaseError(
        `Entry with documentId ${releaseActionArgs.entryDocumentId}${releaseActionArgs.locale ? `( ${releaseActionArgs.locale})` : ""} and contentType ${releaseActionArgs.contentType} already exists in release with id ${releaseId}`
      );
    }
  },
  validateEntryData(contentTypeUid, entryDocumentId) {
    const contentType = strapi2.contentType(contentTypeUid);
    if (!contentType) {
      throw new errors.NotFoundError(`No content type found for uid ${contentTypeUid}`);
    }
    if (!contentTypes$1.hasDraftAndPublish(contentType)) {
      throw new errors.ValidationError(
        `Content type with uid ${contentTypeUid} does not have draftAndPublish enabled`
      );
    }
    if (contentType.kind === "collectionType" && !entryDocumentId) {
      throw new errors.ValidationError("Document id is required for collection type");
    }
  },
  async validatePendingReleasesLimit() {
    const featureCfg = strapi2.ee.features.get("cms-content-releases");
    const maximumPendingReleases = typeof featureCfg === "object" && featureCfg?.options?.maximumReleases || 3;
    const [, pendingReleasesCount] = await strapi2.db.query(RELEASE_MODEL_UID).findWithCount({
      filters: {
        releasedAt: {
          $null: true
        }
      }
    });
    if (pendingReleasesCount >= maximumPendingReleases) {
      throw new errors.ValidationError("You have reached the maximum number of pending releases");
    }
  },
  async validateUniqueNameForPendingRelease(name, id) {
    const pendingReleases = await strapi2.db.query(RELEASE_MODEL_UID).findMany({
      where: {
        releasedAt: {
          $null: true
        },
        name,
        ...id && { id: { $ne: id } }
      }
    });
    const isNameUnique = pendingReleases.length === 0;
    if (!isNameUnique) {
      throw new errors.ValidationError(`Release with name ${name} already exists`);
    }
  },
  async validateScheduledAtIsLaterThanNow(scheduledAt) {
    if (scheduledAt && new Date(scheduledAt) <= /* @__PURE__ */ new Date()) {
      throw new errors.ValidationError("Scheduled at must be later than now");
    }
  }
});
const createSchedulingService = ({ strapi: strapi2 }) => {
  const scheduledJobs = /* @__PURE__ */ new Map();
  return {
    async set(releaseId, scheduleDate) {
      const release2 = await strapi2.db.query(RELEASE_MODEL_UID).findOne({ where: { id: releaseId, releasedAt: null } });
      if (!release2) {
        throw new errors.NotFoundError(`No release found for id ${releaseId}`);
      }
      const job = scheduleJob(scheduleDate, async () => {
        try {
          await getService("release", { strapi: strapi2 }).publish(releaseId);
        } catch (error) {
        }
        this.cancel(releaseId);
      });
      if (scheduledJobs.has(releaseId)) {
        this.cancel(releaseId);
      }
      scheduledJobs.set(releaseId, job);
      return scheduledJobs;
    },
    cancel(releaseId) {
      if (scheduledJobs.has(releaseId)) {
        scheduledJobs.get(releaseId).cancel();
        scheduledJobs.delete(releaseId);
      }
      return scheduledJobs;
    },
    getAll() {
      return scheduledJobs;
    },
    /**
     * On bootstrap, we can use this function to make sure to sync the scheduled jobs from the database that are not yet released
     * This is useful in case the server was restarted and the scheduled jobs were lost
     * This also could be used to sync different Strapi instances in case of a cluster
     */
    async syncFromDatabase() {
      const releases = await strapi2.db.query(RELEASE_MODEL_UID).findMany({
        where: {
          scheduledAt: {
            $gte: /* @__PURE__ */ new Date()
          },
          releasedAt: null
        }
      });
      for (const release2 of releases) {
        this.set(release2.id, release2.scheduledAt);
      }
      return scheduledJobs;
    }
  };
};
const DEFAULT_SETTINGS = {
  defaultTimezone: null
};
const createSettingsService = ({ strapi: strapi2 }) => {
  const getStore = async () => strapi2.store({ type: "core", name: "content-releases" });
  return {
    async update({ settings: settings2 }) {
      const store = await getStore();
      store.set({ key: "settings", value: settings2 });
      return settings2;
    },
    async find() {
      const store = await getStore();
      const settings2 = await store.get({ key: "settings" });
      return {
        ...DEFAULT_SETTINGS,
        ...settings2 || {}
      };
    }
  };
};
const services = {
  release: createReleaseService,
  "release-action": createReleaseActionService,
  "release-validation": createReleaseValidationService,
  scheduling: createSchedulingService,
  settings: createSettingsService
};
const RELEASE_SCHEMA = yup$1.object().shape({
  name: yup$1.string().trim().required(),
  scheduledAt: yup$1.string().nullable(),
  timezone: yup$1.string().when("scheduledAt", {
    is: (value) => value !== null && value !== void 0,
    then: yup$1.string().required(),
    otherwise: yup$1.string().nullable()
  })
}).required().noUnknown();
const FIND_BY_DOCUMENT_ATTACHED_PARAMS_SCHEMA = yup$1.object().shape({
  contentType: yup$1.string().required(),
  entryDocumentId: yup$1.string().nullable(),
  hasEntryAttached: yup$1.string().nullable(),
  locale: yup$1.string().nullable()
}).required().noUnknown();
const validateRelease = validateYupSchema(RELEASE_SCHEMA);
const validatefindByDocumentAttachedParams = validateYupSchema(
  FIND_BY_DOCUMENT_ATTACHED_PARAMS_SCHEMA
);
const releaseController = {
  /**
   * Find releases based on documents attached or not to the release.
   * If `hasEntryAttached` is true, it will return all releases that have the entry attached.
   * If `hasEntryAttached` is false, it will return all releases that don't have the entry attached.
   */
  async findByDocumentAttached(ctx) {
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: RELEASE_MODEL_UID
    });
    await permissionsManager.validateQuery(ctx.query);
    const releaseService = getService("release", { strapi });
    const query = await permissionsManager.sanitizeQuery(ctx.query);
    await validatefindByDocumentAttachedParams(query);
    const model = strapi.getModel(query.contentType);
    if (model.kind && model.kind === "singleType") {
      const document = await strapi.db.query(model.uid).findOne({ select: ["documentId"] });
      if (!document) {
        throw new errors.NotFoundError(`No entry found for contentType ${query.contentType}`);
      }
      query.entryDocumentId = document.documentId;
    }
    const { contentType, hasEntryAttached, entryDocumentId, locale } = query;
    const isEntryAttached = typeof hasEntryAttached === "string" ? Boolean(JSON.parse(hasEntryAttached)) : false;
    if (isEntryAttached) {
      const releases = await releaseService.findMany({
        where: {
          releasedAt: null,
          actions: {
            contentType,
            entryDocumentId: entryDocumentId ?? null,
            locale: locale ?? null
          }
        },
        populate: {
          actions: {
            fields: ["type"],
            filters: {
              contentType,
              entryDocumentId: entryDocumentId ?? null,
              locale: locale ?? null
            }
          }
        }
      });
      ctx.body = { data: releases };
    } else {
      const relatedReleases = await releaseService.findMany({
        where: {
          releasedAt: null,
          actions: {
            contentType,
            entryDocumentId: entryDocumentId ?? null,
            locale: locale ?? null
          }
        }
      });
      const releases = await releaseService.findMany({
        where: {
          $or: [
            {
              id: {
                $notIn: relatedReleases.map((release2) => release2.id)
              }
            },
            {
              actions: null
            }
          ],
          releasedAt: null
        }
      });
      ctx.body = { data: releases };
    }
  },
  async findPage(ctx) {
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: RELEASE_MODEL_UID
    });
    await permissionsManager.validateQuery(ctx.query);
    const releaseService = getService("release", { strapi });
    const query = await permissionsManager.sanitizeQuery(ctx.query);
    const { results, pagination } = await releaseService.findPage(query);
    const data = results.map((release2) => {
      const { actions, ...releaseData } = release2;
      return {
        ...releaseData,
        actions: {
          meta: {
            count: actions.count
          }
        }
      };
    });
    const pendingReleasesCount = await strapi.db.query(RELEASE_MODEL_UID).count({
      where: {
        releasedAt: null
      }
    });
    ctx.body = { data, meta: { pagination, pendingReleasesCount } };
  },
  async findOne(ctx) {
    const id = ctx.params.id;
    const releaseService = getService("release", { strapi });
    const releaseActionService = getService("release-action", { strapi });
    const release2 = await releaseService.findOne(id, { populate: ["createdBy"] });
    if (!release2) {
      throw new errors.NotFoundError(`Release not found for id: ${id}`);
    }
    const count = await releaseActionService.countActions({
      filters: {
        release: id
      }
    });
    const sanitizedRelease = {
      ...release2,
      createdBy: release2.createdBy ? strapi.service("admin::user").sanitizeUser(release2.createdBy) : null
    };
    const data = {
      ...sanitizedRelease,
      actions: {
        meta: {
          count
        }
      }
    };
    ctx.body = { data };
  },
  async mapEntriesToReleases(ctx) {
    const { contentTypeUid, documentIds, locale } = ctx.query;
    if (!contentTypeUid || !documentIds) {
      throw new errors.ValidationError("Missing required query parameters");
    }
    const releaseService = getService("release", { strapi });
    const releasesWithActions = await releaseService.findMany({
      where: {
        releasedAt: null,
        actions: {
          contentType: contentTypeUid,
          entryDocumentId: {
            $in: documentIds
          },
          locale
        }
      },
      populate: {
        actions: true
      }
    });
    const mappedEntriesInReleases = releasesWithActions.reduce(
      (acc, release2) => {
        release2.actions.forEach((action) => {
          if (action.contentType !== contentTypeUid) {
            return;
          }
          if (locale && action.locale !== locale) {
            return;
          }
          if (!acc[action.entryDocumentId]) {
            acc[action.entryDocumentId] = [{ id: release2.id, name: release2.name }];
          } else {
            acc[action.entryDocumentId].push({ id: release2.id, name: release2.name });
          }
        });
        return acc;
      },
      {}
    );
    ctx.body = {
      data: mappedEntriesInReleases
    };
  },
  async create(ctx) {
    const user = ctx.state.user;
    const releaseArgs = ctx.request.body;
    await validateRelease(releaseArgs);
    const releaseService = getService("release", { strapi });
    const release2 = await releaseService.create(releaseArgs, { user });
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: RELEASE_MODEL_UID
    });
    ctx.created({
      data: await permissionsManager.sanitizeOutput(release2)
    });
  },
  async update(ctx) {
    const user = ctx.state.user;
    const releaseArgs = ctx.request.body;
    const id = ctx.params.id;
    await validateRelease(releaseArgs);
    const releaseService = getService("release", { strapi });
    const release2 = await releaseService.update(id, releaseArgs, { user });
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: RELEASE_MODEL_UID
    });
    ctx.body = {
      data: await permissionsManager.sanitizeOutput(release2)
    };
  },
  async delete(ctx) {
    const id = ctx.params.id;
    const releaseService = getService("release", { strapi });
    const release2 = await releaseService.delete(id);
    ctx.body = {
      data: release2
    };
  },
  async publish(ctx) {
    const id = ctx.params.id;
    const releaseService = getService("release", { strapi });
    const releaseActionService = getService("release-action", { strapi });
    const release2 = await releaseService.publish(id);
    const [countPublishActions, countUnpublishActions] = await Promise.all([
      releaseActionService.countActions({
        filters: {
          release: id,
          type: "publish"
        }
      }),
      releaseActionService.countActions({
        filters: {
          release: id,
          type: "unpublish"
        }
      })
    ]);
    ctx.body = {
      data: release2,
      meta: {
        totalEntries: countPublishActions + countUnpublishActions,
        totalPublishedEntries: countPublishActions,
        totalUnpublishedEntries: countUnpublishActions
      }
    };
  }
};
const RELEASE_ACTION_SCHEMA = yup$1.object().shape({
  contentType: yup$1.string().required(),
  entryDocumentId: yup$1.strapiID(),
  locale: yup$1.string(),
  type: yup$1.string().oneOf(["publish", "unpublish"]).required()
});
const RELEASE_ACTION_UPDATE_SCHEMA = yup$1.object().shape({
  type: yup$1.string().oneOf(["publish", "unpublish"]).required()
});
const FIND_MANY_ACTIONS_PARAMS = yup$1.object().shape({
  groupBy: yup$1.string().oneOf(["action", "contentType", "locale"])
});
const validateReleaseAction = validateYupSchema(RELEASE_ACTION_SCHEMA);
const validateReleaseActionUpdateSchema = validateYupSchema(RELEASE_ACTION_UPDATE_SCHEMA);
const validateFindManyActionsParams = validateYupSchema(FIND_MANY_ACTIONS_PARAMS);
const releaseActionController = {
  async create(ctx) {
    const releaseId = ctx.params.releaseId;
    const releaseActionArgs = ctx.request.body;
    await validateReleaseAction(releaseActionArgs);
    const releaseActionService = getService("release-action", { strapi });
    const releaseAction2 = await releaseActionService.create(releaseId, releaseActionArgs);
    ctx.created({
      data: releaseAction2
    });
  },
  async createMany(ctx) {
    const releaseId = ctx.params.releaseId;
    const releaseActionsArgs = ctx.request.body;
    await Promise.all(
      releaseActionsArgs.map((releaseActionArgs) => validateReleaseAction(releaseActionArgs))
    );
    const releaseActionService = getService("release-action", { strapi });
    const releaseService = getService("release", { strapi });
    const releaseActions = await strapi.db.transaction(async () => {
      const releaseActions2 = await Promise.all(
        releaseActionsArgs.map(async (releaseActionArgs) => {
          try {
            const action = await releaseActionService.create(releaseId, releaseActionArgs, {
              disableUpdateReleaseStatus: true
            });
            return action;
          } catch (error) {
            if (error instanceof AlreadyOnReleaseError) {
              return null;
            }
            throw error;
          }
        })
      );
      return releaseActions2;
    });
    const newReleaseActions = releaseActions.filter((action) => action !== null);
    if (newReleaseActions.length > 0) {
      releaseService.updateReleaseStatus(releaseId);
    }
    ctx.created({
      data: newReleaseActions,
      meta: {
        entriesAlreadyInRelease: releaseActions.length - newReleaseActions.length,
        totalEntries: releaseActions.length
      }
    });
  },
  async findMany(ctx) {
    const releaseId = ctx.params.releaseId;
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: RELEASE_ACTION_MODEL_UID
    });
    await validateFindManyActionsParams(ctx.query);
    if (ctx.query.groupBy) {
      if (!["action", "contentType", "locale"].includes(ctx.query.groupBy)) {
        ctx.badRequest("Invalid groupBy parameter");
      }
    }
    ctx.query.sort = ctx.query.groupBy === "action" ? "type" : ctx.query.groupBy;
    delete ctx.query.groupBy;
    const query = await permissionsManager.sanitizeQuery(ctx.query);
    const releaseActionService = getService("release-action", { strapi });
    const { results, pagination } = await releaseActionService.findPage(releaseId, {
      ...query
    });
    const contentTypeOutputSanitizers = results.reduce((acc, action) => {
      if (acc[action.contentType]) {
        return acc;
      }
      const contentTypePermissionsManager = strapi.service("admin::permission").createPermissionsManager({
        ability: ctx.state.userAbility,
        model: action.contentType
      });
      acc[action.contentType] = contentTypePermissionsManager.sanitizeOutput;
      return acc;
    }, {});
    const sanitizedResults = await async.map(results, async (action) => ({
      ...action,
      entry: action.entry ? await contentTypeOutputSanitizers[action.contentType](action.entry) : {}
    }));
    const groupedData = await releaseActionService.groupActions(sanitizedResults, query.sort);
    const contentTypes2 = await releaseActionService.getContentTypeModelsFromActions(results);
    const releaseService = getService("release", { strapi });
    const components = await releaseService.getAllComponents();
    ctx.body = {
      data: groupedData,
      meta: {
        pagination,
        contentTypes: contentTypes2,
        components
      }
    };
  },
  async update(ctx) {
    const actionId = ctx.params.actionId;
    const releaseId = ctx.params.releaseId;
    const releaseActionUpdateArgs = ctx.request.body;
    await validateReleaseActionUpdateSchema(releaseActionUpdateArgs);
    const releaseActionService = getService("release-action", { strapi });
    const updatedAction = await releaseActionService.update(
      actionId,
      releaseId,
      releaseActionUpdateArgs
    );
    ctx.body = {
      data: updatedAction
    };
  },
  async delete(ctx) {
    const actionId = ctx.params.actionId;
    const releaseId = ctx.params.releaseId;
    const releaseActionService = getService("release-action", { strapi });
    const deletedReleaseAction = await releaseActionService.delete(actionId, releaseId);
    ctx.body = {
      data: deletedReleaseAction
    };
  }
};
const SETTINGS_SCHEMA = yup.object().shape({
  defaultTimezone: yup.string().nullable().default(null)
}).required().noUnknown();
const validateSettings = validateYupSchema(SETTINGS_SCHEMA);
const settingsController = {
  async find(ctx) {
    const settingsService = getService("settings", { strapi });
    const settings2 = await settingsService.find();
    ctx.body = { data: settings2 };
  },
  async update(ctx) {
    const settingsBody = ctx.request.body;
    const settings2 = await validateSettings(settingsBody);
    const settingsService = getService("settings", { strapi });
    const updatedSettings = await settingsService.update({ settings: settings2 });
    ctx.body = { data: updatedSettings };
  }
};
const controllers = {
  release: releaseController,
  "release-action": releaseActionController,
  settings: settingsController
};
const release = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/mapEntriesToReleases",
      handler: "release.mapEntriesToReleases",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.read"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/getByDocumentAttached",
      handler: "release.findByDocumentAttached",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.read"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/",
      handler: "release.create",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.create"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/",
      handler: "release.findPage",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.read"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/:id",
      handler: "release.findOne",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.read"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/:id",
      handler: "release.update",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.update"]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/:id",
      handler: "release.delete",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.delete"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/:id/publish",
      handler: "release.publish",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.publish"]
            }
          }
        ]
      }
    }
  ]
};
const releaseAction = {
  type: "admin",
  routes: [
    {
      method: "POST",
      path: "/:releaseId/actions",
      handler: "release-action.create",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.create-action"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/:releaseId/actions/bulk",
      handler: "release-action.createMany",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.create-action"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/:releaseId/actions",
      handler: "release-action.findMany",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.read"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/:releaseId/actions/:actionId",
      handler: "release-action.update",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.update"]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/:releaseId/actions/:actionId",
      handler: "release-action.delete",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.delete-action"]
            }
          }
        ]
      }
    }
  ]
};
const settings = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/settings",
      handler: "settings.find",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.settings.read"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/settings",
      handler: "settings.update",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::content-releases.settings.update"]
            }
          }
        ]
      }
    }
  ]
};
const routes = {
  settings,
  release,
  "release-action": releaseAction
};
const getPlugin = () => {
  if (strapi.ee.features.isEnabled("cms-content-releases")) {
    return {
      register,
      bootstrap,
      destroy,
      contentTypes,
      services,
      controllers,
      routes
    };
  }
  return {
    // Always return register, it handles its own feature check
    register,
    // Always return contentTypes to avoid losing data when the feature is disabled
    contentTypes
  };
};
const index = getPlugin();
export {
  index as default
};
//# sourceMappingURL=index.mjs.map
