import { useRBAC } from '@strapi/admin/strapi-admin';
type UseRBACReturnType = ReturnType<typeof useRBAC>;
type AllowedActionsType = UseRBACReturnType['allowedActions'];
export declare const useMediaLibraryPermissions: () => AllowedActionsType & {
    isLoading: boolean;
};
export {};
