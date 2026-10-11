import type { H3Event } from 'h3'

export function apiJson<T>(event: H3Event, data: T): T {
  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'public, max-age=300'
  })
  return data
}
