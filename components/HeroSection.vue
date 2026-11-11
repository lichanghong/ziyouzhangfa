<template>
  <header class="hero" id="top">
    <div class="hero-copy">
      <span class="hero-tag">小学语文 · 汉字书写练习</span>
      <h1>一笔一画，<br>皆有章法</h1>
      <p class="hero-sub">「生字笔顺」把动态笔顺、描红练习、课文听写和错字本装进一个 App——不只认识字，更能写好字。</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="https://apps.apple.com/cn/app/%E7%94%9F%E5%AD%97%E7%AC%94%E9%A1%BA/id6829591837" target="_blank" rel="noopener">App Store 下载</a>
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
        <span class="hero-stage-label">动态笔顺 · 点下方字可换</span>
        <div class="mini-grid mini-grid-a" aria-hidden="true">
          <span>描</span>
        </div>
        <div class="mini-grid mini-grid-b" aria-hidden="true">
          <span>听</span>
        </div>
      </MiziGrid>
      <label class="hero-caption-wrap" for="hero-char">
        <input
          id="hero-char"
          ref="inputEl"
          v-model="inputValue"
          class="hero-caption kai"
          type="text"
          placeholder="字"
          aria-label="输入要演示的汉字"
          @input="onInput"
          @compositionend="onInput"
          @keydown.enter="onEnter"
        />
        <span class="hero-caption-edit" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
        </span>
      </label>
      <div class="hero-status">{{ statusText }}</div>
    </div>
  </header>
</template>

<script setup lang="ts">
const host = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const inputValue = ref('永')
const currentChar = ref('永')
const statusText = ref('正在加载笔顺数据…')

let writer: Writer | null = null
let reqSeq = 0
let disposed = false
let reducedMotion = false

async function setChar(char: string) {
  if (char === currentChar.value && writer) return
  currentChar.value = char
  inputValue.value = char
  writer = null
  if (host.value) host.value.innerHTML = ''
  statusText.value = `正在加载「${char}」的笔顺数据…`

  const seq = ++reqSeq
  const HanziWriter = await loadHanziWriter()
  try {
    const data = (await HanziWriter.loadCharacterData(char, { charDataLoader })) as {
      strokes: unknown[]
    } | null
    if (disposed || seq !== reqSeq) return
    if (!data) throw new Error('no data')
    statusText.value = reducedMotion
      ? `共 ${data.strokes.length} 笔`
      : `共 ${data.strokes.length} 笔 · 循环演示中`
    if (!host.value) return
    writer = await createWriter(host.value, char, {
      showOutline: true,
      delayBetweenLoops: 1200
    })
    if (disposed || seq !== reqSeq) return
    if (reducedMotion) {
      writer.showCharacter()
    } else {
      writer.hideCharacter()
      writer.loopCharacterAnimation().catch(() => {})
    }
  } catch {
    if (disposed || seq !== reqSeq) return
    statusText.value = `暂无「${char}」的笔顺数据，换个字试试`
  }
}

function onInput(e: Event) {
  const el = inputEl.value
  if (!el) return
  const matches = el.value.match(/\p{Script=Han}/gu)
  if (matches) {
    setChar(matches[matches.length - 1]!)
  } else if (!(e as InputEvent).isComposing) {
    inputValue.value = ''
  }
}

function onEnter() {
  inputEl.value?.blur()
}

onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  setChar('永')
})

onBeforeUnmount(() => {
  disposed = true
  reqSeq++
})
</script>
