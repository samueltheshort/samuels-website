import type { GetStages, UpdateStage, UpdateAssignee } from '../../../shared/contracts/review-workflows';
import type { Contracts } from '@strapi/content-manager/_internal/shared';
type ContentType = Contracts.ContentTypes.ContentType;
interface ContentTypes {
    collectionType: ContentType[];
    singleType: ContentType[];
}
declare const useGetStagesQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<GetStages.Params & {
    slug: string;
    params?: object | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "ReviewWorkflow" | "ReviewWorkflowStages" | "Document" | "ContentTypeSettings", {
    stages: NonNullable<GetStages.Response['data']>;
    meta: NonNullable<GetStages.Response['meta']>;
}, "adminApi">>, useUpdateStageMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    data: {
        id: import("@strapi/types/dist/data").ID;
    };
} & UpdateStage.Params & {
    slug: string;
    params?: object | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "ReviewWorkflow" | "ReviewWorkflowStages" | "Document" | "ContentTypeSettings", {
    id: import("@strapi/types/dist/data").ID;
} & {
    [key: string]: any;
}, "adminApi">>, useUpdateAssigneeMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    data: {
        id: import("@strapi/types/dist/data").ID | null;
    };
} & UpdateAssignee.Params & {
    slug: string;
    params?: object | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "ReviewWorkflow" | "ReviewWorkflowStages" | "Document" | "ContentTypeSettings", {
    id: import("@strapi/types/dist/data").ID;
} & {
    [key: string]: any;
}, "adminApi">>, useGetContentTypesQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<void, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "ReviewWorkflow" | "ReviewWorkflowStages" | "Document" | "ContentTypeSettings", ContentTypes, "adminApi">>;
export { useGetStagesQuery, useUpdateStageMutation, useUpdateAssigneeMutation, useGetContentTypesQuery, };
export type { ContentTypes, ContentType };
