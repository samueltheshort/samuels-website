import path from "path";
import readPkgUp from "read-pkg-up";
async function loadStrapiMonorepo(cwd) {
  let p = cwd;
  while (p !== "/") {
    const readResult = await readPkgUp({ cwd: p });
    if (!readResult) {
      return void 0;
    }
    if (readResult.packageJson.isStrapiMonorepo) {
      return { path: path.dirname(readResult.path) };
    }
    p = path.dirname(path.dirname(readResult.path));
  }
  return void 0;
}
export {
  loadStrapiMonorepo
};
//# sourceMappingURL=monorepo.mjs.map
