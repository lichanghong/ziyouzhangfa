const INK = '#202521'
const GUIDE = '#DCD5C7'
const JADE = '#237A68'
const DATA_BASE = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/'
const SIZE = 400

type HanziWriterModule = typeof import('hanzi-writer')
type HanziWriterClass = HanziWriterModule['default']

export type Writer = ReturnType<HanziWriterClass['create']>
export type WriterClass = HanziWriterClass

// hanzi-writer 按固定字盒 (x 0~1024, y -124~900) 居中，不看实际墨迹；
// 有些字（如「永」）墨迹在字盒内偏一侧，这里按墨迹包围盒重新居中
const BOX_CENTER = { x: 512, y: 388 }

type CharData = {
  strokes: string[]
  medians: number[][][]
}

function centerInk(data: CharData): CharData {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const path of data.strokes) {
    const nums = (path.match(/-?\d+(?:\.\d+)?/g) || []).map(Number)
    for (let i = 0; i + 1 < nums.length; i += 2) {
      if (nums[i]! < minX) minX = nums[i]!
      if (nums[i]! > maxX) maxX = nums[i]!
      if (nums[i + 1]! < minY) minY = nums[i + 1]!
      if (nums[i + 1]! > maxY) maxY = nums[i + 1]!
    }
  }
  const dx = BOX_CENTER.x - (minX + maxX) / 2
  const dy = BOX_CENTER.y - (minY + maxY) / 2
  // path 全为绝对坐标命令，数字按 x y 交替出现，可成对平移
  data.strokes = data.strokes.map((path) => {
    let i = 0
    return path.replace(/-?\d+(?:\.\d+)?/g, (n) => {
      const v = Number(n) + (i++ % 2 === 0 ? dx : dy)
      return String(Math.round(v * 100) / 100)
    })
  })
  data.medians = data.medians.map((stroke) =>
    stroke.map(([x, y]) => [x + dx, y + dy])
  )
  return data
}

export function charDataLoader(char: string, onComplete: (data: unknown) => void) {
  fetch(DATA_BASE + encodeURIComponent(char) + '.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('no data'))))
    .then((data: CharData) => onComplete(data ? centerInk(data) : null))
    .catch(() => onComplete(null))
}

export function writerOptions(extra: Record<string, unknown> = {}) {
  return {
    width: SIZE,
    height: SIZE,
    // 常规田字格字约占格宽 3/4，50/400 = 12.5% 内缩
    padding: 50,
    strokeColor: INK,
    outlineColor: GUIDE,
    highlightColor: JADE,
    highlightCompleteColor: null,
    showCharacter: false,
    showOutline: false,
    strokeAnimationSpeed: 1.1,
    delayBetweenStrokes: 300,
    charDataLoader,
    ...extra
  }
}

export async function loadHanziWriter(): Promise<HanziWriterClass> {
  return (await import('hanzi-writer')).default
}

export async function createWriter(
  host: HTMLElement,
  char: string,
  extra: Record<string, unknown> = {}
): Promise<Writer> {
  const HanziWriter = await loadHanziWriter()
  const writer = HanziWriter.create(host, char, writerOptions(extra))
  // hanzi-writer 生成的 SVG 只设 width/height 属性、没有 viewBox，
  // CSS 把元素拉到格子大小时内容并不缩放，仍按 400px 画布从左上角绘制，
  // 导致字偏右下；补上 viewBox 让笔画随格子缩放、保持居中
  host.querySelector('svg')?.setAttribute('viewBox', `0 0 ${SIZE} ${SIZE}`)
  return writer
}
