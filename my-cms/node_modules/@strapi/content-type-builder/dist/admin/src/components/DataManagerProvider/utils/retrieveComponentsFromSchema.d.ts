import type { AttributeType, Components } from '../../../types';
import type { Internal } from '@strapi/types';
declare const retrieveComponentsFromSchema: (attributes: AttributeType[], allComponentsData: Components) => Internal.UID.Component[];
export { retrieveComponentsFromSchema };
