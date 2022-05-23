module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["plugin:react/recommended", "plugin:react/jsx-runtime"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2],
    // "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    // semi: ["error", "always"],
  },
};
