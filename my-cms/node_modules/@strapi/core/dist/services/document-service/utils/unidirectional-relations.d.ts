import { UID } from '@strapi/types';
interface LoadContext {
    oldVersions: {
        id: string;
        locale: string;
    }[];
    newVersions: {
        id: string;
        locale: string;
    }[];
}
/**
 * Loads lingering relations that need to be updated when overriding a published or draft entry.
 * This is necessary because the relations are uni-directional and the target entry is not aware of the source entry.
 * This is not the case for bi-directional relations, where the target entry is also linked to the source entry.
 */
declare const load: (uid: UID.ContentType, { oldVersions, newVersions }: LoadContext) => Promise<any>;
/**
 * Updates uni directional relations to target the right entries when overriding published or draft entries.
 *
 * @param oldEntries The old entries that are being overridden
 * @param newEntries The new entries that are overriding the old ones
 * @param oldRelations The relations that were previously loaded with `load` @see load
 */
declare const sync: (oldEntries: {
    id: string;
    locale: string;
}[], newEntries: {
    id: string;
    locale: string;
}[], oldRelations: {
    joinTable: any;
    relations: any[];
}[]) => Promise<void>;
export { load, sync };
//# sourceMappingURL=unidirectional-relations.d.ts.map