<template>
  <div class="admin-page">
    <div class="admin-card">
      <div class="admin-header">
        <h1>生字笔顺 · 控制台</h1>
        <p class="subtitle">App 全局配置管理</p>
      </div>

      <div v-if="loading" class="loading">加载中...</div>

      <div v-else class="control-section">
        <div class="control-row">
          <div class="control-info">
            <div class="control-label">送审模式</div>
            <div class="control-desc">
              开启后 App 将处于<strong>非上线阶段</strong>，不展示广告
            </div>
          </div>
          <label class="toggle">
            <input
              type="checkbox"
              :checked="underReview"
              :disabled="saving"
              @change="onToggle"
            />
            <span class="toggle-track">
              <span class="toggle-thumb" />
            </span>
          </label>
        </div>

        <div class="status-bar">
          <span
            class="status-dot"
            :class="underReview ? 'is-review' : 'is-live'"
          />
          <span class="status-text">
            {{ underReview ? '非上线阶段 — 广告不展示' : '已上线 — 广告正常展示' }}
          </span>
        </div>

        <p v-if="updatedAt" class="updated-time">
          最后更新：{{ formatTime(updatedAt) }}
        </p>
      </div>

      <p v-if="error" class="error-msg">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const underReview = ref(false)
const updatedAt = ref<string | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

onMounted(async () => {
  try {
    const res = await $fetch<{ underReview: boolean; updatedAt?: string }>(
      '/api/v1/app-config'
    )
    underReview.value = res.underReview
    updatedAt.value = res.updatedAt
  } catch (e) {
    error.value = '加载状态失败'
  } finally {
    loading.value = false
  }
})

async function onToggle(e: Event) {
  const val = (e.target as HTMLInputElement).checked
  saving.value = true
  error.value = ''
  try {
    const res = await $fetch<{ underReview: boolean; updatedAt?: string }>(
      '/api/v1/app-config',
      { method: 'PUT', body: { underReview: val } }
    )
    underReview.value = res.underReview
    updatedAt.value = res.updatedAt
  } catch {
    ;(e.target as HTMLInputElement).checked = !val
    error.value = '更新失败，请重试'
  } finally {
    saving.value = false
  }
}

function formatTime(iso: string | null): string {
  if (!iso) return ''
  return new Date(iso).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })
}
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

.loading {
  text-align: center;
  color: #999;
  padding: 32px 0;
  font-size: 14px;
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

/* Toggle */
.toggle {
  position: relative;
  display: inline-block;
  width: 52px;
  height: 32px;
  flex-shrink: 0;
  cursor: pointer;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.toggle-track {
  position: absolute;
  inset: 0;
  background: #e0e0e0;
  border-radius: 16px;
  transition: background 0.25s ease;
}

.toggle input:checked + .toggle-track {
  background: #4cd964;
}

.toggle-thumb {
  position: absolute;
  width: 26px;
  height: 26px;
  left: 3px;
  top: 3px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.25s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
}

.toggle input:checked + .toggle-track .toggle-thumb {
  transform: translateX(20px);
}

.toggle input:disabled + .toggle-track {
  opacity: 0.6;
}

/* Status */
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

.updated-time {
  font-size: 12px;
  color: #bbb;
  margin: 12px 0 0;
}

.error-msg {
  color: #ff3b30;
  font-size: 13px;
  margin-top: 16px;
}
</style>
