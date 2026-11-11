<template>
  <div>
    <HeroSection />
    <main>
      <FeaturesSection />
      <VipSection />
      <DownloadSection />
      <AdBanner />
    </main>
  </div>
</template>

<script setup>
useHead({
  title: '生字笔顺 — 小学汉字书写练习 · 动态笔顺 · 拼音学习',
  meta: [
    {
      name: 'description',
      content:
        '生字笔顺：专为小学生设计的汉字学习 App。动态笔顺动画、三段式描红练习（描红→仿写→自由写）、课文听写、错字本、拼音学习（声母/韵母/声调表）。同步人教版小学语文教材，让孩子不只认识字，更能写好字。'
    },
    {
      name: 'keywords',
      content:
        '生字笔顺,汉字笔顺,笔顺动画,描红练习,小学生练字,拼音学习,声母韵母,课文听写,错字本,小学语文,人教版教材,汉字书写,儿童教育App,iOS教育应用'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: '生字笔顺',
        alternateName: 'ZiYouZhangFa',
        url: 'https://bishun.hehuoya.com',
        description:
          '专为小学生设计的汉字学习 App。动态笔顺动画、三段式描红练习、课文听写、错字本、拼音学习。同步人教版小学语文教材。',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'iOS 16.6+',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '120'
        },
        author: {
          '@type': 'Organization',
          name: '生字笔顺',
          url: 'https://bishun.hehuoya.com'
        },
        featureList: [
          '动态笔顺动画演示',
          '三段式描红练习（描红→仿写→自由写）',
          '课文听写（单字/词语模式）',
          '错字本自动收录',
          '拼音学习（声母/韵母/整体认读音节/声调表）',
          '人教版小学语文教材同步',
          '学习进度追踪'
        ]
      })
    }
  ]
})
</script>
