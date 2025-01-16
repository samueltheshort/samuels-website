import { CreateReleaseAction, CreateManyReleaseActions, DeleteReleaseAction } from '../../../shared/contracts/release-actions';
import type { GetReleaseActions, UpdateReleaseAction, ReleaseActionGroupBy } from '../../../shared/contracts/release-actions';
import type { CreateRelease, DeleteRelease, GetReleases, GetReleasesByDocumentAttached, GetRelease, PublishRelease } from '../../../shared/contracts/releases';
import type { GetSettings } from '../../../shared/contracts/settings';
export interface GetReleasesQueryParams {
    page?: number;
    pageSize?: number;
    filters?: {
        releasedAt?: {
            $notNull?: boolean | 'true' | 'false';
        };
    };
}
export interface GetReleaseActionsQueryParams {
    page?: number;
    pageSize?: number;
    groupBy?: ReleaseActionGroupBy;
}
type GetReleasesTabResponse = GetReleases.Response & {
    meta: {
        activeTab: 'pending' | 'done';
    };
};
declare const releaseApi: import("@reduxjs/toolkit/query").Api<import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, import("@reduxjs/toolkit/dist/query/endpointDefinitions").UpdateDefinitions<{}, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", never> & {
    getReleasesForEntry: import("@reduxjs/toolkit/query").QueryDefinition<Partial<{
        contentType: string;
        entryDocumentId: any;
        locale?: string | undefined;
        hasEntryAttached?: boolean | undefined;
    }>, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetReleasesByDocumentAttached.Response, "adminApi">;
    getReleases: import("@reduxjs/toolkit/query").QueryDefinition<void | GetReleasesQueryParams, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetReleasesTabResponse, "adminApi">;
    getRelease: import("@reduxjs/toolkit/query").QueryDefinition<{
        id: import("@strapi/types/dist/data").ID;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetRelease.Response, "adminApi">;
    getReleaseActions: import("@reduxjs/toolkit/query").QueryDefinition<{
        releaseId: import("@strapi/types/dist/data").ID;
    } & Partial<Pick<import("../../../shared/contracts/releases").Pagination, "page" | "pageSize">> & {
        groupBy?: ReleaseActionGroupBy | undefined;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetReleaseActions.Response, "adminApi">;
    createRelease: import("@reduxjs/toolkit/query").MutationDefinition<{
        name: string;
        scheduledAt: Date | null;
        timezone: string | null;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", CreateRelease.Response, "adminApi">;
    updateRelease: import("@reduxjs/toolkit/query").MutationDefinition<{
        id: import("@strapi/types/dist/data").ID;
    } & {
        name: string;
        scheduledAt?: Date | null | undefined;
        timezone?: string | null | undefined;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", void, "adminApi">;
    createReleaseAction: import("@reduxjs/toolkit/query").MutationDefinition<CreateReleaseAction.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", CreateReleaseAction.Response, "adminApi">;
    createManyReleaseActions: import("@reduxjs/toolkit/query").MutationDefinition<CreateManyReleaseActions.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", CreateManyReleaseActions.Response, "adminApi">;
    updateReleaseAction: import("@reduxjs/toolkit/query").MutationDefinition<UpdateReleaseAction.Request & {
        query: GetReleaseActions.Request['query'];
    } & {
        actionPath: [string, number];
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", UpdateReleaseAction.Response, "adminApi">;
    deleteReleaseAction: import("@reduxjs/toolkit/query").MutationDefinition<DeleteReleaseAction.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", DeleteReleaseAction.Response, "adminApi">;
    publishRelease: import("@reduxjs/toolkit/query").MutationDefinition<{
        id: import("@strapi/types/dist/data").ID;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", PublishRelease.Response, "adminApi">;
    deleteRelease: import("@reduxjs/toolkit/query").MutationDefinition<{
        id: import("@strapi/types/dist/data").ID;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", DeleteRelease.Response, "adminApi">;
    getMappedEntriesInReleases: import("@reduxjs/toolkit/query").QueryDefinition<{
        contentTypeUid: import("@strapi/types/dist/uid").ContentType;
        documentIds: string[];
        locale?: string | undefined;
    }, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", {
        [documentId: string]: Pick<import("../../../shared/contracts/releases").Release, "id" | "name">[];
    }, "adminApi">;
    getReleaseSettings: import("@reduxjs/toolkit/query").QueryDefinition<void | GetSettings.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetSettings.Response, "adminApi">;
    updateReleaseSettings: import("@reduxjs/toolkit/query").MutationDefinition<import("../../../shared/contracts/settings").Settings, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", void, "adminApi">;
}, "adminApi", "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", typeof import("@reduxjs/toolkit/query").coreModuleName | typeof import("@reduxjs/toolkit/dist/query/react").reactHooksModuleName>;
declare const useGetReleasesQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<void | GetReleasesQueryParams, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetReleasesTabResponse, "adminApi">>, useGetReleasesForEntryQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<Partial<{
    contentType: string;
    entryDocumentId: any;
    locale?: string | undefined;
    hasEntryAttached?: boolean | undefined;
}>, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetReleasesByDocumentAttached.Response, "adminApi">>, useGetReleaseQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<{
    id: import("@strapi/types/dist/data").ID;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetRelease.Response, "adminApi">>, useGetReleaseActionsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<{
    releaseId: import("@strapi/types/dist/data").ID;
} & Partial<Pick<import("../../../shared/contracts/releases").Pagination, "page" | "pageSize">> & {
    groupBy?: ReleaseActionGroupBy | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetReleaseActions.Response, "adminApi">>, useCreateReleaseMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    name: string;
    scheduledAt: Date | null;
    timezone: string | null;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", CreateRelease.Response, "adminApi">>, useCreateReleaseActionMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<CreateReleaseAction.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", CreateReleaseAction.Response, "adminApi">>, useCreateManyReleaseActionsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<CreateManyReleaseActions.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", CreateManyReleaseActions.Response, "adminApi">>, useUpdateReleaseMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    id: import("@strapi/types/dist/data").ID;
} & {
    name: string;
    scheduledAt?: Date | null | undefined;
    timezone?: string | null | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", void, "adminApi">>, useUpdateReleaseActionMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<UpdateReleaseAction.Request & {
    query: GetReleaseActions.Request['query'];
} & {
    actionPath: [string, number];
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", UpdateReleaseAction.Response, "adminApi">>, usePublishReleaseMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    id: import("@strapi/types/dist/data").ID;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", PublishRelease.Response, "adminApi">>, useDeleteReleaseActionMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<DeleteReleaseAction.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", DeleteReleaseAction.Response, "adminApi">>, useDeleteReleaseMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<{
    id: import("@strapi/types/dist/data").ID;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", DeleteRelease.Response, "adminApi">>, useGetMappedEntriesInReleasesQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<{
    contentTypeUid: import("@strapi/types/dist/uid").ContentType;
    documentIds: string[];
    locale?: string | undefined;
}, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", {
    [documentId: string]: Pick<import("../../../shared/contracts/releases").Release, "id" | "name">[];
}, "adminApi">>, useGetReleaseSettingsQuery: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseQuery<import("@reduxjs/toolkit/query").QueryDefinition<void | GetSettings.Request, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", GetSettings.Response, "adminApi">>, useUpdateReleaseSettingsMutation: import("@reduxjs/toolkit/dist/query/react/buildHooks").UseMutation<import("@reduxjs/toolkit/query").MutationDefinition<import("../../../shared/contracts/settings").Settings, import("@reduxjs/toolkit/query").BaseQueryFn<string | import("@strapi/admin/strapi-admin").QueryArguments, unknown, import("@strapi/admin/strapi-admin").BaseQueryError, {}, {}>, "Release" | "ReleaseAction" | "EntriesInRelease" | "ReleaseSettings" | "Document", void, "adminApi">>;
export { useGetReleasesQuery, useGetReleasesForEntryQuery, useGetReleaseQuery, useGetReleaseActionsQuery, useCreateReleaseMutation, useCreateReleaseActionMutation, useCreateManyReleaseActionsMutation, useUpdateReleaseMutation, useUpdateReleaseActionMutation, usePublishReleaseMutation, useDeleteReleaseActionMutation, useDeleteReleaseMutation, useGetMappedEntriesInReleasesQuery, useGetReleaseSettingsQuery, useUpdateReleaseSettingsMutation, releaseApi, };
