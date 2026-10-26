# 多版本 App 配置方案

## 概述

不同版本的 App 获取不同的配置数据，采用**每版本一个独立加密文件**方案。

## 文件结构

```
public/api/
├── app-config-1.0.0.png    # v1.0.0 的配置
├── app-config-1.1.0.png    # v1.1.0 的配置
└── app-config-1.2.0.png    # v1.2.0 的配置
```

## 客户端请求

App 读取自身版本号（`CFBundleShortVersionString`），拼接 URL 请求对应版本的配置文件：

```
https://bishun.hehuoya.com/api/app-config-{version}.png
```

## 发布流程

1. 创建新版本配置 JSON
2. 加密（脚本位于 iOS 工程，在 website 仓库目录下执行）：`../ZiYouZhangFa/encrypt.sh /tmp/config-{version}.json public/api/app-config-{version}.png`
3. `git push`，ESA 自动部署

## 密钥管理

- 加密脚本位于 iOS 工程根目录 `ZiYouZhangFa/encrypt.sh`，内含 AES-256-CBC 密钥，随该 gitee 私有仓库提交（仓库已设访问权限），**严禁复制到本仓库或任何公开位置**
- iOS App（`ZYFAppConfigService.m` 中的 `kAESKey`/`kAESIV` 字节数组）与脚本内密钥保持一致
- 轮换密钥：脚本和 iOS 端同步改为新密钥，并重新加密 `public/api/` 下所有配置文件
- 生成新密钥：`openssl rand -hex 32`（KEY）/ `openssl rand -hex 16`（IV）

## 优缺点

- ✅ 每个版本独立配置，互不影响，可单独更新某版本配置
- ✅ 历史版本配置保留，方便回滚
- ✅ 静态文件方案，无需服务端改动
- ️ 文件数量会增长（但每个文件很小，影响不大）
- ⚠️ 需手动管理多个文件
