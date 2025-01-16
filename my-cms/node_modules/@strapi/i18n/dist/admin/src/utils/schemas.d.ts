import type { Schema } from '@strapi/types';
declare const mutateCTBContentTypeSchema: (nextSchema: Schema.ContentType, prevSchema?: {
    apiID?: string;
    schema?: Schema.ContentType;
    uid?: string;
}) => import("@strapi/types/dist/struct").ContentTypeSchema | {
    pluginOptions: Pick<{
        i18n: {
            localized: boolean;
        };
    }, never>;
    attributes: Record<string, OmitByPath<Schema.Attribute.AnyAttribute, ["pluginOptions", "i18n"]>>;
    modelType: "contentType";
    uid: import("@strapi/types/dist/uid").ContentType;
    kind: import("@strapi/types/dist/struct").ContentTypeKind;
    info: import("@strapi/types/dist/struct").ContentTypeSchemaInfo;
    indexes?: unknown[] | undefined;
    foreignKeys?: unknown[] | undefined;
    modelName: string;
    globalId: string;
    options?: import("@strapi/types/dist/struct").SchemaOptions | undefined;
    collectionName?: string | undefined;
};
type OmitByPath<T extends object, K extends string[]> = Pick<T, Exclude<keyof T, K[number]>>;
export { mutateCTBContentTypeSchema };
