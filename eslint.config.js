import jsdoc from "eslint-plugin-jsdoc";
import importPlugin from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      jsdoc: jsdoc,
      import: importPlugin,
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
      "import/no-unresolved": "error",
    },
  },
];
