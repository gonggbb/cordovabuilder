import { defineConfig } from 'vitepress'
// import VersionTable from './components/VersionTable.vue'
// import vue from '@vitejs/plugin-vue'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  //  vite: {
  //   plugins: [vue()] // 正确配置插件
  // },
  // enhanceApp({ app }) {
  //   app.component('VersionTable', VersionTable)
  // },
  // 将仓库名作为 base，注意前后斜杠
  base: '/cordovabuilder/',
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
    ['meta', { property: 'og:url', content: 'https://github.com/gonggbb/cordovabuilder' }],
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
      { icon: 'github', link: 'https://github.com/gonggbb/cordovabuilder' }
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

    editLink: {
      pattern: 'https://github.com/gonggbb/cordovabuilder/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: '版权所有 © 2025-至今 cordovabuilder'
    },

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    outline: {
      label: '页面导航'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容'


  }
})