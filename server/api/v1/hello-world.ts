import helloWorld from '~/server/data/hello-world.json'

export default defineEventHandler((event) => apiJson(event, helloWorld))
