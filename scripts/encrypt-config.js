const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

const KEY = 'ziyouzhangfa2026'
const IV = '0123456789abcdef'

// 读取当前配置（如果存在则读取，否则用默认值）
const configPath = path.join(__dirname, '..', 'public', 'api', 'v1', 'app-config.json')
let config
try {
  const existing = fs.readFileSync(configPath, 'utf8')
  // 尝试解密（如果已经是加密的）
  const decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(KEY), Buffer.from(IV))
  let decrypted = decipher.update(existing.trim(), 'base64', 'utf8')
  decrypted += decipher.final('utf8')
  config = JSON.parse(decrypted)
} catch {
  config = {
    platform: 'ios',
    latestVersion: '1.0.0',
    minSupportedVersion: '1.0.0',
    downloadUrl: '',
    releaseNotes: '首发版本。',
    forcedUpdate: false,
    underReview: false
  }
}

// 修改 underReview（通过命令行参数）
const args = process.argv.slice(2)
if (args[0] === '--review') config.underReview = true
if (args[0] === '--live') config.underReview = false

// 加密并写入
const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(KEY), Buffer.from(IV))
let encrypted = cipher.update(JSON.stringify(config), 'utf8', 'base64')
encrypted += cipher.final('base64')

fs.mkdirSync(path.dirname(configPath), { recursive: true })
fs.writeFileSync(configPath, encrypted, 'utf8')

console.log(`Written (underReview=${config.underReview}): ${encrypted}`)
