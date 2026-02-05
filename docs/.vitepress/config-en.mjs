import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      { text: 'Blog', link: '/blog' }
    ],
    sidebar: {
      '/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' }
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
          text: 'Build Shells',
          items: [
            { text: 'certificate', link: '/android/certificate' },
          ]
        },
        {
          text: 'Blog',
          items: [
            { text: 'Blog Home', link: '/blog' },
            { text: 'Cordova 13', link: '/blog/v13' },
            { text: 'Cordova 12', link: '/blog/v12' },
            { text: 'Cordova 10', link: '/blog/v10' }
          ]
        },
      ],

    },


  }
})

