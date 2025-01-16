import type { AttributeType } from '../../../types';
import type { Internal, Struct } from '@strapi/types';
export type EditableContentTypeSchema = {
    kind: Struct.ContentTypeKind;
    name: string;
    attributes: AttributeType[];
};
export type EditableContentTypeData = {
    contentType: {
        uid: Internal.UID.ContentType;
        schema: EditableContentTypeSchema;
    };
};
type ModifiedData = {
    kind: Struct.ContentTypeKind;
};
export declare const canEditContentType: (data: Record<string, any>, modifiedData: ModifiedData) => boolean;
export {};
