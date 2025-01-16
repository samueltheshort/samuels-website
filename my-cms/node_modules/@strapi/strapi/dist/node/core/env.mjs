import path from "node:path";
import dotenv from "dotenv";
import { pathExists } from "./files.mjs";
const loadEnv = async (cwd) => {
  const pathToEnv = path.resolve(cwd, ".env");
  if (await pathExists(pathToEnv)) {
    dotenv.config({ path: pathToEnv });
  }
};
const getStrapiAdminEnvVars = (defaultEnv) => {
  return Object.keys(process.env).filter((key) => key.toUpperCase().startsWith("STRAPI_ADMIN_")).reduce(
    (acc, key) => {
      acc[key] = process.env[key];
      return acc;
    },
    defaultEnv
  );
};
export {
  getStrapiAdminEnvVars,
  loadEnv
};
//# sourceMappingURL=env.mjs.map
