import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Blog', link: '/blog/update-logs' }
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            // what-is-cordovabuilder
            { text: 'What is CordovaBuilder', link: '/what-is-cordovabuilder' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        },
        {
          text: 'Production',
          items: [
            { text: 'Compose Build', link: '/production/compose' },
            { text: 'Cordova 10 Build', link: '/production/version-v10' },
            { text: 'Cordova 12 Build', link: '/production/version-v12' },
          ]
        },

        {
          text: 'Images & Version',
          items: [
            // { text: '版本介绍', link: '/blog' },
            { text: 'Images Cordova 10', link: '/blog/v10' },
            { text: 'Images Cordova 12', link: '/blog/v12' },
            { text: 'Images Cordova 13', link: '/blog/v13' },
          ]
        },
        {
          text: 'Plugins',
          items: [
            { text: 'Official Plugins', link: '/plugins/official' },
            { text: 'Third-party Plugins', link: '/plugins/third-party' },
          ]
        },
        {
          text: 'Tools',
          items: [
            { text: 'ADB & Scrcpy Screen Recording', link: '/tools/adb' },
            { text: 'Chrome Devtools', link: '/tools/chrome' },
            { text: 'LocalSend Wifi Transmission', link: '/tools/localSend' },
          ]
        },
        {
          text: 'Android Development',
          items: [
            { text: 'Certificate', link: '/android/certificate' },
            { text: 'Signature', link: '/android/signature' },
            { text: 'Certificate Upgrade Conversion', link: '/android/certificate-upgrade-conversion' },

          ]
        },
        {
          text: 'Private Registry',
          items: [
            { text: 'Official Registry', link: '/register/hub' },
            { text: 'Harbor', link: '/register/harbor' },
          ]
        },
      ],

    },


  }
})

