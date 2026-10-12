<template>
  <section id="demo" class="section">
    <div class="section-head">
      <h2>动态笔顺，亲手试试</h2>
      <p>输入任意汉字，看它一笔一笔写出来；点「描红练习」还可以跟着写。<br>官网演示与 App 内使用同一份开源笔顺数据。</p>
    </div>
    <div class="playground">
      <div class="pg-main">
        <MiziGrid class="demo-grid">
          <div ref="host" class="writer-host"></div>
        </MiziGrid>
        <div class="pg-side">
          <div class="pg-char kai">{{ currentChar }}</div>
          <div class="pg-strokes">{{ strokesText }}</div>
          <div class="pg-status" :class="statusKind ? 's-' + statusKind : ''">{{ statusText }}</div>
          <p class="pg-tip">「描红练习」会高亮下一笔，用鼠标或手指照着写一笔；<br>在触屏设备上体验更佳。</p>
        </div>
      </div>
      <div class="pg-controls">
        <div class="pg-input-wrap">
          <input
            id="char-input"
            ref="inputEl"
            v-model="inputValue"
            type="text"
            maxlength="1"
            placeholder="输入一个汉字"
            aria-label="输入要演示的汉字"
            @input="onInput"
            @keydown.enter="onEnter"
          />
          <div class="chips">
            <button
              v-for="c in CHIPS"
              :key="c"
              type="button"
              :class="{ active: c === currentChar }"
              @click="setChar(c)"
            >
              {{ c }}
            </button>
          </div>
        </div>
        <div class="pg-buttons">
          <button class="btn btn-primary" type="button" @click="play">播放笔顺</button>
          <button class="btn btn-outline" type="button" @click="trace">描红练习</button>
          <button class="btn btn-ghost" type="button" @click="reset">重来</button>
        </div>
      </div>
      <p class="pg-note">笔顺数据来自开源项目 hanzi-writer-data · 部分生僻字暂无数据</p>
    </div>
  </section>
</template>

<script setup lang="ts">
const CHIPS = ['永', '一', '二', '三', '十', '木', '大', '人', '口', '中', '日']

const host = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLInputElement | null>(null)
const inputValue = ref('永')
const currentChar = ref('永')
const strokesText = ref('—')
const statusText = ref('正在加载笔顺数据…')
const statusKind = ref<'' | 'ok' | 'bad'>('')

let writer: Writer | null = null
let mode: 'idle' | 'loading' | 'play' | 'quiz' = 'idle'
let reqSeq = 0
let disposed = false

function setStatus(text: string, kind: '' | 'ok' | 'bad' = '') {
  statusText.value = text
  statusKind.value = kind
}

async function setChar(char: string) {
  currentChar.value = char
  inputValue.value = char
  mode = 'loading'
  writer = null
  if (host.value) host.value.innerHTML = ''
  strokesText.value = '—'
  setStatus(`正在加载「${char}」的笔顺数据…`)

  const seq = ++reqSeq
  const HanziWriter = await loadHanziWriter()
  try {
    const data = (await HanziWriter.loadCharacterData(char, { charDataLoader })) as {
      strokes: unknown[]
    } | null
    if (disposed || seq !== reqSeq) return
    if (!data) throw new Error('no data')
    strokesText.value = `共 ${data.strokes.length} 笔`
    if (!host.value) return
    writer = await createWriter(host.value, char, { showOutline: true })
    if (disposed || seq !== reqSeq) return
    play()
  } catch {
    if (disposed || seq !== reqSeq) return
    mode = 'idle'
    setStatus(`暂无「${char}」的笔顺数据，换个字试试`, 'bad')
  }
}

function play() {
  if (!writer) return
  if (mode === 'quiz') writer.cancelQuiz()
  mode = 'play'
  setStatus('笔顺演示中…')
  writer.hideCharacter()
  writer
    .animateCharacter({
      onComplete: () => {
        if (mode === 'play') {
          mode = 'idle'
          setStatus('演示完毕，点「描红练习」亲手写一写')
        }
      }
    })
    .catch(() => {})
}

function trace() {
  if (!writer) return
  mode = 'quiz'
  setStatus('按高亮的下一笔，在格子里跟着写')
  writer.hideCharacter()
  writer.showOutline()
  writer
    .quiz({
      onCorrectStroke: (data) => {
        setStatus(`第 ${data.strokeNum + 1} 笔，写得对`, 'ok')
      },
      onMistake: (data) => {
        setStatus(`第 ${data.strokeNum + 1} 笔再想想（已提示 ${data.mistakesOnStroke} 次）`, 'bad')
      },
      onComplete: (data) => {
        mode = 'idle'
        if (data.totalMistakes === 0) {
          setStatus('全部正确，这个字你已经会写了！', 'ok')
        } else {
          setStatus(`完成描红，共 ${data.totalMistakes} 处提示，再练一次？`)
        }
      }
    })
    .catch(() => {})
}

function reset() {
  setChar(currentChar.value)
}

function onInput() {
  const el = inputEl.value
  if (!el) return
  const matches = el.value.match(/[一-鿿]/g)
  if (matches) {
    setChar(matches[matches.length - 1]!)
  } else if (el.value.trim() === '') {
    el.value = currentChar.value
  }
}

function onEnter() {
  inputEl.value?.blur()
}

onMounted(() => {
  setChar('永')
})

onBeforeUnmount(() => {
  disposed = true
  reqSeq++
})
</script>
