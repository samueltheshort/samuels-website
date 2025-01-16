import type { Struct } from '@strapi/types';
interface TransformOptions {
    contentType?: Struct.ContentTypeSchema | Struct.ComponentSchema;
    /**
     * @deprecated this option is deprecated and will be removed in the next major version
     */
    useJsonAPIFormat?: boolean;
}
declare const transformResponse: (resource: any, meta?: unknown, opts?: TransformOptions) => {
    data: any;
    meta: unknown;
} | null | undefined;
export { transformResponse };
//# sourceMappingURL=transform.d.ts.map