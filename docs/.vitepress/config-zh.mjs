import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {

    nav: [
      // { text: 'Home', link: '/zh' },
      { text: '博客', link: '/zh/blog/update-logs' }
    ],
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
            { text: 'Cordova-Android 9 Build', link: '/production/version-v9' },
            { text: 'Cordova-Android 12 Build', link: '/production/version-v12' },
          ]
        },

        {
          text: '镜像 & 版本',
          items: [
            { text: 'Images Cordova-Android 9', link: '/blog/v9' },
            { text: 'Images Cordova-Android 10', link: '/blog/v10' },
            { text: 'Images Cordova-Android 11', link: '/blog/v11' },
            { text: 'Images Cordova-Android 12', link: '/blog/v12' },
            { text: 'Images Cordova-Android 13', link: '/blog/v13' },
            { text: 'Images Cordova-Android 15', link: '/blog/v15' },
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
          text: 'Tools',
          items: [
            { text: 'ADB & Scrcpy录屏', link: '/zh/tools/adb' },
            { text: 'Chrome 调试', link: '/zh/tools/chrome' },
            { text: 'LocalSend Wifi 传输', link: '/zh/tools/localSend' },
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
