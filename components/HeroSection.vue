<template>
  <header class="hero" id="top">
    <div class="hero-copy">
      <span class="hero-tag">小学语文 · 汉字书写练习</span>
      <h1>一笔一画，<br>皆有章法</h1>
      <p class="hero-sub">「生字笔顺」把动态笔顺、描红练习、课文听写和错字本装进一个 App——不只认识字，更能写好字。</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="#download">App Store 下载</a>
        <a class="btn btn-outline" href="#demo">在线体验笔顺</a>
      </div>
      <ul class="hero-stats">
        <li><strong>9000+</strong><span>汉字动态笔顺</span></li>
        <li><strong>三段式</strong><span>描红 · 仿写 · 对照</span></li>
        <li><strong>无广告</strong><span>让孩子专心练字</span></li>
      </ul>
    </div>
    <div class="hero-stage">
      <MiziGrid class="hero-grid">
        <div ref="host" class="writer-host"></div>
        <span class="hero-caption">{{ caption }}</span>
      </MiziGrid>
      <div class="mini-grid mini-grid-a" aria-hidden="true">
        <span>描</span>
      </div>
      <div class="mini-grid mini-grid-b" aria-hidden="true">
        <span>听</span>
      </div>
      <span class="hero-stage-label">动态笔顺 · 正在演示</span>
    </div>
  </header>
</template>

<script setup lang="ts">
const HERO_CHARS = ['字', '有', '章', '法']

const host = ref<HTMLElement | null>(null)
const caption = ref('字')

let heroIndex = 0
let timer: ReturnType<typeof setTimeout> | null = null
let disposed = false
let reducedMotion = false

async function playHero() {
  if (disposed || !host.value) return
  const char = HERO_CHARS[heroIndex % HERO_CHARS.length]!
  heroIndex++
  caption.value = char
  host.value.innerHTML = ''

  const HanziWriter = await loadHanziWriter()
  if (disposed || !host.value) return
  const writer = HanziWriter.create(
    host.value,
    char,
    writerOptions({
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 340
    })
  )

  if (reducedMotion) {
    writer.showCharacter()
    return
  }

  const next = () => {
    if (!disposed) timer = setTimeout(playHero, 1500)
  }
  writer.animateCharacter({ onComplete: next }).catch(next)
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  playHero()
})

onBeforeUnmount(() => {
  disposed = true
  if (timer) clearTimeout(timer)
})
</script>
