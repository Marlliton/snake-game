const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "standard",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    'plugin:prettier/recommended',
    "eslint-config-turbo",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  plugins: ["@next/next", "turbo", "prettier"],
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
        indent: ["warn", 2],
        "linebreak-style": ["error", "unix"],
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "object-curly-spacing": ["error", "always"],
        "no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unused-vars": "warn", 
        "import/no-duplicates": "off",
        "prettier/prettier": [
          "error",
          {
            "printWidth": 100
          }
        ],
      },
    },
  ],
};
