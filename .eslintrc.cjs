const OFF = 0;
const ERROR = 2;
const WARN = 1;

module.exports = {
  env: {browser: true, es2020: true},
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
  parserOptions: {ecmaVersion: "latest", sourceType: "module"},
  settings: {react: {version: "18.2"}},
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [OFF],
    "linebreak-style": [WARN, "windows"],
    "import/no-extraneous-dependencies": [ERROR, {devDependencies: true}],
    "no-console": [WARN, {allow: ["warn", "error"]}],
    "jsx-quotes": [ERROR, "prefer-double"],
    quotes: [ERROR, "double"],
    "implicit-arrow-linebreak": [ERROR, "below"],
    "arrow-body-style": [ERROR, "always"],
    "import/extensions": [OFF],
    "no-unused-vars": [WARN, {args: "all"}],
    "react/jsx-filename-extension": [ERROR, {extensions: [".js", ".jsx"]}],
    "space-before-function-paren": [ERROR],
    "react/self-closing-comp": [ERROR],
    "operator-linebreak": [ERROR, "after"],
    "no-confusing-arrow": [ERROR],
    "no-duplicate-imports": [ERROR],
    "comma-dangle": [ERROR, "only-multiline"],
    "object-curly-newline": [WARN, {
      "ObjectExpression": {"multiline": true},
      "ObjectPattern": {"multiline": true},
      "ExportDeclaration": "never"
    }],
    "jsx-a11y/label-has-associated-control": [OFF],
    "react/prop-types": [OFF],
    "no-param-reassign": [OFF],
    "import/prefer-default-export": [OFF],
    "react/jsx-props-no-spreading": [OFF],
    "react/no-unstable-nested-components":[OFF],
    "no-shadow": [OFF],
  },
};
