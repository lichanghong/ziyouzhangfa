/**
 * ESA 边缘函数：app-config API
 * 
 * 绑定 KV Namespace：BISHUN_KV（变量名 BISHUN_KV）
 * 绑定函数变量：underReview
 * 
 * 路由：GET /api/v1/app-config
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname !== '/api/v1/app-config') {
      return new Response('Not Found', { status: 404 })
    }

    if (request.method !== 'GET') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    // 优先从 KV 读取完整配置，否则用函数变量
    let underReview = false
    if (env.BISHUN_KV) {
      const stored = await env.BISHUN_KV.get('appConfig', 'json')
      if (stored && typeof stored.underReview === 'boolean') {
        underReview = stored.underReview
      }
    } else {
      underReview = env.underReview === '1' || env.underReview === 'true'
    }

    const config = {
      platform: 'ios',
      latestVersion: '1.0.0',
      minSupportedVersion: '1.0.0',
      downloadUrl: '',
      releaseNotes: '首发版本。',
      forcedUpdate: false,
      underReview
    }

    return new Response(JSON.stringify(config), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
}
