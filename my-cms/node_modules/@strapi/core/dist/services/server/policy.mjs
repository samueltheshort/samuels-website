import { policy, errors } from "@strapi/utils";
const createPolicicesMiddleware = (route, strapi) => {
  const policiesConfig = route?.config?.policies ?? [];
  const resolvedPolicies = strapi.get("policies").resolve(policiesConfig, route.info);
  const policiesMiddleware = async (ctx, next) => {
    const context = policy.createPolicyContext("koa", ctx);
    for (const { handler, config } of resolvedPolicies) {
      const result = await handler(context, config, { strapi });
      if (![true, void 0].includes(result)) {
        throw new errors.PolicyError();
      }
    }
    await next();
  };
  return policiesMiddleware;
};
export {
  createPolicicesMiddleware
};
//# sourceMappingURL=policy.mjs.map
