import type { Core } from '@strapi/types';
import type { Sender } from './sender';
declare const createMiddleware: ({ sendEvent }: {
    sendEvent: Sender;
}) => Core.MiddlewareHandler;
export default createMiddleware;
//# sourceMappingURL=middleware.d.ts.map