const getPackageManager = () => {
  const agent = process.env.npm_config_user_agent || "";
  if (agent.includes("yarn")) {
    return "yarn";
  }
  if (agent.includes("pnpm")) {
    return "pnpm";
  }
  if (/^npm\/\d/.test(agent)) {
    return "npm";
  }
  return void 0;
};
export {
  getPackageManager
};
//# sourceMappingURL=managers.mjs.map
