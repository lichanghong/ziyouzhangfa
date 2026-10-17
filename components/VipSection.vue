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
      <div class="vip-cta">
        <div class="vip-cta-title">VIP 会员在 App 内升级</div>
        <p class="vip-cta-desc">会员价格与订阅方式，以 App 内展示为准。</p>
        <a class="btn btn-primary btn-lg" :href="appConfig?.downloadUrl || '#download'">前往 App 升级 VIP</a>
      </div>
    </div>
    <p class="vip-fineprint">订阅通过 App Store 内购结算，可随时在系统设置中取消续订。</p>
  </section>
</template>

<script setup lang="ts">
import type { AppConfig } from '~/types/api'

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

const { data: appConfig } = await useFetch<AppConfig>('/api/v1/app-config', { method: 'POST' })
</script>
