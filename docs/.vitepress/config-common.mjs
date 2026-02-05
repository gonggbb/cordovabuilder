import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "cordovabuilder",
  description: "cordovabuilder",
  head: [
    // [
    //   'link',
    //   { rel: 'icon', type: 'image/svg+xml', href: '/vitepress-logo-mini.svg' }
    // ],

    [
      'link',
      { rel: 'icon', type: 'image/png', href: '/image.png' }
    ],
    // og:type: 内容类型（如网站、文章）。
    // og:site_name: 站点名称。
    // og:image: 分享时显示的缩略图。
    // og:url: 页面链接。
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'cordovabuilder' }],
    [
      'meta',
      {
        property: 'og:image',
        // content: 'https://vitepress.dev/vitepress-og.jpg'
      }
    ],
    ['meta', { property: 'og:url', content: 'https://vitepress.dev/' }],
    // 加载第三方统计脚本（如 Fathom Analytics）。
    // defer: 脚本延迟加载，不影响页面渲染。
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'AZBRSFGG',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],
  themeConfig: {
    logo: {
      light: '/image.png',      // 浅色模式显示
      dark: '/image.png',  // 深色模式显示
      alt: '',
    },
    // 隐藏右侧站点标题（当 Logo 已包含文字时）
    // siteTitle: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gonggbb/docker-cordovabuilder' }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          }
        },

      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})