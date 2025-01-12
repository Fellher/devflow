// import path from "node:path";
// import { fileURLToPath } from "node:url";
// import js from "@eslint/js";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// });

// export default [
//   ...compat.extends(
//     "next/core-web-vitals",
//     "next/typescript",
//     "standard",
//     "plugin:tailwindcss/recommended",
//     "prettier"
//   ),
//   {
//     rules: {
//       "no-undef": "off",
//     },
//   },
// ];
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: { root: true }, // Fixed the missing parameter
  ignorePatterns: ["components/ui/**"],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin", // Built-in types are first
          "external", // External libraries
          "internal", // Internal modules
          ["parent", "sibling"], // Parent and sibling types can be mingled together
          "index", // Then the index file
          "object", // Object imports
        ],
        newlinesBetween: "always",
        pathGroups: [
          {
            pattern: "@app/**",
            group: "external",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "standard",
    "plugin:tailwindcss/recommended",
    "prettier"
  ),
  ...compat.plugins("import", "promise", "n"),
];

export default eslintConfig;
