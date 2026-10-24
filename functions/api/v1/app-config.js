const defaultConfig = {
  platform: 'ios',
  latestVersion: '1.0.0',
  minSupportedVersion: '1.0.0',
  downloadUrl: '',
  releaseNotes: '首发版本。',
  forcedUpdate: false,
  underReview: false
}

export async function onRequestGet(context) {
  const kv = context.env.BISHUN_KV
  if (!kv) return jsonResponse(defaultConfig)
  const value = await kv.get('appConfig', 'json')
  return jsonResponse(value || defaultConfig)
}

export async function onRequestPut(context) {
  const kv = context.env.BISHUN_KV
  if (!kv) return jsonResponse({ error: 'KV not bound' }, 500)

  const body = await context.request.json()
  if (body == null || typeof body.underReview !== 'boolean') {
    return jsonResponse({ error: 'underReview (boolean) is required' }, 400)
  }

  const existing = (await kv.get('appConfig', 'json')) || defaultConfig
  const updated = { ...existing, underReview: body.underReview, updatedAt: new Date().toISOString() }
  await kv.put('appConfig', JSON.stringify(updated))
  return jsonResponse(updated)
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
