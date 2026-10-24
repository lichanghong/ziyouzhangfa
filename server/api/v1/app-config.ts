import type { H3Event } from 'h3'

const defaultConfig = {
  platform: 'ios',
  latestVersion: '1.0.0',
  minSupportedVersion: '1.0.0',
  downloadUrl: '',
  releaseNotes: '首发版本。',
  forcedUpdate: false,
  underReview: false
}

export default defineEventHandler(async (event: H3Event) => {
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*')

  // ESA Pages 环境：从 cloudflare env 读 KV
  const env = (event.context as any).cloudflare?.env || process.env
  const kv = env?.BISHUN_KV

  if (!kv) {
    // 本地开发或无 KV 绑定，返回默认值
    return defaultConfig
  }

  if (event.method === 'GET') {
    const value = await kv.get('appConfig', 'json')
    return value || defaultConfig
  }

  if (event.method === 'PUT') {
    const body = await readBody(event)
    if (body == null || typeof body.underReview !== 'boolean') {
      throw createError({ statusCode: 400, message: 'underReview (boolean) is required' })
    }

    const existing = (await kv.get('appConfig', 'json')) || defaultConfig
    const updated = { ...existing, underReview: body.underReview, updatedAt: new Date().toISOString() }
    await kv.put('appConfig', JSON.stringify(updated))
    return updated
  }

  throw createError({ statusCode: 405, message: 'Method not allowed' })
})
