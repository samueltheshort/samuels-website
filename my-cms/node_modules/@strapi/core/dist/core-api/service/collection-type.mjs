import { getPaginationInfo, isPagedPagination, shouldCount, transformPaginationResponse } from "./pagination.mjs";
import { CoreService } from "./core-service.mjs";
class CollectionTypeService extends CoreService {
  contentType;
  constructor(contentType) {
    super();
    this.contentType = contentType;
  }
  async find(params = {}) {
    const { uid } = this.contentType;
    const fetchParams = this.getFetchParams(params);
    const paginationInfo = getPaginationInfo(fetchParams);
    const isPaged = isPagedPagination(fetchParams.pagination);
    const results = await strapi.documents(uid).findMany({
      ...fetchParams,
      ...paginationInfo
    });
    if (shouldCount(fetchParams)) {
      const count = await strapi.documents(uid).count({ ...fetchParams, ...paginationInfo });
      if (typeof count !== "number") {
        throw new Error("Count should be a number");
      }
      return {
        results,
        pagination: transformPaginationResponse(paginationInfo, count, isPaged)
      };
    }
    return {
      results,
      pagination: transformPaginationResponse(paginationInfo, void 0, isPaged)
    };
  }
  findOne(documentId, params = {}) {
    const { uid } = this.contentType;
    return strapi.documents(uid).findOne({
      ...this.getFetchParams(params),
      documentId
    });
  }
  async create(params = { data: {} }) {
    const { uid } = this.contentType;
    return strapi.documents(uid).create(this.getFetchParams(params));
  }
  update(documentId, params = { data: {} }) {
    const { uid } = this.contentType;
    return strapi.documents(uid).update({
      ...this.getFetchParams(params),
      documentId
    });
  }
  async delete(documentId, params = {}) {
    const { uid } = this.contentType;
    const { entries } = await strapi.documents(uid).delete({
      ...this.getFetchParams(params),
      documentId
    });
    return { deletedEntries: entries.length };
  }
}
const createCollectionTypeService = (contentType) => {
  return new CollectionTypeService(contentType);
};
export {
  CollectionTypeService,
  createCollectionTypeService
};
//# sourceMappingURL=collection-type.mjs.map
