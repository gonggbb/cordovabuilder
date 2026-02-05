import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {

    // nav: [
    //   { text: 'Home', link: '/zh' },
    //   { text: 'Examples', link: '/zh/markdown-examples' }
    // ],
    sidebar: {
      '/zh/': [
        {
          text: '指南',
          items: [
            // what-is-cordovabuilder
            { text: '什么是 CordovaBuilder', link: '/what-is-cordovabuilder' },
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        },
        {
          text: 'Android Development',
          items: [
            { text: '证书', link: '/android/certificate' },
            { text: '签名', link: '/android/signature' },
            { text: '证书升级', link: '/android/certificate-upgrade-conversion' },

          ]
        },
        {
          text: 'Images & Version',
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