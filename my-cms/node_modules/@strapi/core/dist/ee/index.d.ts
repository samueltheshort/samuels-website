import type { Core } from '@strapi/types';
declare const _default: Readonly<{
    init: (licenseDir: string, logger?: import("winston").Logger | undefined) => void;
    checkLicense: ({ strapi }: {
        strapi: Core.Strapi;
    }) => Promise<void>;
    readonly isEE: boolean;
    readonly seats: number | undefined;
    features: Readonly<{
        list: () => {
            [key: string]: any;
            name: string;
        }[];
        get: (featureName: string) => {
            [key: string]: any;
            name: string;
        } | undefined;
        isEnabled: (featureName: string) => boolean;
    }>;
}>;
export default _default;
//# sourceMappingURL=index.d.ts.map