<template>
  <div class="admin-page">
    <div class="admin-card">
      <div class="admin-header">
        <h1>生字笔顺 · 控制台</h1>
        <p class="subtitle">App 全局配置管理</p>
      </div>

      <div class="control-section">
        <div class="control-info">
          <div class="control-label">送审模式配置</div>
          <div class="control-desc">
            配置文件已加密存储（AES-256-CBC）。加密脚本 <code>scripts/encrypt.sh</code> 含密钥、已 gitignore 排除，仅存在于本地
          </div>
        </div>
      </div>

      <div class="help-section">
        <div class="help-title">查看当前状态</div>
        <ol class="help-steps">
          <li>运行解密脚本：<code>./scripts/encrypt.sh -d public/api/app-config-1.0.0.png /tmp/config.json</code></li>
          <li>查看解密结果：<code>cat /tmp/config.json</code></li>
        </ol>
      </div>

      <div class="help-section">
        <div class="help-title">切换状态</div>
        <ol class="help-steps">
          <li>先解密：<code>./scripts/encrypt.sh -d public/api/app-config-1.0.0.png /tmp/config.json</code></li>
          <li>编辑 <code>/tmp/config.json</code>，修改 <code>"underReview"</code> 为 <code>true</code>（送审中）或 <code>false</code>（已上线）</li>
          <li>重新加密：<code>./scripts/encrypt.sh /tmp/config.json public/api/app-config-1.0.0.png</code></li>
          <li>提交并推送代码，ESA 自动部署后生效</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
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
