import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    // nav: [
    // { text: 'Home', link: '/' },
    // { text: 'Images & Version', link: '/blog/v13' }
    // ],
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
            { text: 'Cordova 12 build', link: '/production/version-v12' },
          ]
        },
        {
          text: 'Android Development',
          items: [
            { text: 'certificate', link: '/android/certificate' },
            { text: 'signature', link: '/android/signature' },
            { text: 'certificate upgrade conversion', link: '/android/certificate-upgrade-conversion' },

          ]
        },

        {
          text: 'Images & Version',
          items: [
            // { text: '版本介绍', link: '/blog' },
            { text: 'Cordova 13', link: '/blog/v13' },
            { text: 'Cordova 12', link: '/blog/v12' },
            { text: 'Cordova 10', link: '/blog/v10' }
          ]
        },
      ],

    },


  }
})

