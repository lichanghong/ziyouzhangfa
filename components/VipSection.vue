<template>
  <section id="vip" class="section">
    <div class="section-head">
      <h2>升级 VIP 会员</h2>
      <p>一次订阅，解锁全部练字能力。</p>
    </div>
    <div class="vip-wrap">
      <ul class="benefits">
        <li v-for="b in benefits" :key="b"><span class="check">✓</span>{{ b }}</li>
      </ul>
      <div v-if="plansData" class="plans">
        <div
          v-for="plan in plansData.plans"
          :key="plan.id"
          class="plan"
          :class="{ 'plan-best': plan.badge }"
        >
          <span v-if="plan.badge" class="plan-badge">{{ plan.badge }}</span>
          <div class="plan-name">{{ plan.name }}</div>
          <div class="plan-price">¥{{ plan.price }}<span>/{{ plan.periodUnit }}</span></div>
          <div class="plan-original">原价 ¥{{ plan.originalPrice }}/{{ plan.periodUnit }}</div>
        </div>
      </div>
    </div>
    <p class="vip-fineprint">{{ plansData?.note ?? '订阅通过 App Store 内购结算，可随时在系统设置中取消续订；价格以 App 内展示为准。' }}</p>
  </section>
</template>

<script setup lang="ts">
import type { VipPlans } from '~/types/api'

const benefits = [
  '全部课本随心学',
  '描红练习不限次',
  '字帖导出和打印',
  '高级朗读功能',
  '听写功能抢先体验',
  '错字本云端同步',
  '专属练字报告',
  '练字全程无广告'
]

const { data: plansData } = await useFetch<VipPlans>('/api/v1/vip/plans')
</script>
