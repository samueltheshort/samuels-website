"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const coreService = require("./core-service.js");
class SingleTypeService extends coreService.CoreService {
  contentType;
  constructor(contentType) {
    super();
    this.contentType = contentType;
  }
  async getDocumentId() {
    const { uid } = this.contentType;
    return strapi.db.query(uid).findOne().then((document) => document?.documentId);
  }
  async find(params = {}) {
    const { uid } = this.contentType;
    return strapi.documents(uid).findFirst(this.getFetchParams(params));
  }
  async createOrUpdate(params = {}) {
    const { uid } = this.contentType;
    const documentId = await this.getDocumentId();
    if (documentId) {
      return strapi.documents(uid).update({
        ...this.getFetchParams(params),
        documentId
      });
    }
    return strapi.documents(uid).create(this.getFetchParams(params));
  }
  async delete(params = {}) {
    const { uid } = this.contentType;
    const documentId = await this.getDocumentId();
    if (!documentId) return { deletedEntries: 0 };
    const { entries } = await strapi.documents(uid).delete({
      ...this.getFetchParams(params),
      documentId
    });
    return { deletedEntries: entries.length };
  }
}
const createSingleTypeService = (contentType) => {
  return new SingleTypeService(contentType);
};
exports.SingleTypeService = SingleTypeService;
exports.createSingleTypeService = createSingleTypeService;
//# sourceMappingURL=single-type.js.map
