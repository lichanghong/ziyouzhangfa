<template>
  <section id="features" class="section">
    <div class="section-head">
      <h2>让练字这件事，有条有理</h2>
      <p>从「看清楚怎么写」到「离开范字也会写」，每一步都有章法。</p>
    </div>
    <div class="features-grid">
      <div v-for="f in features" :key="f.title" class="feature-card">
        <span class="feature-glyph kai" :class="f.glyphClass">{{ f.glyph }}</span>
        <h3>{{ f.title }}</h3>
        <p>{{ f.desc }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    glyph: '顺',
    glyphClass: 'g-jade',
    title: '动态笔顺演示',
    desc: '每一笔按顺序高亮演示，速度可调、可循环。笔画与范字同源，动画与字形完全重合。'
  },
  {
    glyph: '描',
    glyphClass: 'g-blue',
    title: '三段式描红',
    desc: '描红、仿写、对照，一步一步脱离范字；对照过关，才算真正掌握这个字。'
  },
  {
    glyph: '听',
    glyphClass: 'g-gold',
    title: '课文听写',
    desc: '按课本字词报读，写完自动批改笔顺，错的字自动收进错字本。'
  },
  {
    glyph: '错',
    glyphClass: 'g-cinnabar',
    title: '错字本',
    desc: '待订正、复习中、已掌握三档管理，专治「总写错的那几个字」。'
  },
  {
    glyph: '课',
    glyphClass: 'g-jade',
    title: '课本同步',
    desc: '识字表、词语表跟着课本走（首发一年级上册，更多教材陆续更新）。'
  },
  {
    glyph: '报',
    glyphClass: 'g-gold',
    title: '练字报告',
    desc: '连续学习打卡、掌握率统计，孩子的进步看得见。'
  }
]
</script>
