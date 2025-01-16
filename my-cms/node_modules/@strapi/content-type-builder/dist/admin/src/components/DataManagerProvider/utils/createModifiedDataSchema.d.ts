import type { ContentType, Components } from '../../../types';
import type { Internal } from '@strapi/types';
export declare const createModifiedDataSchema: (contentTypeSchema: ContentType, retrievedComponents: Internal.UID.Component[], allComponentsSchema: Components, isInContentTypeView: boolean) => {
    [x: string]: any;
    components: any;
};
