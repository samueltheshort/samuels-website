declare const _default: {
    'review-workflows': {
        type: string;
        routes: {
            method: string;
            path: string;
            handler: string;
            config: {
                middlewares: ((ctx: any, next: any) => any)[];
                policies: (string | {
                    name: string;
                    config: {
                        actions: string[];
                    };
                })[];
            };
        }[];
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map