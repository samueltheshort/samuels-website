import boxen from "boxen";
import chalk from "chalk";
import os from "node:os";
const isError = (err) => err instanceof Error;
const handleUnexpectedError = (err) => {
  console.error(
    chalk.red(
      `[ERROR] `,
      "There seems to be an unexpected error, try again with --debug for more information",
      os.EOL
    )
  );
  if (isError(err) && err.stack) {
    console.log(
      chalk.red(
        boxen(err.stack, {
          padding: 1,
          align: "left"
        })
      )
    );
  }
  process.exit(1);
};
export {
  handleUnexpectedError,
  isError
};
//# sourceMappingURL=errors.mjs.map
