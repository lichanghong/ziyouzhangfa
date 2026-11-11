<template>
  <section class="section faq-section" id="faq">
    <div class="faq-header">
      <span class="section-tag">常见问题</span>
      <h2>家长最关心的问题</h2>
      <p class="section-sub">关于生字笔顺，您可能想知道这些</p>
    </div>
    <div class="faq-list">
      <div v-for="(item, i) in faqs" :key="i" class="faq-item" :class="{ open: openIndex === i }">
        <button class="faq-question" @click="toggleFaq(i)" :aria-expanded="openIndex === i">
          <span>{{ item.q }}</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div class="faq-answer">
          <p>{{ item.a }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const openIndex = ref(-1)

function toggleFaq(i) {
  openIndex.value = openIndex.value === i ? -1 : i
}

const faqs = [
  {
    q: '生字笔顺适合几年级的孩子？',
    a: '适合小学 1-6 年级学生。App 同步人教版小学语文教材，按年级、学期、单元组织学习内容，孩子可以跟着课本进度练习。'
  },
  {
    q: 'App 是免费的吗？',
    a: '基础功能完全免费，包括笔顺动画、描红练习、拼音学习等。VIP 会员可解锁全部课本单元和去广告体验，订阅通过 App Store 内购结算，可随时取消。'
  },
  {
    q: '需要联网才能使用吗？',
    a: '首次查看某个汉字时需要联网加载笔顺数据，加载后会自动缓存到本机，后续离线也能使用。拼音学习的音频同样会缓存。'
  },
  {
    q: '孩子的数据安全吗？',
    a: '所有学习数据（练习记录、错字本、学习进度）仅保存在孩子自己的设备上，不上传任何服务器。我们未部署收集用户信息的服务器，从源头保护隐私。'
  },
  {
    q: '支持 iPad 吗？',
    a: '支持 iPhone 和 iPad。iPad 大屏下米字格更大，孩子书写体验更好。需要 iOS 16.6 或更高版本。'
  },
  {
    q: '拼音学习包含哪些内容？',
    a: '包含声母（23 个）、韵母（24 个）、整体认读音节（16 个）和声调表（单韵母、复韵母、鼻韵母的四声变化）。点击卡片即可播放标准发音，帮助孩子掌握拼音基础。'
  }
]
</script>

<style scoped>
.faq-section {
  background: var(--paper);
}

.faq-header {
  text-align: center;
  margin-bottom: 40px;
}

.faq-header h2 {
  font-family: var(--font-kai);
  font-size: 28px;
  color: var(--ink);
  margin: 12px 0 8px;
  letter-spacing: 1px;
}

.section-sub {
  font-size: 15px;
  color: var(--ink2);
}

.faq-list {
  max-width: 720px;
  margin: 0 auto;
}

.faq-item {
  background: var(--surface);
  border-radius: 12px;
  margin-bottom: 12px;
  border: 1px solid var(--line);
  overflow: hidden;
  transition: box-shadow 0.2s ease;
}

.faq-item:hover {
  box-shadow: var(--shadow-card);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink);
  font-family: inherit;
  line-height: 1.5;
}

.faq-question:hover {
  color: var(--jade);
}

.faq-chevron {
  flex-shrink: 0;
  transition: transform 0.25s ease;
  color: var(--ink2);
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item.open .faq-answer {
  max-height: 200px;
}

.faq-answer p {
  padding: 0 20px 18px;
  margin: 0;
  font-size: 14px;
  color: var(--ink2);
  line-height: 1.7;
}

@media (max-width: 720px) {
  .faq-header h2 {
    font-size: 22px;
  }

  .faq-question {
    padding: 14px 16px;
    font-size: 14px;
  }

  .faq-answer p {
    padding: 0 16px 14px;
    font-size: 13px;
  }
}
</style>
