<template>
  <div class="sdk-page">
    <div class="sdk-container">
      <h1>第三方信息共享清单</h1>
      <p class="desc">为实现「生字笔顺」的产品功能与使用统计，我们需要在必要时向以下第三方传输为实现对应功能所必需的信息。其中统计服务仅在您同意《隐私政策》后才会初始化并采集，其余传输均不包含任何账号或可识别孩子身份的信息。以下为完整的第三方信息共享清单。</p>

      <div class="item">
        <div class="item-title">友盟+ 统计 SDK（UMCommon / UMDevice）</div>
        <div class="row"><div class="key">第三方公司名称</div><div class="val">友盟同达（北京）信息技术有限公司</div></div>
        <div class="row"><div class="key">涉及个人信息</div><div class="val">设备信息（设备型号、操作系统版本、设备标识符 IDFA/IDFV、MAC 地址、IP 地址等）</div></div>
        <div class="row"><div class="key">使用目的</div><div class="val">产品使用统计分析（新增、活跃、启动、留存等基础统计），用于改进产品</div></div>
        <div class="row"><div class="key">使用场景</div><div class="val">您同意《隐私政策》后初始化 SDK 开始采集；不同意则不初始化、不采集</div></div>
        <div class="row"><div class="key">传输方式</div><div class="val">SDK 本机采集，加密上报</div></div>
        <div class="row"><div class="key">三方隐私政策链接</div><div class="val"><a href="https://www.umeng.com/page/policy" target="_blank">www.umeng.com/page/policy</a></div></div>
      </div>

      <div class="item">
        <div class="item-title">jsDelivr 公共 CDN 服务</div>
        <div class="row"><div class="key">第三方公司名称</div><div class="val">jsDelivr（www.jsdelivr.com）</div></div>
        <div class="row"><div class="key">涉及个人信息</div><div class="val">所查询的汉字字符（作为网络请求地址的一部分传输）</div></div>
        <div class="row"><div class="key">使用目的</div><div class="val">获取该汉字的公开笔画数据文件，展示笔顺动画与描红练习</div></div>
        <div class="row"><div class="key">使用场景</div><div class="val">查看某字的笔顺、且本机暂无该字笔画数据时</div></div>
        <div class="row"><div class="key">传输方式</div><div class="val">网络请求传输（不接入 SDK）</div></div>
        <div class="row"><div class="key">三方隐私政策链接</div><div class="val"><a href="https://www.jsdelivr.com/terms/privacy-policy" target="_blank">www.jsdelivr.com/terms/privacy-policy</a></div></div>
      </div>

      <div class="item">
        <div class="item-title">微软在线语音合成服务</div>
        <div class="row"><div class="key">第三方公司名称</div><div class="val">Microsoft Corporation</div></div>
        <div class="row"><div class="key">涉及个人信息</div><div class="val">被朗读的文本内容（汉字或词语）</div></div>
        <div class="row"><div class="key">使用目的</div><div class="val">在线合成朗读语音，帮助孩子听清字音</div></div>
        <div class="row"><div class="key">使用场景</div><div class="val">在笔顺、听写等页面选择在线音色进行朗读时</div></div>
        <div class="row"><div class="key">传输方式</div><div class="val">网络请求传输（不接入 SDK）</div></div>
        <div class="row"><div class="key">三方隐私政策链接</div><div class="val"><a href="https://privacy.microsoft.com/zh-cn/privacystatement" target="_blank">privacy.microsoft.com/zh-cn/privacystatement</a></div></div>
      </div>

      <div class="item">
        <div class="item-title">谷歌 AdMob 广告 SDK（Google Mobile Ads SDK）</div>
        <div class="row"><div class="key">第三方公司名称</div><div class="val">Google LLC</div></div>
        <div class="row"><div class="key">涉及个人信息</div><div class="val">设备信息（设备型号、操作系统版本、屏幕尺寸、语言设置、IP 地址、时区等）与广告交互数据（展示、观看完成情况）</div></div>
        <div class="row"><div class="key">使用目的</div><div class="val">应用内激励视频与开屏广告展示（非个性化投放，不基于儿童兴趣与行为推荐，不使用 IDFA 等广告标识符跨应用追踪）</div></div>
        <div class="row"><div class="key">使用场景</div><div class="val">您主动选择观看激励视频时（如「看广告免一天广告」「看广告解锁课本词语」），以及回到应用前台时展示开屏广告；同意《隐私政策》后才会初始化该 SDK</div></div>
        <div class="row"><div class="key">传输方式</div><div class="val">SDK 本机采集，加密上报</div></div>
        <div class="row"><div class="key">三方隐私政策链接</div><div class="val"><a href="https://policies.google.com/privacy" target="_blank">policies.google.com/privacy</a></div></div>
      </div>

      <div class="note">
        除上述清单外，本产品接入的 Masonry（界面布局）、FMDB（本地数据库）均为仅在本机运行的功能库，<b>不收集、不传输任何个人信息</b>。除友盟+统计 SDK 与谷歌 AdMob 广告 SDK 外，本产品不接入其他统计分析类 SDK 或其他广告类 SDK。
      </div>

      <p class="footnote">「生字笔顺」 · 第三方信息共享清单 · 更新日期：2026年10月31日</p>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'plain'
})

