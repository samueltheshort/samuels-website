import { createCommand } from "commander";
import { assertCwdContainsStrapiProject } from "../utils/helpers.mjs";
const command = ({ argv }) => {
  return createCommand("generate").description("Launch the interactive API generator").action(() => {
    assertCwdContainsStrapiProject("generate");
    argv.splice(2, 1);
    import("@strapi/generators").then((gen) => gen.runCLI());
  });
};
export {
  command
};
//# sourceMappingURL=generate.mjs.map
