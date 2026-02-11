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
            { text: '什么是 CordovaBuilder', link: '/zh/what-is-cordovabuilder' },
            { text: '快速开始', link: '/zh/guide/getting-started' }
          ]
        },
        {
          text: '生产环境',
          items: [
            { text: 'Compose 构建', link: '/zh/production/compose' },
            { text: 'Cordova 10 构建', link: '/zh/production/version-v10' },
            { text: 'Cordova 12 构建', link: '/zh/production/version-v12' },
          ]
        },

        {
          text: '镜像 & 版本',
          items: [
            { text: 'Cordova 10', link: '/zh/blog/v10' },
            { text: 'Cordova 12', link: '/zh/blog/v12' },
            { text: 'Cordova 13', link: '/zh/blog/v13' },
          ]
        },
        {
          text: '插件',
          items: [
            { text: '官方插件', link: '/zh/plugins/official' },
            { text: '第三方插件', link: '/zh/plugins/third-party' },
          ]
        },

        {
          text: 'Android Development',
          items: [
            { text: '证书', link: '/zh/android/certificate' },
            { text: '签名', link: '/zh/android/signature' },
            { text: '证书升级', link: '/zh/android/certificate-upgrade-conversion' },
          ]
        },
        {
          text: '私有镜像仓库',
          items: [
            { text: '官方镜像 ', link: '/zh/register/hub' },
            { text: 'Harbor', link: '/zh/register/harbor' },
          ]
        },
      ]
    },

  }
})