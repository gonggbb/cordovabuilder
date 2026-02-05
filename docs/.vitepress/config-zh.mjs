import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {

    nav: [
      { text: 'Home', link: '/zh' },
      { text: 'Examples', link: '/zh/markdown-examples' }
    ],
    sidebar: {
      '/zh/': [
        {
          text: '指南',
          items: [
            { text: '介绍', link: '/zh/guide/' },
            { text: '快速开始', link: '/zh/guide/getting-started' }
          ]
        },
        {
          text: '示例',
          items: [
            { text: 'Markdown 示例', link: '/zh/markdown-examples' },
            { text: '运行时 API 示例', link: '/zh/api-examples' }
          ]
        },
        {
          text: 'Blog',
          items: [
            { text: 'Cordova 13', link: '/blog/v13' },
            { text: 'Cordova 12', link: '/blog/v12' },
            { text: 'Cordova 10', link: '/blog/v10' }
          ]
        }
      ]
    },
  
  }
})