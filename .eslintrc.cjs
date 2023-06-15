const OFF = 0;
const ERROR = 2;
const WARN = 1;

module.exports = {
  env: { browser: true, es2020: true },
  root: true,
  extends: [
    "airbnb",
    "airbnb/hooks",
    "react-app",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [WARN],
    "linebreak-style": [ERROR, "windows"],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "no-console": [ERROR, { allow: ["warn", "error"] }],
    "jsx-quotes": [ERROR, "prefer-double"],
    quotes: [ERROR, "double"],
    "no-unused-vars": [ERROR, { args: "all" }],
    "react/jsx-filename-extension": [ERROR, { extensions: [".js", ".jsx"] }],
    "space-before-function-paren": [ERROR],
    "react/self-closing-comp": [ERROR],
    "operator-linebreak": [ERROR, "after"],
    "no-confusing-arrow": [ERROR],
    "no-duplicate-imports": [ERROR],
    "comma-dangle": [ERROR, "only-multiline"],
    "react/prop-types": [OFF],
    "no-param-reassign": [OFF],
  },
};
