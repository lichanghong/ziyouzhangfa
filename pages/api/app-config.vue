<script setup lang="ts">
const config = useRuntimeConfig()
const data = {
  platform: 'ios',
  latestVersion: '1.0.0',
  minSupportedVersion: '1.0.0',
  downloadUrl: '',
  releaseNotes: '首发版本。',
  forcedUpdate: false,
  underReview: config.public.underReview
}
const jsonText = JSON.stringify(data)
</script>

<template>
  <div id="app-config">{{ jsonText }}</div>
</template>
