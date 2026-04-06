// file: .eslintrc.cjs
module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
    browser: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off"
  },
  overrides: [
    {
      files: ["apps/api/**/*.ts"],
      env: { node: true, browser: false }
    }
  ]
};
