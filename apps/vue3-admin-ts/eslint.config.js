import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],// 适用于 JavaScript、TypeScript 和 Vue 文件
    plugins: { js }, // 使用 JavaScript ESLint 插件
    extends: ["js/recommended"], // 使用 JavaScript ESLint 推荐的规则
    languageOptions: {// 定义全局变量，包含浏览器和 Node.js 的全局变量
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  tseslint.configs.recommended,// 使用 TypeScript ESLint 推荐的规则
  pluginVue.configs["flat/essential"],// 使用 Vue ESLint 插件的基本规则
  {
    files: ["**/*.vue"],// 仅对 Vue 文件使用 TypeScript ESLint 解析器 
    languageOptions: {
      parserOptions:
      {
        parser: tseslint.parser
      }
    }
  },
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/coverage/**",
      "**/build/**", "**/public/**", "**/vendor/**", '**/lib/**',
      '**/es/**', '**/esm/**', '**/cjs/**', '**/umd/**', '**/iife/**',
      '**/min/**', '**/docs/**',
      '**/examples/**', '**/demo/**', '**/test/**', '**/tests/**',
      '**/__tests__/**', '**/__mocks__/**', '**/__fixtures__/**',
      '**/.eslintcache/**', '**/.eslintignore/**', '**/.eslintrc.js/**',
      '**/.eslintrc.json/**', '**/.eslintrc.yml/**', '**/.eslintrc.yaml/**',
      '**/.prettierignore/**', '**/.prettierrc.js/**', '**/.prettierrc.json/**',
      '**/.prettierrc.yml/**', '**/.prettierrc.yaml/**',
      '**/.stylelintrc.js/**', '**/.stylelintrc.json/**', '**/.stylelintrc.yml/**',
      '**/.stylelintrc.yaml/**', '**/.stylelintignore/**', '**/.editorconfig/**',
      '**/.git/**', '**/.github/**', '**/.gitlab/**', '**/.bitbucket/**',
      '**/.vscode/**', '**/.idea/**', '**/.vscode-test/**',
      ".css", ".less", ".scss", ".sass", ".styl", ".stylus", ".postcss", ".pcss", ".css.map",
      "*d.ts",
    ]
    // 忽略 dist 和 node_modules 目录中的文件
  }
]);
