import { createCommand } from "commander";
const command = () => {
  return createCommand("version").description("Output the version of Strapi").action(() => {
    const { version } = require("../../../package.json");
    process.stdout.write(`${version}
`);
    process.exit(0);
  });
};
export {
  command
};
//# sourceMappingURL=version.mjs.map
