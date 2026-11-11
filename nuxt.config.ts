export default defineNuxtConfig({
  compatibilityDate: '2026-10-25',
  devtools: { enabled: true },
  typescript: {
    typeCheck: false
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '生字笔顺 — 小学汉字书写练习 · 动态笔顺 · 拼音学习',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '生字笔顺：专为小学生设计的汉字学习 App。动态笔顺动画、三段式描红练习（描红→仿写→自由写）、课文听写、错字本、拼音学习（声母/韵母/声调表）。同步人教版小学语文教材，让孩子不只认识字，更能写好字。'
        },
        {
          name: 'keywords',
          content:
            '生字笔顺,汉字笔顺,笔顺动画,描红练习,小学生练字,拼音学习,声母韵母,课文听写,错字本,小学语文,人教版教材,汉字书写,儿童教育App,iOS教育应用'
        },
        { name: 'author', content: '生字笔顺' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#F7F2E8' },
        { property: 'og:title', content: '生字笔顺 - 小学生汉字学习 App' },
        {
          property: 'og:description',
          content: '动态笔顺动画、三段式描红练习、课文听写、错字本、拼音学习。同步人教版小学语文教材，让孩子不只认识字，更能写好字。'
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:site_name', content: '生字笔顺' },
        { property: 'og:url', content: 'https://bishun.hehuoya.com' },
        { property: 'og:image', content: 'https://bishun.hehuoya.com/og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: '生字笔顺 App 分享图' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '生字笔顺 - 小学生汉字学习 App' },
        {
          name: 'twitter:description',
          content: '动态笔顺动画、三段式描红练习、课文听写、错字本、拼音学习。同步人教版小学语文教材。'
        },
        { name: 'twitter:image', content: 'https://bishun.hehuoya.com/og.jpg' },
        { name: 'apple-itunes-app', content: 'app-id=6829591837, app-argument=https://bishun.hehuoya.com' },
        // 微信专用 meta 标签
        { name: 'wx:app_id', content: '' },
        { property: 'wx:title', content: '生字笔顺 - 小学生汉字学习 App' },
        { property: 'wx:description', content: '动态笔顺动画、三段式描红练习、课文听写、错字本、拼音学习。同步人教版小学语文教材。' },
        { property: 'wx:image', content: 'https://bishun.hehuoya.com/og.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://bishun.hehuoya.com' }
      ]
    }
  },
  css: ['~/assets/css/main.css']
})
