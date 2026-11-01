<template>
  <section class="ad-banner">
    <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-6387872276467622"
      data-ad-slot="7969407019"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </section>
</template>

<script setup lang="ts">
onMounted(() => {
  const w = window as unknown as { adsbygoogle?: unknown[] }
  w.adsbygoogle = w.adsbygoogle || []
  w.adsbygoogle.push({})
})
</script>

<style scoped>
.ad-banner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 32px 32px;
}
</style>
