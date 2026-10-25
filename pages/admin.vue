<template>
  <div class="admin-page">
    <div class="admin-card">
      <div class="admin-header">
        <h1>生字笔顺 · 控制台</h1>
        <p class="subtitle">App 全局配置管理</p>
      </div>

      <div class="control-section">
        <div class="control-row">
          <div class="control-info">
            <div class="control-label">送审模式</div>
            <div class="control-desc">
              开启后 App 将处于<strong>非上线阶段</strong>，不展示广告
            </div>
          </div>
          <div class="status-badge" :class="underReview ? 'is-review' : 'is-live'">
            {{ underReview ? '开启' : '关闭' }}
          </div>
        </div>

        <div class="status-bar">
          <span class="status-dot" :class="underReview ? 'is-review' : 'is-live'" />
          <span class="status-text">
            {{ underReview ? '非上线阶段 — 广告不展示' : '已上线 — 广告正常展示' }}
          </span>
        </div>
      </div>

      <div class="help-section">
        <div class="help-title">如何切换状态</div>
        <ol class="help-steps">
          <li>编辑 <code>public/api/v1/app-config.json</code></li>
          <li>把 <code>"underReview"</code> 改为 <code>{{ underReview ? 'false' : 'true' }}</code></li>
          <li>提交并推送代码，ESA 自动部署后生效</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const underReview = ref(false)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await $fetch<{ underReview: boolean }>('/api/v1/app-config.json')
    underReview.value = res.underReview
  } catch (e) {
    error.value = '加载状态失败'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue', sans-serif;
  padding: 20px;
}

.admin-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
}

.admin-header h1 {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 4px;
}

.subtitle {
  font-size: 14px;
  color: #999;
  margin: 0 0 32px;
}

.control-section {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.control-info {
  flex: 1;
}

.control-label {
  font-size: 16px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.control-desc {
  font-size: 13px;
  color: #999;
  line-height: 1.4;
}

.control-desc strong {
  color: #666;
  font-weight: 500;
}

.status-badge {
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  flex-shrink: 0;
}

.status-badge.is-live {
  background: #e8f8ee;
  color: #2d8a4e;
}

.status-badge.is-review {
  background: #fff4e5;
  color: #d48806;
}

.status-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.is-live {
  background: #4cd964;
}

.status-dot.is-review {
  background: #ff9500;
}

.status-text {
  font-size: 13px;
  color: #666;
}

.help-section {
  margin-top: 24px;
  padding: 16px 20px;
  background: #f9f9f9;
  border-radius: 12px;
}

.help-title {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.help-steps {
  margin: 0;
  padding-left: 20px;
  font-size: 13px;
  color: #666;
  line-height: 2;
}

.help-steps code {
  background: #eee;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
  color: #333;
}

.error-msg {
  color: #ff3b30;
  font-size: 13px;
  margin-top: 16px;
}
</style>
