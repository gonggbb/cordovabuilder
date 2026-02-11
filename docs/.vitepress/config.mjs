import { defineConfig } from 'vitepress'
import configCommon from './config-common.mjs'
import configZh from './config-zh.mjs'
import configEn from './config-en.mjs'
console.log("🚀 ~ configEn:", configEn)
// https://vitepress.dev/reference/site-config
export default defineConfig({
  ...configCommon,
  locales: {
    root: { label: 'English', lang: 'en', ...configEn },
    zh: { label: '简体中文', lang: 'zh-CN', link: '/zh/', ...configZh }
  },
})
