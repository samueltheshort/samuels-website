import type { UID } from '@strapi/types';
/**
 *
 * Iterate through an entity manager result
 * Check which modelAttributes are media and pre sign the image URLs
 * if they are from the current upload provider
 *
 * @param {Object} entity
 * @param {Object} modelAttributes
 * @returns
 */
declare const signEntityMedia: (entity: any, uid: UID.Schema) => Promise<import("@strapi/utils/dist/types").Data>;
export { signEntityMedia };
//# sourceMappingURL=utils.d.ts.map