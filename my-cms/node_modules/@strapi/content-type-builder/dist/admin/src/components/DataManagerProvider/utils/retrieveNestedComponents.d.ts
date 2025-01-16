import type { Components } from '../../../types';
import type { Internal } from '@strapi/types';
export type NestedComponent = {
    component: Internal.UID.Component;
    uidsOfAllParents?: Internal.UID.Component[];
    parentCompoUid?: Internal.UID.Component;
};
export declare const retrieveNestedComponents: (appComponents: Components) => NestedComponent[];
