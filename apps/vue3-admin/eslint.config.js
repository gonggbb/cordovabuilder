import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import prettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  {
    // files: ["**/*.{js,mjs,cjs,vue}"], // 检查所有 JavaScript 和 Vue 文件
    files: ["src/**/*.{js,mjs,cjs,vue}"], // 只检查某个特定目录
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginVue.configs["flat/essential"],
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/build/**",
      "**/public/**",
      "**/vendor/**",
      "**/lib/**",
      "**/es/**",
      "**/esm/**",
      "**/cjs/**",
      "**/umd/**",
      "**/iife/**",
      "**/min/**",
      "**/docs/**",
      "**/examples/**",
      "**/demo/**",
      "**/test/**",
      "**/tests/**",
      "**/__tests__/**",
      "**/__mocks__/**",
      "**/__fixtures__/**",
      "**/.eslintcache/**",
      "**/.eslintignore/**",
      "**/.eslintrc.js/**",
      "**/.eslintrc.json/**",
      "**/.eslintrc.yml/**",
      "**/.eslintrc.yaml/**",
      "**/.prettierignore/**",
      "**/.prettierrc.js/**",
      "**/.prettierrc.json/**",
      "**/.prettierrc.yml/**",
      "**/.prettierrc.yaml/**",
      "**/.stylelintrc.js/**",
      "**/.stylelintrc.json/**",
      "**/.stylelintrc.yml/**",
      "**/.stylelintrc.yaml/**",
      "**/.stylelintignore/**",
      "**/.editorconfig/**",
      "**/.git/**",
      "**/.github/**",
      "**/.gitlab/**",
      "**/.bitbucket/**",
      "**/.vscode/**",
      "**/.idea/**",
      "**/.vscode-test/**",
      ".css",
      ".less",
      ".scss",
      ".sass",
      ".styl",
      ".stylus",
      ".postcss",
      ".pcss",
      ".css.map",
    ],
    // 忽略 dist 和 node_modules 目录中的文件
  },
  {
    rules: {
      // "vue/no-unused-components": "off", // 关闭 Vue 组件未使用的规则
      // "vue/no-unused-vars": "off", // 关闭 Vue 变量未使用的规则
      // "vue/no-unused-properties": "off",// 关闭 Vue 属性未使用的规则
      // "vue/no-unused-refs": "off",// 关闭 Vue refs 未使用的规则
      // "vue/no-unused-template": "off",// 关闭 Vue 模板未使用的规则
      // "vue/no-unused-sFC-name": "off",// 关闭 Vue 单文件组件名称未使用的规则
      // "vue/no-unused-define-properties": "off",// 关闭 Vue defineProperties 未使用的规则
      "no-console": "warn", // 关闭 console.log 的规则 那些不想在生产环境中使用 console.log 的开发者可以将其设置为 "warn" 或 "error"，以便在代码中使用 console.log 时得到警告或错误提示。
      // "no-debugger": "off" // 关闭 debugger 的规则
      // semi: ['error', 'always'], // 要求或禁止使用分号代替 ASI（自动分号插入）"
    },
  },
  prettierRecommended,
]);
