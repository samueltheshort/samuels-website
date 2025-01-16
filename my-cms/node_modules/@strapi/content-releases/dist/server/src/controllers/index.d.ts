/// <reference types="koa" />
export declare const controllers: {
    release: {
        findByDocumentAttached(ctx: import("koa").Context): Promise<void>;
        findPage(ctx: import("koa").Context): Promise<void>;
        findOne(ctx: import("koa").Context): Promise<void>;
        mapEntriesToReleases(ctx: import("koa").Context): Promise<void>;
        create(ctx: import("koa").Context): Promise<void>;
        update(ctx: import("koa").Context): Promise<void>;
        delete(ctx: import("koa").Context): Promise<void>;
        publish(ctx: import("koa").Context): Promise<void>;
    };
    'release-action': {
        create(ctx: import("koa").Context): Promise<void>;
        createMany(ctx: import("koa").Context): Promise<void>;
        findMany(ctx: import("koa").Context): Promise<void>;
        update(ctx: import("koa").Context): Promise<void>;
        delete(ctx: import("koa").Context): Promise<void>;
    };
    settings: {
        find(ctx: import("koa").Context): Promise<void>;
        update(ctx: import("koa").Context): Promise<void>;
    };
};
//# sourceMappingURL=index.d.ts.map