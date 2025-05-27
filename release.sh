#!/bin/bash

# 设置脚本在遇到错误时退出
set -e

# 获取当前日期时间，格式：YYYY-MM-DD_HH-MM-SS
TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

# 定义路径
TARGET_DIR="../nginx-website/table-exporter"
BACKUP_DIR="../backup.release"
RELEASE_ZIP="./website.release.zip"

echo "🚀 开始部署 website.release.zip..."

# 1. 检查并备份现有目录
if [ -d "$TARGET_DIR" ]; then
    echo "📦 发现现有目录，正在创建备份..."
    
    # 创建备份目录（如果不存在）
    mkdir -p "$BACKUP_DIR"
    
    BACKUP_NAME="table-exporter.${TIMESTAMP}.zip"
    BACKUP_PATH="${BACKUP_DIR}/${BACKUP_NAME}"
    
    # 切换到目标目录的父目录进行打包
    cd "../nginx-website"
    zip -r "../backup.release/${BACKUP_NAME}" "table-exporter" > /dev/null 2>&1
    cd - > /dev/null
    
    echo "✅ 备份已创建: $BACKUP_PATH"
    
    # 删除现有目录
    echo "🗑️  删除现有目录..."
    rm -rf "$TARGET_DIR"
else
    echo "ℹ️  目标目录不存在，跳过备份步骤"
fi

# 2. 检查 website.release.zip 是否存在
if [ ! -f "$RELEASE_ZIP" ]; then
    echo "❌ 错误: website.release.zip 文件不存在!"
    echo "请先运行 'gulp release' 生成发布包"
    exit 1
fi

# 3. 创建目标目录
echo "📁 创建目标目录..."
mkdir -p "$TARGET_DIR"

# 4. 解压 website.release.zip 到目标目录
echo "📤 解压 website.release.zip 到目标目录..."
unzip -q "$RELEASE_ZIP" -d "$TARGET_DIR"

echo "✅ 部署完成!"
echo "📍 部署位置: $TARGET_DIR"

# 显示目录内容
echo ""
echo "📋 部署文件列表:"
ls -la "$TARGET_DIR" 
