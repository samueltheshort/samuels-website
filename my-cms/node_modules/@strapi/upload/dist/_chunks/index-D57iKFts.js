"use strict";
const _ = require("lodash");
const utils = require("@strapi/utils");
const range = require("koa-range");
const koaStatic = require("koa-static");
const fp = require("lodash/fp");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const fse = require("fs-extra");
const mimeTypes = require("mime-types");
const sharp = require("sharp");
const dateFns = require("date-fns");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const ___default = /* @__PURE__ */ _interopDefault(_);
const utils__default = /* @__PURE__ */ _interopDefault(utils);
const range__default = /* @__PURE__ */ _interopDefault(range);
const koaStatic__default = /* @__PURE__ */ _interopDefault(koaStatic);
const os__default = /* @__PURE__ */ _interopDefault(os);
const path__default = /* @__PURE__ */ _interopDefault(path);
const crypto__default = /* @__PURE__ */ _interopDefault(crypto);
const fs__default = /* @__PURE__ */ _interopDefault(fs);
const fse__default = /* @__PURE__ */ _interopDefault(fse);
const sharp__default = /* @__PURE__ */ _interopDefault(sharp);
const registerUploadMiddleware = ({ strapi: strapi2 }) => {
  strapi2.server.app.on("error", (err) => {
    if (err.code === "EPIPE") {
      return;
    }
    strapi2.server.app.onerror(err);
  });
  const localServerConfig = strapi2.config.get("plugin::upload.providerOptions.localServer", {});
  strapi2.server.routes([
    {
      method: "GET",
      path: "/uploads/(.*)",
      handler: [range__default.default, koaStatic__default.default(strapi2.dirs.static.public, { defer: true, ...localServerConfig })],
      config: { auth: false }
    }
  ]);
};
const paths = {
  "/upload": {
    post: {
      description: "Upload files",
      responses: {
        "200": {
          description: "response",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/UploadFile"
                }
              }
            }
          }
        }
      },
      summary: "",
      tags: [
        "Upload - File"
      ],
      requestBody: {
        description: "Upload files",
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              required: [
                "files"
              ],
              type: "object",
              properties: {
                path: {
                  type: "string",
                  description: "The folder where the file(s) will be uploaded to (only supported on strapi-provider-upload-aws-s3)."
                },
                refId: {
                  type: "string",
                  description: "The ID of the entry which the file(s) will be linked to"
                },
                ref: {
                  type: "string",
                  description: "The unique ID (uid) of the model which the file(s) will be linked to (api::restaurant.restaurant)."
                },
                field: {
                  type: "string",
                  description: "The field of the entry which the file(s) will be precisely linked to."
                },
                files: {
                  type: "array",
                  items: {
                    type: "string",
                    format: "binary"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "/upload?id={id}": {
    post: {
      parameters: [
        {
          name: "id",
          "in": "query",
          description: "File id",
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      description: "Upload file information",
      responses: {
        "200": {
          description: "response",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/UploadFile"
                }
              }
            }
          }
        }
      },
      summary: "",
      tags: [
        "Upload - File"
      ],
      requestBody: {
        description: "Upload files",
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              properties: {
                fileInfo: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string"
                    },
                    alternativeText: {
                      type: "string"
                    },
                    caption: {
                      type: "string"
                    }
                  }
                },
                files: {
                  type: "string",
                  format: "binary"
                }
              }
            }
          }
        }
      }
    }
  },
  "/upload/files": {
    get: {
      tags: [
        "Upload - File"
      ],
      responses: {
        "200": {
          description: "Get a list of files",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/UploadFile"
                }
              }
            }
          }
        }
      }
    }
  },
  "/upload/files/{id}": {
    get: {
      parameters: [
        {
          name: "id",
          "in": "path",
          description: "",
          deprecated: false,
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      tags: [
        "Upload - File"
      ],
      responses: {
        "200": {
          description: "Get a specific file",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UploadFile"
              }
            }
          }
        }
      }
    },
    "delete": {
      parameters: [
        {
          name: "id",
          "in": "path",
          description: "",
          deprecated: false,
          required: true,
          schema: {
            type: "string"
          }
        }
      ],
      tags: [
        "Upload - File"
      ],
      responses: {
        "200": {
          description: "Delete a file",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UploadFile"
              }
            }
          }
        }
      }
    }
  }
};
const components = {
  schemas: {
    UploadFile: {
      properties: {
        id: {
          type: "number"
        },
        name: {
          type: "string"
        },
        alternativeText: {
          type: "string"
        },
        caption: {
          type: "string"
        },
        width: {
          type: "number",
          format: "integer"
        },
        height: {
          type: "number",
          format: "integer"
        },
        formats: {
          type: "number"
        },
        hash: {
          type: "string"
        },
        ext: {
          type: "string"
        },
        mime: {
          type: "string"
        },
        size: {
          type: "number",
          format: "double"
        },
        url: {
          type: "string"
        },
        previewUrl: {
          type: "string"
        },
        provider: {
          type: "string"
        },
        provider_metadata: {
          type: "object"
        },
        createdAt: {
          type: "string",
          format: "date-time"
        },
        updatedAt: {
          type: "string",
          format: "date-time"
        }
      }
    }
  }
};
const spec = {
  paths,
  components
};
const { PayloadTooLargeError } = utils.errors;
const { bytesToHumanReadable, kbytesToBytes } = utils.file;
async function register({ strapi: strapi2 }) {
  strapi2.plugin("upload").provider = createProvider(strapi2.config.get("plugin::upload"));
  await registerUploadMiddleware({ strapi: strapi2 });
  if (strapi2.plugin("graphql")) {
    const { installGraphqlExtension } = await Promise.resolve().then(() => require("./graphql-QF5Y36Qj.js"));
    installGraphqlExtension({ strapi: strapi2 });
  }
  if (strapi2.plugin("documentation")) {
    strapi2.plugin("documentation").service("override").registerOverride(spec, {
      pluginOrigin: "upload",
      excludeFromGeneration: ["upload"]
    });
  }
}
const createProvider = (config2) => {
  const { providerOptions, actionOptions = {} } = config2;
  const providerName = ___default.default.toLower(config2.provider);
  let provider2;
  let modulePath;
  try {
    modulePath = require.resolve(`@strapi/provider-upload-${providerName}`);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "MODULE_NOT_FOUND") {
      modulePath = providerName;
    } else {
      throw error;
    }
  }
  try {
    provider2 = require(modulePath);
  } catch (err) {
    const newError = new Error(`Could not load upload provider "${providerName}".`);
    if (err instanceof Error) {
      newError.stack = err.stack;
    }
    throw newError;
  }
  const providerInstance = provider2.init(providerOptions);
  if (!providerInstance.delete) {
    throw new Error(`The upload provider "${providerName}" doesn't implement the delete method.`);
  }
  if (!providerInstance.upload && !providerInstance.uploadStream) {
    throw new Error(
      `The upload provider "${providerName}" doesn't implement the uploadStream nor the upload method.`
    );
  }
  if (!providerInstance.uploadStream) {
    process.emitWarning(
      `The upload provider "${providerName}" doesn't implement the uploadStream function. Strapi will fallback on the upload method. Some performance issues may occur.`
    );
  }
  const wrappedProvider = ___default.default.mapValues(providerInstance, (method, methodName) => {
    return async (file2, options = actionOptions[methodName]) => providerInstance[methodName](file2, options);
  });
  return Object.assign(Object.create(baseProvider), wrappedProvider);
};
const baseProvider = {
  extend(obj) {
    Object.assign(this, obj);
  },
  checkFileSize(file2, { sizeLimit }) {
    if (sizeLimit && kbytesToBytes(file2.size) > sizeLimit) {
      throw new PayloadTooLargeError(
        `${file2.originalFilename} exceeds size limit of ${bytesToHumanReadable(sizeLimit)}.`
      );
    }
  },
  getSignedUrl(file2) {
    return file2;
  },
  isPrivate() {
    return false;
  }
};
const getService = (name) => {
  return strapi.plugin("upload").service(name);
};
const ACTIONS = {
  read: "plugin::upload.read",
  readSettings: "plugin::upload.settings.read",
  create: "plugin::upload.assets.create",
  update: "plugin::upload.assets.update",
  download: "plugin::upload.assets.download",
  copyLink: "plugin::upload.assets.copy-link",
  configureView: "plugin::upload.configure-view"
};
const ALLOWED_SORT_STRINGS = [
  "createdAt:DESC",
  "createdAt:ASC",
  "name:ASC",
  "name:DESC",
  "updatedAt:DESC",
  "updatedAt:ASC"
];
const ALLOWED_WEBHOOK_EVENTS = {
  MEDIA_CREATE: "media.create",
  MEDIA_UPDATE: "media.update",
  MEDIA_DELETE: "media.delete"
};
const FOLDER_MODEL_UID = "plugin::upload.folder";
const FILE_MODEL_UID = "plugin::upload.file";
const API_UPLOAD_FOLDER_BASE_NAME = "API Uploads";
async function bootstrap({ strapi: strapi2 }) {
  const defaultConfig = {
    settings: {
      sizeOptimization: true,
      responsiveDimensions: true,
      autoOrientation: false
    },
    view_configuration: {
      pageSize: 10,
      sort: ALLOWED_SORT_STRINGS[0]
    }
  };
  for (const [key, defaultValue] of Object.entries(defaultConfig)) {
    const configurator = strapi2.store({ type: "plugin", name: "upload", key });
    const config2 = await configurator.get({});
    if (config2 && Object.keys(defaultValue).every((key2) => Object.prototype.hasOwnProperty.call(config2, key2))) {
      continue;
    }
    await configurator.set({
      value: Object.assign(defaultValue, config2 || {})
    });
  }
  await registerPermissionActions();
  await registerWebhookEvents();
  await getService("weeklyMetrics").registerCron();
  getService("metrics").sendUploadPluginMetrics();
  getService("extensions").signFileUrlsOnDocumentService();
}
const registerWebhookEvents = async () => Object.entries(ALLOWED_WEBHOOK_EVENTS).forEach(([key, value]) => {
  strapi.get("webhookStore").addAllowedEvent(key, value);
});
const registerPermissionActions = async () => {
  const actions = [
    {
      section: "plugins",
      displayName: "Access the Media Library",
      uid: "read",
      pluginName: "upload"
    },
    {
      section: "plugins",
      displayName: "Create (upload)",
      uid: "assets.create",
      subCategory: "assets",
      pluginName: "upload"
    },
    {
      section: "plugins",
      displayName: "Update (crop, details, replace) + delete",
      uid: "assets.update",
      subCategory: "assets",
      pluginName: "upload"
    },
    {
      section: "plugins",
      displayName: "Download",
      uid: "assets.download",
      subCategory: "assets",
      pluginName: "upload"
    },
    {
      section: "plugins",
      displayName: "Copy link",
      uid: "assets.copy-link",
      subCategory: "assets",
      pluginName: "upload"
    },
    {
      section: "plugins",
      displayName: "Configure view",
      uid: "configure-view",
      pluginName: "upload"
    },
    {
      section: "settings",
      displayName: "Access the Media Library settings page",
      uid: "settings.read",
      category: "media library",
      pluginName: "upload"
    }
  ];
  await strapi.service("admin::permission").actionProvider.registerMany(actions);
};
const file$1 = {
  schema: {
    collectionName: "files",
    info: {
      singularName: "file",
      pluralName: "files",
      displayName: "File",
      description: ""
    },
    options: {},
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
        configurable: false,
        required: true
      },
      alternativeText: {
        type: "string",
        configurable: false
      },
      caption: {
        type: "string",
        configurable: false
      },
      width: {
        type: "integer",
        configurable: false
      },
      height: {
        type: "integer",
        configurable: false
      },
      formats: {
        type: "json",
        configurable: false
      },
      hash: {
        type: "string",
        configurable: false,
        required: true
      },
      ext: {
        type: "string",
        configurable: false
      },
      mime: {
        type: "string",
        configurable: false,
        required: true
      },
      size: {
        type: "decimal",
        configurable: false,
        required: true
      },
      url: {
        type: "string",
        configurable: false,
        required: true
      },
      previewUrl: {
        type: "string",
        configurable: false
      },
      provider: {
        type: "string",
        configurable: false,
        required: true
      },
      provider_metadata: {
        type: "json",
        configurable: false
      },
      related: {
        type: "relation",
        relation: "morphToMany",
        configurable: false
      },
      folder: {
        type: "relation",
        relation: "manyToOne",
        target: FOLDER_MODEL_UID,
        inversedBy: "files",
        private: true
      },
      folderPath: {
        type: "string",
        minLength: 1,
        required: true,
        private: true,
        searchable: false
      }
    },
    // experimental feature:
    indexes: [
      {
        name: "upload_files_folder_path_index",
        columns: ["folder_path"],
        type: null
      },
      {
        name: `upload_files_created_at_index`,
        columns: ["created_at"],
        type: null
      },
      {
        name: `upload_files_updated_at_index`,
        columns: ["updated_at"],
        type: null
      },
      {
        name: `upload_files_name_index`,
        columns: ["name"],
        type: null
      },
      {
        name: `upload_files_size_index`,
        columns: ["size"],
        type: null
      },
      {
        name: `upload_files_ext_index`,
        columns: ["ext"],
        type: null
      }
    ]
  }
};
const folder$1 = {
  schema: {
    collectionName: "upload_folders",
    info: {
      singularName: "folder",
      pluralName: "folders",
      displayName: "Folder"
    },
    options: {},
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
        minLength: 1,
        required: true
      },
      pathId: {
        type: "integer",
        unique: true,
        required: true
      },
      parent: {
        type: "relation",
        relation: "manyToOne",
        target: FOLDER_MODEL_UID,
        inversedBy: "children"
      },
      children: {
        type: "relation",
        relation: "oneToMany",
        target: FOLDER_MODEL_UID,
        mappedBy: "parent"
      },
      files: {
        type: "relation",
        relation: "oneToMany",
        target: FILE_MODEL_UID,
        mappedBy: "folder"
      },
      path: {
        type: "string",
        minLength: 1,
        required: true
      }
    },
    // experimental feature:
    indexes: [
      {
        name: "upload_folders_path_id_index",
        columns: ["path_id"],
        type: "unique"
      },
      {
        name: "upload_folders_path_index",
        columns: ["path"],
        type: "unique"
      }
    ]
  }
};
const contentTypes = {
  file: file$1,
  folder: folder$1
};
const provider = ({ strapi: strapi2 }) => ({
  async checkFileSize(file2) {
    const { sizeLimit } = strapi2.config.get("plugin::upload");
    await strapi2.plugin("upload").provider.checkFileSize(file2, { sizeLimit });
  },
  async upload(file2) {
    if (fp.isFunction(strapi2.plugin("upload").provider.uploadStream)) {
      file2.stream = file2.getStream();
      await strapi2.plugin("upload").provider.uploadStream(file2);
      delete file2.stream;
      if ("filepath" in file2) {
        delete file2.filepath;
      }
    } else {
      file2.buffer = await utils.file.streamToBuffer(file2.getStream());
      await strapi2.plugin("upload").provider.upload(file2);
      delete file2.buffer;
      if ("filepath" in file2) {
        delete file2.filepath;
      }
    }
  }
});
const { UPDATED_BY_ATTRIBUTE, CREATED_BY_ATTRIBUTE } = utils.contentTypes.constants;
const { MEDIA_CREATE, MEDIA_UPDATE, MEDIA_DELETE } = ALLOWED_WEBHOOK_EVENTS;
const { ApplicationError, NotFoundError } = utils.errors;
const { bytesToKbytes: bytesToKbytes$1 } = utils.file;
const upload = ({ strapi: strapi2 }) => {
  const randomSuffix = () => crypto__default.default.randomBytes(5).toString("hex");
  const generateFileName = (name) => {
    const baseName = utils.strings.nameToSlug(name, { separator: "_", lowercase: false });
    return `${baseName}_${randomSuffix()}`;
  };
  const sendMediaMetrics = (data) => {
    if (___default.default.has(data, "caption") && !___default.default.isEmpty(data.caption)) {
      strapi2.telemetry.send("didSaveMediaWithCaption");
    }
    if (___default.default.has(data, "alternativeText") && !___default.default.isEmpty(data.alternativeText)) {
      strapi2.telemetry.send("didSaveMediaWithAlternativeText");
    }
  };
  const createAndAssignTmpWorkingDirectoryToFiles = async (files) => {
    const tmpWorkingDirectory = await fse__default.default.mkdtemp(path__default.default.join(os__default.default.tmpdir(), "strapi-upload-"));
    if (Array.isArray(files)) {
      files.forEach((file2) => {
        file2.tmpWorkingDirectory = tmpWorkingDirectory;
      });
    } else {
      files.tmpWorkingDirectory = tmpWorkingDirectory;
    }
    return tmpWorkingDirectory;
  };
  function filenameReservedRegex() {
    return /[<>:"/\\|?*\u0000-\u001F]/g;
  }
  function windowsReservedNameRegex() {
    return /^(con|prn|aux|nul|com\d|lpt\d)$/i;
  }
  function isValidFilename(string) {
    if (!string || string.length > 255) {
      return false;
    }
    if (filenameReservedRegex().test(string) || windowsReservedNameRegex().test(string)) {
      return false;
    }
    if (string === "." || string === "..") {
      return false;
    }
    return true;
  }
  async function emitEvent(event, data) {
    const modelDef = strapi2.getModel(FILE_MODEL_UID);
    const sanitizedData = await utils.sanitize.sanitizers.defaultSanitizeOutput(
      {
        schema: modelDef,
        getModel(uid) {
          return strapi2.getModel(uid);
        }
      },
      data
    );
    strapi2.eventHub.emit(event, { media: sanitizedData });
  }
  async function formatFileInfo({ filename, type, size }, fileInfo = {}, metas = {}) {
    const fileService = getService("file");
    if (!isValidFilename(filename)) {
      throw new ApplicationError("File name contains invalid characters");
    }
    let ext = path__default.default.extname(filename);
    if (!ext) {
      ext = `.${mimeTypes.extension(type)}`;
    }
    const usedName = (fileInfo.name || filename).normalize();
    const basename = path__default.default.basename(usedName, ext);
    if (!isValidFilename(filename)) {
      throw new ApplicationError("File name contains invalid characters");
    }
    const entity = {
      name: usedName,
      alternativeText: fileInfo.alternativeText,
      caption: fileInfo.caption,
      folder: fileInfo.folder,
      folderPath: await fileService.getFolderPath(fileInfo.folder),
      hash: generateFileName(basename),
      ext,
      mime: type,
      size: bytesToKbytes$1(size),
      sizeInBytes: size
    };
    const { refId, ref, field } = metas;
    if (refId && ref && field) {
      entity.related = [
        {
          id: refId,
          __type: ref,
          __pivot: { field }
        }
      ];
    }
    if (metas.path) {
      entity.path = metas.path;
    }
    if (metas.tmpWorkingDirectory) {
      entity.tmpWorkingDirectory = metas.tmpWorkingDirectory;
    }
    return entity;
  }
  async function enhanceAndValidateFile(file2, fileInfo, metas) {
    const currentFile = await formatFileInfo(
      {
        filename: file2.originalFilename ?? "unamed",
        type: file2.mimetype ?? "application/octet-stream",
        size: file2.size
      },
      fileInfo,
      {
        ...metas,
        tmpWorkingDirectory: file2.tmpWorkingDirectory
      }
    );
    currentFile.filepath = file2.filepath;
    currentFile.getStream = () => fs__default.default.createReadStream(file2.filepath);
    const { optimize: optimize2, isImage: isImage2, isFaultyImage: isFaultyImage2, isOptimizableImage: isOptimizableImage2 } = strapi2.plugin("upload").service("image-manipulation");
    if (await isImage2(currentFile)) {
      if (await isFaultyImage2(currentFile)) {
        throw new ApplicationError("File is not a valid image");
      }
      if (await isOptimizableImage2(currentFile)) {
        return optimize2(currentFile);
      }
    }
    return currentFile;
  }
  async function upload2({
    data,
    files
  }, opts) {
    const { user } = opts ?? {};
    const tmpWorkingDirectory = await createAndAssignTmpWorkingDirectoryToFiles(files);
    let uploadedFiles = [];
    try {
      const { fileInfo, ...metas } = data;
      const fileArray = Array.isArray(files) ? files : [files];
      const fileInfoArray = Array.isArray(fileInfo) ? fileInfo : [fileInfo];
      const doUpload = async (file2, fileInfo2) => {
        const fileData = await enhanceAndValidateFile(file2, fileInfo2, metas);
        return uploadFileAndPersist(fileData, { user });
      };
      uploadedFiles = await Promise.all(
        fileArray.map((file2, idx) => doUpload(file2, fileInfoArray[idx] || {}))
      );
    } finally {
      await fse__default.default.remove(tmpWorkingDirectory);
    }
    return uploadedFiles;
  }
  async function uploadImage(fileData) {
    const { getDimensions: getDimensions2, generateThumbnail: generateThumbnail2, generateResponsiveFormats: generateResponsiveFormats2, isResizableImage: isResizableImage2 } = getService("image-manipulation");
    const { width, height } = await getDimensions2(fileData);
    ___default.default.assign(fileData, {
      width,
      height
    });
    const uploadThumbnail = async (thumbnailFile) => {
      await getService("provider").upload(thumbnailFile);
      ___default.default.set(fileData, "formats.thumbnail", thumbnailFile);
    };
    const uploadResponsiveFormat = async (format) => {
      const { key, file: file2 } = format;
      await getService("provider").upload(file2);
      ___default.default.set(fileData, ["formats", key], file2);
    };
    const uploadPromises = [];
    uploadPromises.push(getService("provider").upload(fileData));
    if (await isResizableImage2(fileData)) {
      const thumbnailFile = await generateThumbnail2(fileData);
      if (thumbnailFile) {
        uploadPromises.push(uploadThumbnail(thumbnailFile));
      }
      const formats = await generateResponsiveFormats2(fileData);
      if (Array.isArray(formats) && formats.length > 0) {
        for (const format of formats) {
          if (!format) continue;
          uploadPromises.push(uploadResponsiveFormat(format));
        }
      }
    }
    await Promise.all(uploadPromises);
  }
  async function uploadFileAndPersist(fileData, opts) {
    const { user } = opts ?? {};
    const config2 = strapi2.config.get("plugin::upload");
    const { isImage: isImage2 } = getService("image-manipulation");
    await getService("provider").checkFileSize(fileData);
    if (await isImage2(fileData)) {
      await uploadImage(fileData);
    } else {
      await getService("provider").upload(fileData);
    }
    ___default.default.set(fileData, "provider", config2.provider);
    return add(fileData, { user });
  }
  async function updateFileInfo(id, { name, alternativeText, caption, folder: folder2 }, opts) {
    const { user } = opts ?? {};
    const dbFile = await findOne(id);
    if (!dbFile) {
      throw new NotFoundError();
    }
    const fileService = getService("file");
    const newName = ___default.default.isNil(name) ? dbFile.name : name;
    const newInfos = {
      name: newName,
      alternativeText: ___default.default.isNil(alternativeText) ? dbFile.alternativeText : alternativeText,
      caption: ___default.default.isNil(caption) ? dbFile.caption : caption,
      folder: ___default.default.isUndefined(folder2) ? dbFile.folder : folder2,
      folderPath: ___default.default.isUndefined(folder2) ? dbFile.path : await fileService.getFolderPath(folder2)
    };
    return update2(id, newInfos, { user });
  }
  async function replace(id, { data, file: file2 }, opts) {
    const { user } = opts ?? {};
    const config2 = strapi2.config.get("plugin::upload");
    const { isImage: isImage2 } = getService("image-manipulation");
    const dbFile = await findOne(id);
    if (!dbFile) {
      throw new NotFoundError();
    }
    const tmpWorkingDirectory = await createAndAssignTmpWorkingDirectoryToFiles(file2);
    let fileData;
    try {
      const { fileInfo } = data;
      fileData = await enhanceAndValidateFile(file2, fileInfo);
      ___default.default.assign(fileData, {
        hash: dbFile.hash,
        ext: dbFile.ext
      });
      if (dbFile.provider === config2.provider) {
        await strapi2.plugin("upload").provider.delete(dbFile);
        if (dbFile.formats) {
          await Promise.all(
            Object.keys(dbFile.formats).map((key) => {
              return strapi2.plugin("upload").provider.delete(dbFile.formats[key]);
            })
          );
        }
      }
      ___default.default.set(fileData, "formats", {});
      if (await isImage2(fileData)) {
        await uploadImage(fileData);
      } else {
        await getService("provider").upload(fileData);
      }
      ___default.default.set(fileData, "provider", config2.provider);
    } finally {
      await fse__default.default.remove(tmpWorkingDirectory);
    }
    return update2(id, fileData, { user });
  }
  async function update2(id, values, opts) {
    const { user } = opts ?? {};
    const fileValues = { ...values };
    if (user) {
      Object.assign(fileValues, {
        [UPDATED_BY_ATTRIBUTE]: user.id
      });
    }
    sendMediaMetrics(fileValues);
    const res = await strapi2.db.query(FILE_MODEL_UID).update({ where: { id }, data: fileValues });
    await emitEvent(MEDIA_UPDATE, res);
    return res;
  }
  async function add(values, opts) {
    const { user } = opts ?? {};
    const fileValues = { ...values };
    if (user) {
      Object.assign(fileValues, {
        [UPDATED_BY_ATTRIBUTE]: user.id,
        [CREATED_BY_ATTRIBUTE]: user.id
      });
    }
    sendMediaMetrics(fileValues);
    const res = await strapi2.db.query(FILE_MODEL_UID).create({ data: fileValues });
    await emitEvent(MEDIA_CREATE, res);
    return res;
  }
  function findOne(id, populate = {}) {
    const query = strapi2.get("query-params").transform(FILE_MODEL_UID, {
      populate
    });
    return strapi2.db.query(FILE_MODEL_UID).findOne({
      where: { id },
      ...query
    });
  }
  function findMany(query = {}) {
    return strapi2.db.query(FILE_MODEL_UID).findMany(strapi2.get("query-params").transform(FILE_MODEL_UID, query));
  }
  function findPage(query = {}) {
    return strapi2.db.query(FILE_MODEL_UID).findPage(strapi2.get("query-params").transform(FILE_MODEL_UID, query));
  }
  async function remove(file2) {
    const config2 = strapi2.config.get("plugin::upload");
    if (file2.provider === config2.provider) {
      await strapi2.plugin("upload").provider.delete(file2);
      if (file2.formats) {
        const keys = Object.keys(file2.formats);
        await Promise.all(
          keys.map((key) => {
            return strapi2.plugin("upload").provider.delete(file2.formats[key]);
          })
        );
      }
    }
    const media = await strapi2.db.query(FILE_MODEL_UID).findOne({
      where: { id: file2.id }
    });
    await emitEvent(MEDIA_DELETE, media);
    return strapi2.db.query(FILE_MODEL_UID).delete({ where: { id: file2.id } });
  }
  async function getSettings() {
    const res = await strapi2.store({ type: "plugin", name: "upload", key: "settings" }).get({});
    return res;
  }
  function setSettings(value) {
    if (value.responsiveDimensions === true) {
      strapi2.telemetry.send("didEnableResponsiveDimensions");
    } else {
      strapi2.telemetry.send("didDisableResponsiveDimensions");
    }
    return strapi2.store({ type: "plugin", name: "upload", key: "settings" }).set({ value });
  }
  async function getConfiguration() {
    const res = await strapi2.store({
      type: "plugin",
      name: "upload",
      key: "view_configuration"
    }).get({});
    return res;
  }
  function setConfiguration(value) {
    return strapi2.store({ type: "plugin", name: "upload", key: "view_configuration" }).set({
      value
    });
  }
  return {
    formatFileInfo,
    upload: upload2,
    updateFileInfo,
    replace,
    findOne,
    findMany,
    findPage,
    remove,
    getSettings,
    setSettings,
    getConfiguration,
    setConfiguration,
    /**
     * exposed for testing only
     * @internal
     */
    _uploadImage: uploadImage
  };
};
const { bytesToKbytes } = utils.file;
const FORMATS_TO_RESIZE = ["jpeg", "png", "webp", "tiff", "gif"];
const FORMATS_TO_PROCESS = ["jpeg", "png", "webp", "tiff", "svg", "gif", "avif"];
const FORMATS_TO_OPTIMIZE = ["jpeg", "png", "webp", "tiff", "avif"];
const isOptimizableFormat = (format) => format !== void 0 && FORMATS_TO_OPTIMIZE.includes(format);
const writeStreamToFile = (stream, path2) => new Promise((resolve, reject) => {
  const writeStream = fs__default.default.createWriteStream(path2);
  stream.on("error", reject);
  stream.pipe(writeStream);
  writeStream.on("close", resolve);
  writeStream.on("error", reject);
});
const getMetadata = (file2) => {
  if (!file2.filepath) {
    return new Promise((resolve, reject) => {
      const pipeline = sharp__default.default();
      pipeline.metadata().then(resolve).catch(reject);
      file2.getStream().pipe(pipeline);
    });
  }
  return sharp__default.default(file2.filepath).metadata();
};
const getDimensions = async (file2) => {
  const { width = null, height = null } = await getMetadata(file2);
  return { width, height };
};
const THUMBNAIL_RESIZE_OPTIONS = {
  width: 245,
  height: 156,
  fit: "inside"
};
const resizeFileTo = async (file2, options, {
  name,
  hash
}) => {
  const filePath = file2.tmpWorkingDirectory ? path.join(file2.tmpWorkingDirectory, hash) : hash;
  let newInfo;
  if (!file2.filepath) {
    const transform = sharp__default.default().resize(options).on("info", (info) => {
      newInfo = info;
    });
    await writeStreamToFile(file2.getStream().pipe(transform), filePath);
  } else {
    newInfo = await sharp__default.default(file2.filepath).resize(options).toFile(filePath);
  }
  const { width, height, size } = newInfo ?? {};
  const newFile = {
    name,
    hash,
    ext: file2.ext,
    mime: file2.mime,
    filepath: filePath,
    path: file2.path || null,
    getStream: () => fs__default.default.createReadStream(filePath)
  };
  Object.assign(newFile, {
    width,
    height,
    size: size ? bytesToKbytes(size) : 0,
    sizeInBytes: size
  });
  return newFile;
};
const generateThumbnail = async (file2) => {
  if (file2.width && file2.height && (file2.width > THUMBNAIL_RESIZE_OPTIONS.width || file2.height > THUMBNAIL_RESIZE_OPTIONS.height)) {
    return resizeFileTo(file2, THUMBNAIL_RESIZE_OPTIONS, {
      name: `thumbnail_${file2.name}`,
      hash: `thumbnail_${file2.hash}`
    });
  }
  return null;
};
const optimize = async (file2) => {
  const { sizeOptimization = false, autoOrientation = false } = await getService("upload").getSettings() ?? {};
  const { format, size } = await getMetadata(file2);
  if ((sizeOptimization || autoOrientation) && isOptimizableFormat(format)) {
    let transformer;
    if (!file2.filepath) {
      transformer = sharp__default.default();
    } else {
      transformer = sharp__default.default(file2.filepath);
    }
    transformer[format]({ quality: sizeOptimization ? 80 : 100 });
    if (autoOrientation) {
      transformer.rotate();
    }
    const filePath = file2.tmpWorkingDirectory ? path.join(file2.tmpWorkingDirectory, `optimized-${file2.hash}`) : `optimized-${file2.hash}`;
    let newInfo;
    if (!file2.filepath) {
      transformer.on("info", (info) => {
        newInfo = info;
      });
      await writeStreamToFile(file2.getStream().pipe(transformer), filePath);
    } else {
      newInfo = await transformer.toFile(filePath);
    }
    const { width: newWidth, height: newHeight, size: newSize } = newInfo ?? {};
    const newFile = { ...file2 };
    newFile.getStream = () => fs__default.default.createReadStream(filePath);
    newFile.filepath = filePath;
    if (newSize && size && newSize > size) {
      return file2;
    }
    return Object.assign(newFile, {
      width: newWidth,
      height: newHeight,
      size: newSize ? bytesToKbytes(newSize) : 0,
      sizeInBytes: newSize
    });
  }
  return file2;
};
const DEFAULT_BREAKPOINTS = {
  large: 1e3,
  medium: 750,
  small: 500
};
const getBreakpoints = () => strapi.config.get("plugin::upload.breakpoints", DEFAULT_BREAKPOINTS);
const generateResponsiveFormats = async (file2) => {
  const { responsiveDimensions = false } = await getService("upload").getSettings() ?? {};
  if (!responsiveDimensions) return [];
  const originalDimensions = await getDimensions(file2);
  const breakpoints = getBreakpoints();
  return Promise.all(
    Object.keys(breakpoints).map((key) => {
      const breakpoint = breakpoints[key];
      if (breakpointSmallerThan(breakpoint, originalDimensions)) {
        return generateBreakpoint(key, { file: file2, breakpoint });
      }
      return void 0;
    })
  );
};
const generateBreakpoint = async (key, { file: file2, breakpoint }) => {
  const newFile = await resizeFileTo(
    file2,
    {
      width: breakpoint,
      height: breakpoint,
      fit: "inside"
    },
    {
      name: `${key}_${file2.name}`,
      hash: `${key}_${file2.hash}`
    }
  );
  return {
    key,
    file: newFile
  };
};
const breakpointSmallerThan = (breakpoint, { width, height }) => {
  return breakpoint < (width ?? 0) || breakpoint < (height ?? 0);
};
const isFaultyImage = async (file2) => {
  if (!file2.filepath) {
    return new Promise((resolve, reject) => {
      const pipeline = sharp__default.default();
      pipeline.stats().then(resolve).catch(reject);
      file2.getStream().pipe(pipeline);
    });
  }
  try {
    await sharp__default.default(file2.filepath).stats();
    return false;
  } catch (e) {
    return true;
  }
};
const isOptimizableImage = async (file2) => {
  let format;
  try {
    const metadata = await getMetadata(file2);
    format = metadata.format;
  } catch (e) {
    return false;
  }
  return format && FORMATS_TO_OPTIMIZE.includes(format);
};
const isResizableImage = async (file2) => {
  let format;
  try {
    const metadata = await getMetadata(file2);
    format = metadata.format;
  } catch (e) {
    return false;
  }
  return format && FORMATS_TO_RESIZE.includes(format);
};
const isImage = async (file2) => {
  let format;
  try {
    const metadata = await getMetadata(file2);
    format = metadata.format;
  } catch (e) {
    return false;
  }
  return format && FORMATS_TO_PROCESS.includes(format);
};
const imageManipulation = {
  isFaultyImage,
  isOptimizableImage,
  isResizableImage,
  isImage,
  getDimensions,
  generateResponsiveFormats,
  generateThumbnail,
  optimize
};
const setPathIdAndPath = async (folder2) => {
  const { max } = await strapi.db.queryBuilder(FOLDER_MODEL_UID).max("pathId").first().execute();
  const pathId = max + 1;
  let parentPath = "/";
  if (folder2.parent) {
    const parentFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({ where: { id: folder2.parent } });
    parentPath = parentFolder.path;
  }
  return Object.assign(folder2, {
    pathId,
    path: utils.strings.joinBy("/", parentPath, `${pathId}`)
  });
};
const create = async (folderData, opts) => {
  const folderService = getService("folder");
  const { user } = opts || {};
  let enrichedFolder = await folderService.setPathIdAndPath(folderData);
  if (user) {
    enrichedFolder = await utils.setCreatorFields({ user })(enrichedFolder);
  }
  const folder2 = await strapi.db.query(FOLDER_MODEL_UID).create({ data: enrichedFolder });
  strapi.eventHub.emit("media-folder.create", { folder: folder2 });
  return folder2;
};
const deleteByIds$1 = async (ids = []) => {
  const folders = await strapi.db.query(FOLDER_MODEL_UID).findMany({ where: { id: { $in: ids } } });
  if (folders.length === 0) {
    return {
      folders: [],
      totalFolderNumber: 0,
      totalFileNumber: 0
    };
  }
  const pathsToDelete = fp.map("path", folders);
  const filesToDelete = await strapi.db.query(FILE_MODEL_UID).findMany({
    where: {
      $or: pathsToDelete.flatMap((path2) => [
        { folderPath: { $eq: path2 } },
        { folderPath: { $startsWith: `${path2}/` } }
      ])
    }
  });
  await Promise.all(filesToDelete.map((file2) => getService("upload").remove(file2)));
  const { count: totalFolderNumber } = await strapi.db.query(FOLDER_MODEL_UID).deleteMany({
    where: {
      $or: pathsToDelete.flatMap((path2) => [
        { path: { $eq: path2 } },
        { path: { $startsWith: `${path2}/` } }
      ])
    }
  });
  strapi.eventHub.emit("media-folder.delete", { folders });
  return {
    folders,
    totalFolderNumber,
    totalFileNumber: filesToDelete.length
  };
};
const update = async (id, {
  name,
  parent
}, { user }) => {
  if (fp.isUndefined(parent)) {
    const existingFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({ where: { id } });
    if (!existingFolder) {
      return void 0;
    }
    const newFolder = utils.setCreatorFields({ user, isEdition: true })({ name, parent });
    if (fp.isUndefined(parent)) {
      const folder2 = await strapi.db.query(FOLDER_MODEL_UID).update({ where: { id }, data: newFolder });
      return folder2;
    }
  } else {
    const trx = await strapi.db.transaction();
    try {
      const existingFolder = await strapi.db.queryBuilder(FOLDER_MODEL_UID).select(["pathId", "path"]).where({ id }).transacting(trx.get()).forUpdate().first().execute();
      const { joinTable } = strapi.db.metadata.get(FOLDER_MODEL_UID).attributes.parent;
      await strapi.db.queryBuilder(joinTable.name).transacting(trx.get()).delete().where({ [joinTable.joinColumn.name]: id }).execute();
      if (parent !== null) {
        await strapi.db.queryBuilder(joinTable.name).transacting(trx.get()).insert({ [joinTable.inverseJoinColumn.name]: parent, [joinTable.joinColumn.name]: id }).where({ [joinTable.joinColumn.name]: id }).execute();
      }
      let destinationFolderPath = "/";
      if (parent !== null) {
        const destinationFolder = await strapi.db.queryBuilder(FOLDER_MODEL_UID).select("path").where({ id: parent }).transacting(trx.get()).first().execute();
        destinationFolderPath = destinationFolder.path;
      }
      const folderTable = strapi.getModel(FOLDER_MODEL_UID).collectionName;
      const fileTable = strapi.getModel(FILE_MODEL_UID).collectionName;
      const folderPathColumnName = (
        // @ts-expect-error - no dynamic types
        strapi.db.metadata.get(FILE_MODEL_UID).attributes.folderPath.columnName
      );
      const pathColumnName = strapi.db.metadata.get(FOLDER_MODEL_UID).attributes.path.columnName;
      await strapi.db.getConnection(folderTable).transacting(trx.get()).where(pathColumnName, existingFolder.path).orWhere(pathColumnName, "like", `${existingFolder.path}/%`).update(
        pathColumnName,
        strapi.db.connection.raw("REPLACE(??, ?, ?)", [
          pathColumnName,
          existingFolder.path,
          utils.strings.joinBy("/", destinationFolderPath, `${existingFolder.pathId}`)
        ])
      );
      await strapi.db.getConnection(fileTable).transacting(trx.get()).where(folderPathColumnName, existingFolder.path).orWhere(folderPathColumnName, "like", `${existingFolder.path}/%`).update(
        folderPathColumnName,
        strapi.db.connection.raw("REPLACE(??, ?, ?)", [
          folderPathColumnName,
          existingFolder.path,
          utils.strings.joinBy("/", destinationFolderPath, `${existingFolder.pathId}`)
        ])
      );
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      throw e;
    }
    const newFolder = utils.setCreatorFields({ user, isEdition: true })({ name });
    const folder2 = await strapi.db.query(FOLDER_MODEL_UID).update({ where: { id }, data: newFolder });
    strapi.eventHub.emit("media-folder.update", { folder: folder2 });
    return folder2;
  }
};
const exists = async (params = {}) => {
  const count = await strapi.db.query(FOLDER_MODEL_UID).count({ where: params });
  return count > 0;
};
const getStructure = async () => {
  const { joinTable } = strapi.db.metadata.get(FOLDER_MODEL_UID).attributes.parent;
  const qb = strapi.db.queryBuilder(FOLDER_MODEL_UID);
  const alias = qb.getAlias();
  const folders = await qb.select(["id", "name", `${alias}.${joinTable.inverseJoinColumn.name} as parent`]).join({
    alias,
    referencedTable: joinTable.name,
    referencedColumn: joinTable.joinColumn.name,
    rootColumn: joinTable.joinColumn.referencedColumn,
    rootTable: qb.alias
  }).execute({ mapResults: false });
  const folderMap = {
    null: { children: [] }
  };
  folders.forEach((f) => {
    folderMap[f.id] = { ...f, children: [] };
  });
  folders.forEach((f) => {
    const parentId = f.parent || "null";
    if (!folderMap[parentId]) {
      folderMap[parentId] = { children: [] };
    }
    folderMap[parentId].children.push(folderMap[f.id]);
    folderMap[parentId].children = fp.sortBy("name", folderMap[parentId].children);
    delete folderMap[f.id].parent;
  });
  return folderMap.null.children;
};
const folder = {
  create,
  exists,
  deleteByIds: deleteByIds$1,
  update,
  setPathIdAndPath,
  getStructure
};
const getFolderPath = async (folderId) => {
  if (!folderId) return "/";
  const parentFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({ where: { id: folderId } });
  return parentFolder.path;
};
const deleteByIds = async (ids = []) => {
  const filesToDelete = await strapi.db.query(FILE_MODEL_UID).findMany({ where: { id: { $in: ids } } });
  await Promise.all(filesToDelete.map((file2) => getService("upload").remove(file2)));
  return filesToDelete;
};
const signFileUrls = async (file2) => {
  const { provider: provider2 } = strapi.plugins.upload;
  const { provider: providerConfig } = strapi.config.get("plugin::upload");
  const isPrivate = await provider2.isPrivate();
  file2.isUrlSigned = false;
  if (file2.provider !== providerConfig || !isPrivate) {
    return file2;
  }
  const signUrl = async (file22) => {
    const signedUrl = await provider2.getSignedUrl(file22);
    file22.url = signedUrl.url;
    file22.isUrlSigned = true;
  };
  const signedFile = fp.cloneDeep(file2);
  await signUrl(signedFile);
  if (file2.formats) {
    await utils.async.map(Object.values(signedFile.formats ?? {}), signUrl);
  }
  return signedFile;
};
const file = { getFolderPath, deleteByIds, signFileUrls };
const getWeeklyCronScheduleAt = (date) => `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} * * ${date.getDay()}`;
const ONE_WEEK = 7 * 24 * 60 * 60 * 1e3;
const getMetricsStoreValue = async () => {
  const value = await strapi.store.get({ type: "plugin", name: "upload", key: "metrics" });
  return fp.defaultTo({}, value);
};
const setMetricsStoreValue = (value) => strapi.store.set({ type: "plugin", name: "upload", key: "metrics", value });
const weeklyMetrics = ({ strapi: strapi2 }) => ({
  async computeMetrics() {
    const pathColName = strapi2.db.metadata.get(FOLDER_MODEL_UID).attributes.path.columnName;
    const folderTable = strapi2.getModel(FOLDER_MODEL_UID).collectionName;
    let keepOnlySlashesSQLString = "??";
    const queryParams = [pathColName];
    for (let i = 0; i < 10; i += 1) {
      keepOnlySlashesSQLString = `REPLACE(${keepOnlySlashesSQLString}, ?, ?)`;
      queryParams.push(String(i), "");
    }
    const res = await strapi2.db.getConnection(folderTable).select(
      strapi2.db.connection.raw(
        `LENGTH(${keepOnlySlashesSQLString}) AS depth, COUNT(*) AS occurence`,
        queryParams
      )
    ).groupBy("depth");
    const folderLevelsArray = res.map((map) => ({
      depth: Number(map.depth),
      occurence: Number(map.occurence)
    }));
    let product = 0;
    let folderNumber = 0;
    let maxDepth = 0;
    for (const folderLevel of folderLevelsArray) {
      product += folderLevel.depth * folderLevel.occurence;
      folderNumber += folderLevel.occurence;
      if (folderLevel.depth > maxDepth) {
        maxDepth = folderLevel.depth;
      }
    }
    const averageDepth = folderNumber !== 0 ? product / folderNumber : 0;
    let sumOfDeviation = 0;
    for (const folderLevel of folderLevelsArray) {
      sumOfDeviation += Math.abs(folderLevel.depth - averageDepth) * folderLevel.occurence;
    }
    const averageDeviationDepth = folderNumber !== 0 ? sumOfDeviation / folderNumber : 0;
    const assetNumber = await strapi2.db.query(FILE_MODEL_UID).count();
    return {
      assetNumber,
      folderNumber,
      averageDepth,
      maxDepth,
      averageDeviationDepth
    };
  },
  async sendMetrics() {
    const metrics2 = await this.computeMetrics();
    strapi2.telemetry.send("didSendUploadPropertiesOnceAWeek", {
      groupProperties: { metrics: metrics2 }
    });
    const metricsInfoStored = await getMetricsStoreValue();
    await setMetricsStoreValue({ ...metricsInfoStored, lastWeeklyUpdate: (/* @__PURE__ */ new Date()).getTime() });
  },
  async ensureWeeklyStoredCronSchedule() {
    const metricsInfoStored = await getMetricsStoreValue();
    const { weeklySchedule: currentSchedule, lastWeeklyUpdate } = metricsInfoStored;
    const now = /* @__PURE__ */ new Date();
    let weeklySchedule = currentSchedule;
    if (!weeklySchedule || !lastWeeklyUpdate || lastWeeklyUpdate + ONE_WEEK < now.getTime()) {
      weeklySchedule = getWeeklyCronScheduleAt(dateFns.add(now, { minutes: 5 }));
      await setMetricsStoreValue({ ...metricsInfoStored, weeklySchedule });
      return weeklySchedule;
    }
    return weeklySchedule;
  },
  async registerCron() {
    const weeklySchedule = await this.ensureWeeklyStoredCronSchedule();
    strapi2.cron.add({
      uploadWeekly: {
        task: this.sendMetrics.bind(this),
        options: weeklySchedule
      }
    });
  }
});
const getProviderName = () => strapi.config.get("plugin::upload.provider", "local");
const isProviderPrivate = async () => strapi.plugin("upload").provider.isPrivate();
const metrics = ({ strapi: strapi2 }) => ({
  async sendUploadPluginMetrics() {
    const uploadProvider = getProviderName();
    const privateProvider = await isProviderPrivate();
    strapi2.telemetry.send("didInitializePluginUpload", {
      groupProperties: {
        uploadProvider,
        privateProvider
      }
    });
  }
});
const getStore = () => strapi.store({ type: "plugin", name: "upload", key: "api-folder" });
const createApiUploadFolder = async () => {
  let name = API_UPLOAD_FOLDER_BASE_NAME;
  const folderService = getService("folder");
  let exists2 = true;
  let index2 = 1;
  while (exists2) {
    exists2 = await folderService.exists({ name, parent: null });
    if (exists2) {
      name = `${API_UPLOAD_FOLDER_BASE_NAME} (${index2})`;
      index2 += 1;
    }
  }
  const folder2 = await folderService.create({ name });
  await getStore().set({ value: { id: folder2.id } });
  return folder2;
};
const getAPIUploadFolder = async () => {
  const storeValue = await getStore().get({});
  const folderId = fp.get("id", storeValue);
  const folder2 = folderId ? await strapi.db.query(FOLDER_MODEL_UID).findOne({ where: { id: folderId } }) : null;
  return fp.isNil(folder2) ? createApiUploadFolder() : folder2;
};
const apiUploadFolder = {
  getAPIUploadFolder
};
function isFile(value, attribute) {
  if (!value || attribute.type !== "media") {
    return false;
  }
  return true;
}
const signEntityMediaVisitor = async ({ key, value, attribute }, { set }) => {
  const { signFileUrls: signFileUrls2 } = getService("file");
  if (!attribute) {
    return;
  }
  if (attribute.type !== "media") {
    return;
  }
  if (isFile(value, attribute)) {
    if (attribute.multiple) {
      const signedFiles = await utils.async.map(value, signFileUrls2);
      set(key, signedFiles);
      return;
    }
    const signedFile = await signFileUrls2(value);
    set(key, signedFile);
  }
};
const signEntityMedia = async (entity, uid) => {
  const model = strapi.getModel(uid);
  return utils.traverseEntity(
    // @ts-expect-error - FIXME: fix traverseEntity using wrong types
    signEntityMediaVisitor,
    { schema: model, getModel: strapi.getModel.bind(strapi) },
    entity
  );
};
const signFileUrlsOnDocumentService = async () => {
  const { provider: provider2 } = strapi.plugins.upload;
  const isPrivate = await provider2.isPrivate();
  if (!isPrivate) {
    return;
  }
  strapi.documents.use(async (ctx, next) => {
    const uid = ctx.uid;
    const result = await next();
    if (ctx.action === "findMany") {
      return utils.async.map(result, (entry) => signEntityMedia(entry, uid));
    }
    if (ctx.action === "findFirst" || ctx.action === "findOne" || ctx.action === "create" || ctx.action === "update") {
      return signEntityMedia(result, uid);
    }
    if (ctx.action === "delete" || ctx.action === "clone" || ctx.action === "publish" || ctx.action === "unpublish" || ctx.action === "discardDraft") {
      return {
        ...result,
        entries: await utils.async.map(result.entries, (entry) => signEntityMedia(entry, uid))
      };
    }
    return result;
  });
};
const extensions = {
  signFileUrlsOnDocumentService
};
const services = {
  provider,
  upload,
  folder,
  file,
  weeklyMetrics,
  metrics,
  "image-manipulation": imageManipulation,
  "api-upload-folder": apiUploadFolder,
  extensions
};
const routes$3 = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/settings",
      handler: "admin-settings.getSettings",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.settings.read"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/settings",
      handler: "admin-settings.updateSettings",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.settings.read"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/",
      handler: "admin-upload.upload",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/files",
      handler: "admin-file.find",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.read"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/files/:id",
      handler: "admin-file.findOne",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.read"]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/files/:id",
      handler: "admin-file.destroy",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.assets.update"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/folders/:id",
      handler: "admin-folder.findOne",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.read"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/folders",
      handler: "admin-folder.find",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.read"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/folders",
      handler: "admin-folder.create",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.assets.create"]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/folders/:id",
      handler: "admin-folder.update",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.assets.update"]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/folder-structure",
      handler: "admin-folder.getStructure",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.read"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/actions/bulk-delete",
      handler: "admin-folder-file.deleteMany",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.assets.update"]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/actions/bulk-move",
      handler: "admin-folder-file.moveMany",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::upload.assets.update"]
            }
          }
        ]
      }
    }
  ]
};
const routes$2 = {
  type: "content-api",
  routes: [
    {
      method: "POST",
      path: "/",
      handler: "content-api.upload"
    },
    {
      method: "GET",
      path: "/files",
      handler: "content-api.find"
    },
    {
      method: "GET",
      path: "/files/:id",
      handler: "content-api.findOne"
    },
    {
      method: "DELETE",
      path: "/files/:id",
      handler: "content-api.destroy"
    }
  ]
};
const routes$1 = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/configuration",
      handler: "view-configuration.findViewConfiguration",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "PUT",
      path: "/configuration",
      handler: "view-configuration.updateViewConfiguration",
      config: {
        policies: [
          "admin::isAuthenticatedAdmin",
          {
            name: "admin::hasPermissions",
            config: {
              actions: [ACTIONS.configureView]
            }
          }
        ]
      }
    }
  ]
};
const routes = {
  admin: routes$3,
  "content-api": routes$2,
  viewConfiguration: routes$1
};
const config = {
  default: {
    enabled: true,
    provider: "local",
    sizeLimit: 1e9,
    // 1GB
    actionOptions: {}
  },
  validator() {
  }
};
const findEntityAndCheckPermissions = async (ability, action, model, id) => {
  const file2 = await getService("upload").findOne(id, [
    utils.contentTypes.constants.CREATED_BY_ATTRIBUTE,
    "folder"
  ]);
  if (___default.default.isNil(file2)) {
    throw new utils.errors.NotFoundError();
  }
  const pm = strapi.service("admin::permission").createPermissionsManager({ ability, action, model });
  const creatorId = ___default.default.get(file2, [utils.contentTypes.constants.CREATED_BY_ATTRIBUTE, "id"]);
  const author = creatorId ? await strapi.service("admin::user").findOne(creatorId, ["roles"]) : null;
  const fileWithRoles = ___default.default.set(___default.default.cloneDeep(file2), "createdBy", author);
  if (pm.ability.cannot(pm.action, pm.toSubject(fileWithRoles))) {
    throw new utils.errors.ForbiddenError();
  }
  return { pm, file: file2 };
};
const adminFile = {
  async find(ctx) {
    const {
      state: { userAbility }
    } = ctx;
    const defaultQuery = { populate: { folder: true } };
    const pm = strapi.service("admin::permission").createPermissionsManager({
      ability: userAbility,
      action: ACTIONS.read,
      model: FILE_MODEL_UID
    });
    if (!pm.isAllowed) {
      return ctx.forbidden();
    }
    await pm.validateQuery(ctx.query);
    const query = await utils.async.pipe(
      // Start by sanitizing the incoming query
      (q) => pm.sanitizeQuery(q),
      // Add the default query which should not be validated or sanitized
      (q) => fp.merge(defaultQuery, q),
      // Add the dynamic filters based on permissions' conditions
      (q) => pm.addPermissionsQueryTo(q)
    )(ctx.query);
    const { results: files, pagination } = await getService("upload").findPage(query);
    const signedFiles = await utils.async.map(files, getService("file").signFileUrls);
    const sanitizedFiles = await pm.sanitizeOutput(signedFiles);
    return { results: sanitizedFiles, pagination };
  },
  async findOne(ctx) {
    const {
      state: { userAbility },
      params: { id }
    } = ctx;
    const { pm, file: file2 } = await findEntityAndCheckPermissions(
      userAbility,
      ACTIONS.read,
      FILE_MODEL_UID,
      id
    );
    const signedFile = await getService("file").signFileUrls(file2);
    ctx.body = await pm.sanitizeOutput(signedFile);
  },
  async destroy(ctx) {
    const { id } = ctx.params;
    const { userAbility } = ctx.state;
    const { pm, file: file2 } = await findEntityAndCheckPermissions(
      userAbility,
      ACTIONS.update,
      FILE_MODEL_UID,
      id
    );
    const [body] = await Promise.all([
      pm.sanitizeOutput(file2, { action: ACTIONS.read }),
      getService("upload").remove(file2)
    ]);
    ctx.body = body;
  }
};
const folderExists = async (folderId) => {
  if (fp.isNil(folderId)) {
    return true;
  }
  const exists2 = await getService("folder").exists({ id: folderId });
  return exists2;
};
const isFolderOrChild = (folderOrChild, folder2) => folderOrChild.path === folder2.path || folderOrChild.path.startsWith(`${folder2.path}/`);
const NO_SLASH_REGEX = /^[^/]+$/;
const NO_SPACES_AROUND = /^(?! ).+(?<! )$/;
const isNameUniqueInFolder = (id) => {
  return async function test(name) {
    const { exists: exists2 } = getService("folder");
    const filters = { name, parent: this.parent.parent || null };
    if (id) {
      filters.id = { $ne: id };
      if (fp.isUndefined(name)) {
        const existingFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({ where: { id } });
        filters.name = fp.get("name", existingFolder);
      }
    }
    const doesExist = await exists2(filters);
    return !doesExist;
  };
};
const validateCreateFolderSchema = utils.yup.object().shape({
  name: utils.yup.string().min(1).matches(NO_SLASH_REGEX, "name cannot contain slashes").matches(NO_SPACES_AROUND, "name cannot start or end with a whitespace").required().test("is-folder-unique", "A folder with this name already exists", isNameUniqueInFolder()),
  parent: utils.yup.strapiID().nullable().test("folder-exists", "parent folder does not exist", folderExists)
}).noUnknown().required();
const validateUpdateFolderSchema = (id) => utils.yup.object().shape({
  name: utils.yup.string().min(1).matches(NO_SLASH_REGEX, "name cannot contain slashes").matches(NO_SPACES_AROUND, "name cannot start or end with a whitespace").test(
    "is-folder-unique",
    "A folder with this name already exists",
    isNameUniqueInFolder(id)
  ),
  parent: utils.yup.strapiID().nullable().test("folder-exists", "parent folder does not exist", folderExists).test(
    "dont-move-inside-self",
    "folder cannot be moved inside itself",
    async function test(parent) {
      if (fp.isNil(parent)) return true;
      const destinationFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({
        select: ["path"],
        where: { id: parent }
      });
      const currentFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({
        select: ["path"],
        where: { id }
      });
      if (!destinationFolder || !currentFolder) return true;
      return !isFolderOrChild(destinationFolder, currentFolder);
    }
  )
}).noUnknown().required();
const validateCreateFolder = utils.validateYupSchema(validateCreateFolderSchema);
const validateUpdateFolder = (id) => utils.validateYupSchema(validateUpdateFolderSchema(id));
const adminFolder = {
  async findOne(ctx) {
    const { id } = ctx.params;
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: FOLDER_MODEL_UID
    });
    await permissionsManager.validateQuery(ctx.query);
    const query = await permissionsManager.sanitizeQuery(ctx.query);
    const { results } = await strapi.db.query(FOLDER_MODEL_UID).findPage(
      strapi.get("query-params").transform(
        FOLDER_MODEL_UID,
        fp.defaultsDeep(
          {
            filters: { id },
            populate: {
              children: {
                count: true
              },
              files: {
                count: true
              }
            }
          },
          query
        )
      )
    );
    if (results.length === 0) {
      return ctx.notFound("folder not found");
    }
    ctx.body = {
      data: await permissionsManager.sanitizeOutput(results[0])
    };
  },
  async find(ctx) {
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: FOLDER_MODEL_UID
    });
    await permissionsManager.validateQuery(ctx.query);
    const query = await permissionsManager.sanitizeQuery(ctx.query);
    const results = await strapi.db.query(FOLDER_MODEL_UID).findMany(
      strapi.get("query-params").transform(
        FOLDER_MODEL_UID,
        fp.defaultsDeep(
          {
            populate: {
              children: {
                count: true
              },
              files: {
                count: true
              }
            }
          },
          query
        )
      )
    );
    ctx.body = {
      data: await permissionsManager.sanitizeOutput(results)
    };
  },
  async create(ctx) {
    const { user } = ctx.state;
    const { body } = ctx.request;
    await validateCreateFolder(body);
    const folderService = getService("folder");
    const folder2 = await folderService.create(body, { user });
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: FOLDER_MODEL_UID
    });
    ctx.created({
      data: await permissionsManager.sanitizeOutput(folder2)
    });
  },
  async update(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    const { body } = ctx.request;
    const permissionsManager = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: FOLDER_MODEL_UID
    });
    await validateUpdateFolder(id)(body);
    const folderService = getService("folder");
    const updatedFolder = await folderService.update(id, body, { user });
    if (!updatedFolder) {
      return ctx.notFound("folder not found");
    }
    ctx.body = {
      data: await permissionsManager.sanitizeOutput(updatedFolder)
    };
  },
  async getStructure(ctx) {
    const { getStructure: getStructure2 } = getService("folder");
    const structure = await getStructure2();
    ctx.body = {
      data: structure
    };
  }
};
const validateDeleteManyFoldersFilesSchema = utils.yup.object().shape({
  fileIds: utils.yup.array().of(utils.yup.strapiID().required()),
  folderIds: utils.yup.array().of(utils.yup.strapiID().required())
}).noUnknown().required();
const validateStructureMoveManyFoldersFilesSchema = utils.yup.object().shape({
  destinationFolderId: utils.yup.strapiID().nullable().defined().test("folder-exists", "destination folder does not exist", folderExists),
  fileIds: utils.yup.array().of(utils.yup.strapiID().required()),
  folderIds: utils.yup.array().of(utils.yup.strapiID().required())
}).noUnknown().required();
const validateDuplicatesMoveManyFoldersFilesSchema = utils.yup.object().test("are-folders-unique", "some folders already exist", async function areFoldersUnique(value) {
  const { folderIds, destinationFolderId } = value;
  if (fp.isEmpty(folderIds)) return true;
  const folders = await strapi.db.query(FOLDER_MODEL_UID).findMany({
    select: ["name"],
    where: { id: { $in: folderIds } }
  });
  const existingFolders = await strapi.db.query(FOLDER_MODEL_UID).findMany({
    select: ["name"],
    where: { parent: { id: destinationFolderId } }
  });
  const duplicatedNames = fp.intersection(fp.map("name", folders), fp.map("name", existingFolders));
  if (duplicatedNames.length > 0) {
    return this.createError({
      message: `some folders already exists: ${duplicatedNames.join(", ")}`
    });
  }
  return true;
});
const validateMoveFoldersNotInsideThemselvesSchema = utils.yup.object().test(
  "dont-move-inside-self",
  "folders cannot be moved inside themselves or one of its children",
  async function validateMoveFoldersNotInsideThemselves(value) {
    const { folderIds, destinationFolderId } = value;
    if (destinationFolderId === null || fp.isEmpty(folderIds)) return true;
    const destinationFolder = await strapi.db.query(FOLDER_MODEL_UID).findOne({
      select: ["path"],
      where: { id: destinationFolderId }
    });
    const folders = await strapi.db.query(FOLDER_MODEL_UID).findMany({
      select: ["name", "path"],
      where: { id: { $in: folderIds } }
    });
    const unmovableFoldersNames = folders.filter((folder2) => isFolderOrChild(destinationFolder, folder2)).map((f) => f.name);
    if (unmovableFoldersNames.length > 0) {
      return this.createError({
        message: `folders cannot be moved inside themselves or one of its children: ${unmovableFoldersNames.join(
          ", "
        )}`
      });
    }
    return true;
  }
);
const validateDeleteManyFoldersFiles = utils.validateYupSchema(
  validateDeleteManyFoldersFilesSchema
);
async function validateMoveManyFoldersFiles(body) {
  await utils.validateYupSchema(validateStructureMoveManyFoldersFilesSchema)(body);
  await utils.validateYupSchema(validateDuplicatesMoveManyFoldersFilesSchema)(body);
  await utils.validateYupSchema(validateMoveFoldersNotInsideThemselvesSchema)(body);
}
const adminFolderFile = {
  async deleteMany(ctx) {
    const { body } = ctx.request;
    const {
      state: { userAbility }
    } = ctx;
    const pmFolder = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: FOLDER_MODEL_UID
    });
    const pmFile = strapi.service("admin::permission").createPermissionsManager({
      ability: userAbility,
      action: ACTIONS.read,
      model: FILE_MODEL_UID
    });
    await validateDeleteManyFoldersFiles(body);
    const fileService = getService("file");
    const folderService = getService("folder");
    const deletedFiles = await fileService.deleteByIds(body.fileIds);
    const {
      folders: deletedFolders,
      totalFolderNumber,
      totalFileNumber
    } = await folderService.deleteByIds(body.folderIds);
    if (deletedFiles.length + deletedFolders.length > 1) {
      strapi.telemetry.send("didBulkDeleteMediaLibraryElements", {
        eventProperties: {
          rootFolderNumber: deletedFolders.length,
          rootAssetNumber: deletedFiles.length,
          totalFolderNumber,
          totalAssetNumber: totalFileNumber + deletedFiles.length
        }
      });
    }
    ctx.body = {
      data: {
        files: await pmFile.sanitizeOutput(deletedFiles),
        folders: await pmFolder.sanitizeOutput(deletedFolders)
      }
    };
  },
  async moveMany(ctx) {
    const { body } = ctx.request;
    const {
      state: { userAbility }
    } = ctx;
    const pmFolder = strapi.service("admin::permission").createPermissionsManager({
      ability: ctx.state.userAbility,
      model: FOLDER_MODEL_UID
    });
    const pmFile = strapi.service("admin::permission").createPermissionsManager({
      ability: userAbility,
      action: ACTIONS.read,
      model: FILE_MODEL_UID
    });
    await validateMoveManyFoldersFiles(body);
    const { folderIds = [], fileIds = [], destinationFolderId } = body;
    let totalFolderNumber = 0;
    let totalFileNumber = 0;
    const trx = await strapi.db.transaction();
    try {
      const existingFolders = await strapi.db.queryBuilder(FOLDER_MODEL_UID).select(["id", "pathId", "path"]).where({ id: { $in: folderIds } }).transacting(trx.get()).forUpdate().execute();
      const existingFiles = await strapi.db.queryBuilder(FILE_MODEL_UID).select(["id"]).where({ id: { $in: fileIds } }).transacting(trx.get()).forUpdate().execute();
      let destinationFolderPath = "/";
      if (destinationFolderId !== null) {
        const destinationFolder = await strapi.db.queryBuilder(FOLDER_MODEL_UID).select("path").where({ id: destinationFolderId }).transacting(trx.get()).first().execute();
        destinationFolderPath = destinationFolder.path;
      }
      const fileTable = strapi.getModel(FILE_MODEL_UID).collectionName;
      const folderTable = strapi.getModel(FOLDER_MODEL_UID).collectionName;
      const folderPathColName = (
        // @ts-expect-error - no dynamic typings for the models
        strapi.db.metadata.get(FILE_MODEL_UID).attributes.folderPath.columnName
      );
      const pathColName = strapi.db.metadata.get(FOLDER_MODEL_UID).attributes.path.columnName;
      if (existingFolders.length > 0) {
        const { joinTable } = strapi.db.metadata.get(FOLDER_MODEL_UID).attributes.parent;
        await strapi.db.queryBuilder(joinTable.name).transacting(trx.get()).delete().where({ [joinTable.joinColumn.name]: { $in: folderIds } }).execute();
        if (destinationFolderId !== null) {
          await strapi.db.queryBuilder(joinTable.name).transacting(trx.get()).insert(
            existingFolders.map((folder2) => ({
              [joinTable.inverseJoinColumn.name]: destinationFolderId,
              [joinTable.joinColumn.name]: folder2.id
            }))
          ).execute();
        }
        for (const existingFolder of existingFolders) {
          let replaceQuery;
          switch (strapi.db.dialect.client) {
            case "sqlite":
              replaceQuery = "? || SUBSTRING(??, ?)";
              break;
            case "postgres":
              replaceQuery = "CONCAT(?::TEXT, SUBSTRING(??, ?::INTEGER))";
              break;
            default:
              replaceQuery = "CONCAT(?, SUBSTRING(??, ?))";
          }
          totalFolderNumber = await strapi.db.getConnection(folderTable).transacting(trx.get()).where(pathColName, existingFolder.path).orWhere(pathColName, "like", `${existingFolder.path}/%`).update(
            pathColName,
            strapi.db.connection.raw(replaceQuery, [
              utils.strings.joinBy("/", destinationFolderPath, `${existingFolder.pathId}`),
              pathColName,
              existingFolder.path.length + 1
            ])
          );
          totalFileNumber = await strapi.db.getConnection(fileTable).transacting(trx.get()).where(folderPathColName, existingFolder.path).orWhere(folderPathColName, "like", `${existingFolder.path}/%`).update(
            folderPathColName,
            strapi.db.connection.raw(replaceQuery, [
              utils.strings.joinBy("/", destinationFolderPath, `${existingFolder.pathId}`),
              folderPathColName,
              existingFolder.path.length + 1
            ])
          );
        }
      }
      if (existingFiles.length > 0) {
        const fileJoinTable = strapi.db.metadata.get(FILE_MODEL_UID).attributes.folder.joinTable;
        await strapi.db.queryBuilder(fileJoinTable.name).transacting(trx.get()).delete().where({ [fileJoinTable.joinColumn.name]: { $in: fileIds } }).execute();
        if (destinationFolderId !== null) {
          await strapi.db.queryBuilder(fileJoinTable.name).transacting(trx.get()).insert(
            existingFiles.map((file2) => ({
              [fileJoinTable.inverseJoinColumn.name]: destinationFolderId,
              [fileJoinTable.joinColumn.name]: file2.id
            }))
          ).execute();
        }
        await strapi.db.getConnection(fileTable).transacting(trx.get()).whereIn("id", fileIds).update(folderPathColName, destinationFolderPath);
      }
      await trx.commit();
    } catch (e) {
      await trx.rollback();
      throw e;
    }
    const updatedFolders = await strapi.db.query(FOLDER_MODEL_UID).findMany({
      where: { id: { $in: folderIds } }
    });
    const updatedFiles = await strapi.db.query(FILE_MODEL_UID).findMany({
      where: { id: { $in: fileIds } }
    });
    strapi.telemetry.send("didBulkMoveMediaLibraryElements", {
      eventProperties: {
        rootFolderNumber: updatedFolders.length,
        rootAssetNumber: updatedFiles.length,
        totalFolderNumber,
        totalAssetNumber: totalFileNumber + updatedFiles.length
      }
    });
    ctx.body = {
      data: {
        files: await pmFile.sanitizeOutput(updatedFiles),
        folders: await pmFolder.sanitizeOutput(updatedFolders)
      }
    };
  }
};
const settingsSchema = utils.yup.object({
  sizeOptimization: utils.yup.boolean().required(),
  responsiveDimensions: utils.yup.boolean().required(),
  autoOrientation: utils.yup.boolean()
});
const validateSettings = utils.validateYupSchema(settingsSchema);
const adminSettings = {
  async updateSettings(ctx) {
    const {
      request: { body },
      state: { userAbility }
    } = ctx;
    if (userAbility.cannot(ACTIONS.readSettings, FILE_MODEL_UID)) {
      return ctx.forbidden();
    }
    const data = await validateSettings(body);
    await getService("upload").setSettings(data);
    ctx.body = { data };
  },
  async getSettings(ctx) {
    const {
      state: { userAbility }
    } = ctx;
    if (userAbility.cannot(ACTIONS.readSettings, FILE_MODEL_UID)) {
      return ctx.forbidden();
    }
    const data = await getService("upload").getSettings();
    ctx.body = { data };
  }
};
const fileInfoSchema$1 = utils.yup.object({
  name: utils.yup.string().nullable(),
  alternativeText: utils.yup.string().nullable(),
  caption: utils.yup.string().nullable(),
  folder: utils.yup.strapiID().nullable().test("folder-exists", "the folder does not exist", async (folderId) => {
    if (fp.isNil(folderId)) {
      return true;
    }
    const exists2 = await getService("folder").exists({ id: folderId });
    return exists2;
  })
});
const uploadSchema$1 = utils.yup.object({
  fileInfo: fileInfoSchema$1
});
const multiUploadSchema$1 = utils.yup.object({
  fileInfo: utils.yup.array().of(fileInfoSchema$1)
});
const validateUploadBody$1 = (data = {}, isMulti = false) => {
  const schema = isMulti ? multiUploadSchema$1 : uploadSchema$1;
  return utils.validateYupSchema(schema, { strict: false })(data);
};
const adminUpload = {
  async updateFileInfo(ctx) {
    const {
      state: { userAbility, user },
      query: { id },
      request: { body }
    } = ctx;
    if (typeof id !== "string") {
      throw new utils.errors.ValidationError("File id is required");
    }
    const uploadService = getService("upload");
    const { pm } = await findEntityAndCheckPermissions(
      userAbility,
      ACTIONS.update,
      FILE_MODEL_UID,
      id
    );
    const data = await validateUploadBody$1(body);
    const file2 = await uploadService.updateFileInfo(id, data.fileInfo, { user });
    ctx.body = await pm.sanitizeOutput(file2, { action: ACTIONS.read });
  },
  async replaceFile(ctx) {
    const {
      state: { userAbility, user },
      query: { id },
      request: { body, files: { files } = {} }
    } = ctx;
    if (typeof id !== "string") {
      throw new utils.errors.ValidationError("File id is required");
    }
    const uploadService = getService("upload");
    const { pm } = await findEntityAndCheckPermissions(
      userAbility,
      ACTIONS.update,
      FILE_MODEL_UID,
      id
    );
    if (Array.isArray(files)) {
      throw new utils.errors.ApplicationError("Cannot replace a file with multiple ones");
    }
    const data = await validateUploadBody$1(body);
    const replacedFile = await uploadService.replace(id, { data, file: files }, { user });
    const signedFile = await getService("file").signFileUrls(replacedFile);
    ctx.body = await pm.sanitizeOutput(signedFile, { action: ACTIONS.read });
  },
  async uploadFiles(ctx) {
    const {
      state: { userAbility, user },
      request: { body, files: { files } = {} }
    } = ctx;
    const uploadService = getService("upload");
    const pm = strapi.service("admin::permission").createPermissionsManager({
      ability: userAbility,
      action: ACTIONS.create,
      model: FILE_MODEL_UID
    });
    if (!pm.isAllowed) {
      return ctx.forbidden();
    }
    const data = await validateUploadBody$1(body);
    const uploadedFiles = await uploadService.upload({ data, files }, { user });
    const signedFiles = await utils.async.map(uploadedFiles, getService("file").signFileUrls);
    ctx.body = await pm.sanitizeOutput(signedFiles, { action: ACTIONS.read });
    ctx.status = 201;
  },
  // TODO: split into multiple endpoints
  async upload(ctx) {
    const {
      query: { id },
      request: { files: { files } = {} }
    } = ctx;
    if (___default.default.isEmpty(files) || !Array.isArray(files) && files.size === 0) {
      if (id) {
        return this.updateFileInfo(ctx);
      }
      throw new utils.errors.ApplicationError("Files are empty");
    }
    await (id ? this.replaceFile : this.uploadFiles)(ctx);
  }
};
const fileInfoSchema = utils.yup.object({
  name: utils.yup.string().nullable(),
  alternativeText: utils.yup.string().nullable(),
  caption: utils.yup.string().nullable()
}).noUnknown();
const uploadSchema = utils.yup.object({
  fileInfo: fileInfoSchema
});
const multiUploadSchema = utils.yup.object({
  fileInfo: utils.yup.array().of(fileInfoSchema)
});
const validateUploadBody = (data = {}, isMulti = false) => {
  const schema = isMulti ? multiUploadSchema : uploadSchema;
  return utils.validateYupSchema(schema, { strict: false })(data);
};
const { ValidationError } = utils__default.default.errors;
const contentApi = ({ strapi: strapi2 }) => {
  const sanitizeOutput = async (data, ctx) => {
    const schema = strapi2.getModel(FILE_MODEL_UID);
    const { auth } = ctx.state;
    return strapi2.contentAPI.sanitize.output(data, schema, { auth });
  };
  const validateQuery = async (data, ctx) => {
    const schema = strapi2.getModel(FILE_MODEL_UID);
    const { auth } = ctx.state;
    return strapi2.contentAPI.validate.query(data, schema, { auth });
  };
  const sanitizeQuery = async (data, ctx) => {
    const schema = strapi2.getModel(FILE_MODEL_UID);
    const { auth } = ctx.state;
    return strapi2.contentAPI.sanitize.query(data, schema, { auth });
  };
  return {
    async find(ctx) {
      await validateQuery(ctx.query, ctx);
      const sanitizedQuery = await sanitizeQuery(ctx.query, ctx);
      const files = await getService("upload").findMany(sanitizedQuery);
      ctx.body = await sanitizeOutput(files, ctx);
    },
    async findOne(ctx) {
      const {
        params: { id }
      } = ctx;
      await validateQuery(ctx.query, ctx);
      const sanitizedQuery = await sanitizeQuery(ctx.query, ctx);
      const file2 = await getService("upload").findOne(id, sanitizedQuery.populate);
      if (!file2) {
        return ctx.notFound("file.notFound");
      }
      ctx.body = await sanitizeOutput(file2, ctx);
    },
    async destroy(ctx) {
      const {
        params: { id }
      } = ctx;
      const file2 = await getService("upload").findOne(id);
      if (!file2) {
        return ctx.notFound("file.notFound");
      }
      await getService("upload").remove(file2);
      ctx.body = await sanitizeOutput(file2, ctx);
    },
    async updateFileInfo(ctx) {
      const {
        query: { id },
        request: { body }
      } = ctx;
      const data = await validateUploadBody(body);
      if (!id || typeof id !== "string" && typeof id !== "number") {
        throw new ValidationError("File id is required and must be a single value");
      }
      const result = await getService("upload").updateFileInfo(id, data.fileInfo);
      ctx.body = await sanitizeOutput(result, ctx);
    },
    async replaceFile(ctx) {
      const {
        query: { id },
        request: { body, files: { files } = {} }
      } = ctx;
      if (Array.isArray(files)) {
        throw new ValidationError("Cannot replace a file with multiple ones");
      }
      if (!id || typeof id !== "string" && typeof id !== "number") {
        throw new ValidationError("File id is required and must be a single value");
      }
      const data = await validateUploadBody(body);
      const replacedFiles = await getService("upload").replace(id, { data, file: files });
      ctx.body = await sanitizeOutput(replacedFiles, ctx);
    },
    async uploadFiles(ctx) {
      const {
        request: { body, files: { files } = {} }
      } = ctx;
      const data = await validateUploadBody(body, Array.isArray(files));
      const apiUploadFolderService = getService("api-upload-folder");
      const apiUploadFolder2 = await apiUploadFolderService.getAPIUploadFolder();
      if (Array.isArray(files)) {
        data.fileInfo = data.fileInfo || [];
        data.fileInfo = files.map((_f, i) => ({ ...data.fileInfo[i], folder: apiUploadFolder2.id }));
      } else {
        data.fileInfo = { ...data.fileInfo, folder: apiUploadFolder2.id };
      }
      const uploadedFiles = await getService("upload").upload({
        data,
        files
      });
      ctx.body = await sanitizeOutput(uploadedFiles, ctx);
      ctx.status = 201;
    },
    // TODO: split into multiple endpoints
    async upload(ctx) {
      const {
        query: { id },
        request: { files: { files } = {} }
      } = ctx;
      if (___default.default.isEmpty(files) || !Array.isArray(files) && files.size === 0) {
        if (id) {
          return this.updateFileInfo(ctx);
        }
        throw new ValidationError("Files are empty");
      }
      await (id ? this.replaceFile : this.uploadFiles)(ctx);
    }
  };
};
const configSchema = utils.yup.object({
  pageSize: utils.yup.number().required(),
  sort: utils.yup.mixed().oneOf(ALLOWED_SORT_STRINGS)
});
const validateViewConfiguration = utils.validateYupSchema(configSchema);
const viewConfiguration = {
  async updateViewConfiguration(ctx) {
    const {
      request: { body },
      state: { userAbility }
    } = ctx;
    if (userAbility.cannot(ACTIONS.configureView)) {
      return ctx.forbidden();
    }
    const data = await validateViewConfiguration(body);
    await getService("upload").setConfiguration(data);
    ctx.body = { data };
  },
  async findViewConfiguration(ctx) {
    const data = await getService("upload").getConfiguration();
    ctx.body = { data };
  }
};
const controllers = {
  "admin-file": adminFile,
  "admin-folder": adminFolder,
  "admin-folder-file": adminFolderFile,
  "admin-settings": adminSettings,
  "admin-upload": adminUpload,
  "content-api": contentApi,
  "view-configuration": viewConfiguration
};
const index = () => ({
  register,
  bootstrap,
  config,
  routes,
  controllers,
  contentTypes,
  services
});
exports.FILE_MODEL_UID = FILE_MODEL_UID;
exports.index = index;
//# sourceMappingURL=index-D57iKFts.js.map
