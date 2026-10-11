import vipPlans from '~/server/data/vip-plans.json'

export default defineEventHandler((event) => apiJson(event, vipPlans))
