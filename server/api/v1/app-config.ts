import type { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  setResponseHeader(event, 'Content-Type', 'application/json')
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*')

  const config = useRuntimeConfig()

  return {
    platform: 'ios',
    latestVersion: '1.0.0',
    minSupportedVersion: '1.0.0',
    downloadUrl: '',
    releaseNotes: '首发版本。',
    forcedUpdate: false,
    underReview: config.public.underReview
  }
})
