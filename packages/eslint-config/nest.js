const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["standard", "prettier", "plugin:@typescript-eslint/recommended", "eslint-config-turbo"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["turbo", "eslint-plugin-import-helpers", "@typescript-eslint", "prettier"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [
    {
      files: ["*.js?(x)", "*.ts?(x)"],
      rules: {
        indent: 'off',
        "linebreak-style": ["error", "unix"],
        semi: ["error", "always"],
        "object-curly-spacing": ["error", "always"],
        "no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn", 
        "no-useless-constructor": "off",
        "no-use-before-define": "off",
        "import/no-duplicates": "off",
        "prettier/prettier": [
          "error",
          {
            printWidth: 100,
            singleQuote: false
          },
        ],
        "import-helpers/order-imports": [
          "warn",
          {
            newlinesBetween: "always",
            groups: [["module", "/^@prisma/"], "/^@/*/", ["parent", "sibling", "index"]],
            alphabetize: { order: "asc", ignoreCase: true },
          },
        ],
      },
    },
  ],
};