// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

/**
 * printWidth	100	每行最大字符数为 100，超过时会自动换行。
tabWidth	2	缩进宽度为 2 个空格。
useTabs	false	使用空格而非制表符进行缩进。
semi	true	在语句末尾添加分号。
singleQuote	true	字符串使用单引号 ' 而非双引号 "。
quoteProps	"as-needed"	对象属性仅在必要时才加引号。
jsxSingleQuote	false	JSX 中使用双引号而非单引号。
trailingComma	"es5"	在多行对象或数组的最后一个元素后添加逗号（兼容 ES5）。
bracketSpacing	true	对象字面量的大括号 {} 内部添加空格（如 { foo: bar }）。
bracketSameLine	false	多行 HTML 元素的 > 不放在最后一行。
arrowParens	"always"	箭头函数参数始终用括号包裹（如 (a) => {}）。
endOfLine	"lf"	换行符使用 LF（Unix/Linux 风格）。
vueIndentScriptAndStyle	true	在 .vue 文件中对 <script> 和 <style> 标签内容进行缩进。
singleAttributePerLine	false	HTML 标签的多个属性可以写在同一行。
htmlWhitespaceSensitivity	"css"	HTML 中的空白字符处理方式遵循 CSS 规则。
overrides	[...]	针对特定文件类型（如 JSON）应用不同的解析器。
 */
const config = {
  printWidth: 100, // 一行的最大长度，超过这个长度 Prettier 会自动换行
  tabWidth: 2, // 每个缩进级别的空格数
  useTabs: false, // 是否使用制表符进行缩进，默认为 false，表示使用空格
  semi: true, //
  singleQuote: false, // 是否使用单引号，默认为 false，表示使用双引号
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "es5",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  vueIndentScriptAndStyle: true,
  singleAttributePerLine: false,
  htmlWhitespaceSensitivity: "css",
  overrides: [
    {
      files: "*.json",
      options: {
        parser: "json",
      },
    },
  ],
};

export default config;
