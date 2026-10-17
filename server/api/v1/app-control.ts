import appControl from '~/server/data/app-control.json'

export default defineEventHandler((event) => apiJson(event, appControl))
