/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@appointmently/eslint-config/nest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