useHead({
  title: '第三方信息共享清单 - 生字笔顺',
  meta: [
    { name: 'description', content: '生字笔顺第三方信息共享清单，列明我们向第三方传输的信息类型和目的。数据仅存本机，不上传服务器。' },
    { name: 'robots', content: 'noindex, follow' }
  ],
  link: [
    { rel: 'canonical', href: 'https://bishun.hehuoya.com/sdk-list' }
  ]
})
</script>

<style scoped>
.sdk-page {
  background: var(--paper);
  min-height: 100vh;
  padding: 40px 20px 60px;
}

.sdk-container {
  max-width: 720px;
  margin: 0 auto;
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: 40px 36px;
  box-shadow: var(--shadow-card);
}

h1 {
  font-family: var(--font-kai);
  font-size: 24px;
  text-align: center;
  color: var(--ink);
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.desc {
  font-size: 14px;
  color: var(--ink2);
  text-align: justify;
  margin-bottom: 24px;
  line-height: 1.7;
}

.item {
  background: var(--paper);
  border-radius: 12px;
  padding: 18px 18px 10px;
  margin-bottom: 16px;
  border: 1px solid var(--line);
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--jade-dark);
  margin-bottom: 10px;
}

.row {
  display: flex;
  padding: 8px 0;
  border-top: 1px solid var(--line);
}

.row:first-of-type {
  border-top: none;
}

.key {
  flex: 0 0 110px;
  font-size: 13px;
  color: var(--ink2);
  font-weight: 500;
}

.val {
  flex: 1;
  font-size: 14px;
  color: var(--ink);
  text-align: justify;
  word-break: break-all;
  line-height: 1.6;
}

.val a {
  color: var(--jade);
  text-decoration: none;
  border-bottom: 1px solid rgba(35, 122, 104, 0.3);
}

.val a:hover {
  color: var(--jade-dark);
  border-bottom-color: var(--jade-dark);
}

.note {
  background: var(--jade-soft);
  border-radius: 10px;
  padding: 14px 16px;
  margin: 20px 0;
  font-size: 14px;
  color: var(--jade-dark);
  text-align: justify;
  line-height: 1.7;
}

.footnote {
  margin-top: 28px;
  font-size: 13px;
  color: var(--ink2);
  text-align: center;
}

@media (max-width: 720px) {
  .sdk-page {
    padding: 20px 12px 40px;
  }

  .sdk-container {
    padding: 24px 16px;
  }

  h1 {
    font-size: 20px;
  }

  .row {
    flex-direction: column;
    gap: 4px;
  }

  .key {
    flex: none;
    font-size: 12px;
  }

  .val {
    font-size: 13px;
  }
}
</style>
