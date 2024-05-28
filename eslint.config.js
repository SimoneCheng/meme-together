import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

const settings = [
  {
    languageOptions: {
      globals: globals.browser,
      ...pluginReactConfig.languageOptions,
    }
  },
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.{js,jsx}'],
    ...pluginReactConfig,
  },
  {
    rules: {
      semi: ['error', 'always'],
      "no-unused-vars": "error",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off"
    }
  },
  {
    files: ['src/**/*.test.js'],
    languageOptions: {
      globals: {
        test: "readonly",
        jest: "readonly",
        expect: "readonly",
        it: "readonly",
        describe: "readonly"
      }
    }
  }
];

export default settings;
