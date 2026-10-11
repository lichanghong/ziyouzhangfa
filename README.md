# 生字笔顺官网

「生字笔顺」儿童练字 App 的官网，基于 Nuxt 3 构建，同时为 App 提供配置与套餐接口。

## 本地开发

```bash
npm install
npm run dev        # http://localhost:3000
```

其他命令：

| 命令 | 说明 |
|---|---|
| `npm run build` | 静态生成（`nuxt generate`），产物在 `.output/public`，用于 ESA Pages 部署 |
| `npm run build:node` | Node 服务端构建（`nuxt build`），接口以动态路由运行，需 Node 服务器 |
| `npm run preview` | 预览构建产物 |
| `npm run typecheck` | 类型检查 |

## 目录结构

```
├── components/          # 页面区块组件（导航、Hero、笔顺演示、功能、VIP、下载、页脚）
├── composables/         # useHanziWriter：hanzi-writer 动态加载与公共配置
├── layouts/             # 默认布局：SiteNav + 内容 + SiteFooter
├── pages/               # 首页（唯一页面）
├── server/
│   ├── api/v1/          # App 接口（见下）
│   └── data/            # 接口数据源（单一数据来源）
├── assets/css/main.css  # 全站样式（纸墨风格，自定义 CSS）
└── esa.jsonc            # 阿里云 ESA Pages 项目配置
```

## App 接口

部署在 ESA Pages（静态托管）时，接口通过 `routeRules.prerender` 在构建期预渲染为静态 JSON 文件，与页面同源同路径；本地 dev 和 `npm run build:node` 模式下则为动态路由。两条路径等价，App 可任选其一：

| 接口 | 说明 |
|---|---|
| `GET /api/v1/app-config` | App 版本配置：`latestVersion`、`minSupportedVersion`、`downloadUrl`、`releaseNotes`、`forcedUpdate` |
| `GET /api/v1/vip/plans` | VIP 套餐：币种、支付渠道、订阅须知、套餐列表（名称/价格/原价/周期/角标） |

两个接口均提供 `.json` 后缀别名（如 `/api/v1/app-config.json`），静态托管下保证 `Content-Type: application/json`。响应带 `Access-Control-Allow-Origin: *` 和 `Cache-Control: public, max-age=300`。

数据维护：直接修改 `server/data/app-config.json`、`server/data/vip-plans.json`，推送后 ESA Pages 重新构建即生效。官网 VIP 区块价格与 App 同源（`VipSection` 请求同一接口）。

> 注：`app-config.json` 中的 `downloadUrl` 为空时，官网下载按钮回落为锚点。App 上架后填入真实 App Store 链接。

## 部署（阿里云 ESA Pages）

项目已含 `esa.jsonc`（输出目录 `./.output/public`）。在 ESA Pages 控制台对应配置：

- 构建命令：`npm run generate`
- 输出目录：`.output/public`
- 安装命令：`npm install`

404 策略使用 `404Page`（Nuxt 静态生成会输出 404 页面）。

## 说明

- 动态笔顺基于 [hanzi-writer](https://github.com/chanind/hanzi-writer)，笔顺数据由浏览器直接从 [hanzi-writer-data](https://github.com/chanind/hanzi-writer-data)（jsdelivr CDN）加载，不走本站接口。
- 视觉沿用 App 的 ZYFTheme 色板（纸墨风格），样式为自定义 CSS，未使用 Tailwind。
