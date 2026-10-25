#!/bin/bash
# =============================================================================
# 配置文件加密脚本
# =============================================================================
#
# 加解密方案：
# 1. 第一层：ZIP 压缩（明文压缩，减小体积）
# 2. 第二层：AES-256-CBC 加密（密钥 + IV）
#
# 加密流程：
#   JSON 文件 → zip 压缩 → AES-256-CBC 加密 → 输出加密文件
#
# 解密流程（客户端）：
#   加密文件 → AES-256-CBC 解密 → zip 解压 → JSON 内容
#
# 密钥信息：
#   KEY:  32 字节（256 位）十六进制字符串
#   IV:   16 字节（128 位）十六进制字符串
#
# 使用方法：
#   加密：./encrypt.sh <输入 JSON 文件> [输出文件]
#   解密：./encrypt.sh -d <输入加密文件> [输出 JSON 文件]
#
# 示例：
#   ./encrypt.sh public/api/v1/app-config.json
#   ./encrypt.sh -d public/api/v1/app-config.json.enc
#
# =============================================================================

# 密钥配置（32 字节 = 256 位，十六进制）
# 生成方式：openssl rand -hex 32
ENCRYPT_KEY="7a69796f757a68616e676661323032366165733235366b657932303236313032"

# IV 配置（16 字节 = 128 位，十六进制）
# 生成方式：openssl rand -hex 16
ENCRYPT_IV="30313233343536373839616263646566"

# 临时文件目录
TEMP_DIR=$(mktemp -d)

# 清理临时文件
cleanup() {
    rm -rf "$TEMP_DIR"
}
trap cleanup EXIT

# 加密函数
encrypt() {
    local input_file="$1"
    local output_file="$2"

    if [ ! -f "$input_file" ]; then
        echo "错误：输入文件不存在：$input_file"
        exit 1
    fi

    # 第一步：ZIP 压缩
    local zip_file="$TEMP_DIR/config.zip"
    local abs_input
    abs_input=$(cd "$(dirname "$input_file")" && pwd)/$(basename "$input_file")
    local abs_output
    abs_output=$(cd "$(dirname "$output_file")" && pwd)/$(basename "$output_file")
    cd "$TEMP_DIR"
    zip -j config.zip "$abs_input" > /dev/null 2>&1

    if [ ! -f "$zip_file" ]; then
        echo "错误：ZIP 压缩失败"
        exit 1
    fi

    echo "✓ ZIP 压缩完成：$(wc -c < "$zip_file") bytes"

    # 第二步：AES-256-CBC 加密
    openssl enc -aes-256-cbc \
        -in "$zip_file" \
        -out "$abs_output" \
        -K "$ENCRYPT_KEY" \
        -iv "$ENCRYPT_IV"

    if [ $? -ne 0 ]; then
        echo "错误：AES 加密失败"
        exit 1
    fi

    echo "✓ AES-256-CBC 加密完成：$(wc -c < "$abs_output") bytes"
    echo "✓ 加密文件已保存：$output_file"
}

# 解密函数
decrypt() {
    local input_file="$1"
    local output_file="$2"

    if [ ! -f "$input_file" ]; then
        echo "错误：输入文件不存在：$input_file"
        exit 1
    fi

    # 第一步：AES-256-CBC 解密
    local zip_file="$TEMP_DIR/config.zip"
    local abs_input
    abs_input=$(cd "$(dirname "$input_file")" && pwd)/$(basename "$input_file")
    local abs_output
    abs_output=$(cd "$(dirname "$output_file")" && pwd)/$(basename "$output_file")
    openssl enc -aes-256-cbc -d \
        -in "$abs_input" \
        -out "$zip_file" \
        -K "$ENCRYPT_KEY" \
        -iv "$ENCRYPT_IV"

    if [ $? -ne 0 ]; then
        echo "错误：AES 解密失败（密钥或 IV 不正确）"
        exit 1
    fi

    echo "✓ AES-256-CBC 解密完成"

    # 第二步：ZIP 解压
    cd "$TEMP_DIR"
    unzip -o config.zip -d "$TEMP_DIR/extracted" > /dev/null 2>&1

    if [ $? -ne 0 ]; then
        echo "错误：ZIP 解压失败"
        exit 1
    fi

    # 找到解压后的 JSON 文件
    local json_file=$(find "$TEMP_DIR/extracted" -name "*.json" -type f | head -1)

    if [ -z "$json_file" ]; then
        echo "错误：未找到 JSON 文件"
        exit 1
    fi

    # 复制到输出文件
    cp "$json_file" "$abs_output"

    echo "✓ ZIP 解压完成"
    echo "✓ 解密文件已保存：$output_file"
}

# 主逻辑
if [ $# -lt 1 ]; then
    echo "用法："
    echo "  加密：$0 <输入 JSON 文件> [输出文件]"
    echo "  解密：$0 -d <输入加密文件> [输出 JSON 文件]"
    echo ""
    echo "示例："
    echo "  $0 public/api/v1/app-config.json"
    echo "  $0 -d public/api/v1/app-config.json.enc"
    exit 1
fi

# 判断是加密还是解密
if [ "$1" = "-d" ]; then
    # 解密模式
    input_file="$2"
    output_file="${3:-${input_file%.enc}.json}"

    if [ -z "$input_file" ]; then
        echo "错误：请指定输入文件"
        exit 1
    fi

    echo "开始解密：$input_file"
    decrypt "$input_file" "$output_file"
else
    # 加密模式
    input_file="$1"
    output_file="${2:-${input_file}.enc}"

    echo "开始加密：$input_file"
    encrypt "$input_file" "$output_file"
fi

echo ""
echo "完成！"
