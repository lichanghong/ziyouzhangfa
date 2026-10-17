import appConfig from '~/server/data/app-config.json'

export default defineEventHandler((event) => apiJson(event, appConfig))
