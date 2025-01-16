import { IconByType } from './AttributeIcon';
import type { SchemaType } from '../types';
import type { Internal } from '@strapi/types';
interface FormModalHeaderProps {
    actionType?: string | null;
    attributeName: string;
    attributeType: IconByType;
    categoryName: string;
    contentTypeKind: IconByType;
    dynamicZoneTarget: string;
    forTarget: SchemaType;
    modalType: string | null;
    targetUid: Internal.UID.Schema;
    customFieldUid?: string | null;
    showBackLink?: boolean;
}
export declare const FormModalHeader: ({ actionType, attributeName, attributeType, categoryName, contentTypeKind, dynamicZoneTarget, forTarget, modalType, targetUid, customFieldUid, showBackLink, }: FormModalHeaderProps) => import("react/jsx-runtime").JSX.Element;
export {};
