const INK = '#202521'
const GUIDE = '#DCD5C7'
const JADE = '#237A68'
const DATA_BASE = 'https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/'

type HanziWriterModule = typeof import('hanzi-writer')
type HanziWriterClass = HanziWriterModule['default']

export type Writer = ReturnType<HanziWriterClass['create']>
export type WriterClass = HanziWriterClass

export function charDataLoader(char: string, onComplete: (data: unknown) => void) {
  fetch(DATA_BASE + encodeURIComponent(char) + '.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('no data'))))
    .then(onComplete)
    .catch(() => onComplete(null))
}

export function writerOptions(extra: Record<string, unknown> = {}) {
  return {
    width: 400,
    height: 400,
    padding: 0,
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
