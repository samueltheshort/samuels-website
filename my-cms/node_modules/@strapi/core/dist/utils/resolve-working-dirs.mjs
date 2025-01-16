import path from "node:path";
const resolveWorkingDirectories = (opts) => {
  const cwd = process.cwd();
  const appDir = opts.appDir ? path.resolve(cwd, opts.appDir) : cwd;
  const distDir = opts.distDir ? path.resolve(cwd, opts.distDir) : appDir;
  return { appDir, distDir };
};
export {
  resolveWorkingDirectories
};
//# sourceMappingURL=resolve-working-dirs.mjs.map
