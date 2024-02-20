/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@snake/eslint-config/next"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
