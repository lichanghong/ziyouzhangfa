export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: false
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      title: '生字笔顺 — 小学汉字书写练习 · 动态笔顺',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            '生字笔顺：把动态笔顺、描红练习、课文听写和错字本装进一个 App。每一笔按顺序演示，描红、仿写、对照三段式练字，错的字自动进错字本。'
        },
        { property: 'og:title', content: '生字笔顺 — 一笔一画，皆有章法' },
        { property: 'og:description', content: '动态笔顺 · 三段式描红 · 课文听写 · 错字本，让孩子不只认识字，更能写好字。' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#F7F2E8' }
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/api/v1/app-config': { cors: true },
    '/api/v1/hello-world': { prerender: true }
  }
})
