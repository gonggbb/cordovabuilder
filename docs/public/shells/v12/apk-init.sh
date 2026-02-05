#!/bin/bash
# File Name:apk-automatic-v2
# Version:V1.0
# Author:gamesg
# Organization:github.com/gonggbb
# Desc: apk环境初始化脚本
#############################################
set -e

echo "------------------------------------------------------"
echo "🧩 Cordova Android Build Environment Check & Init"
echo "------------------------------------------------------"

# 检查必需的环境变量并输出当前环境状态
check_env() {
  local var_name=$1
  local var_value=$(eval echo "\$$var_name")
  if [ -z "$var_value" ]; then
    echo "❌ 环境变量 $var_name 未设置"
    MISSING_ENV=true
  else
    echo "✅ $var_name = $var_value"
  fi
}

# 检查主要构建环境变量（签名相关变量在第二步才需要）
check_env "JAVA_HOME"
check_env "ANDROID_SDK_ROOT"
check_env "GRADLE_HOME"
check_env "PATH"

# 如果检测到某些关键变量缺失，则提示并退出
if [ "$MISSING_ENV" = true ]; then
  echo "------------------------------------------------------"
  echo "❌ 必要环境变量缺失。请确保以下变量已设置："
  echo "   JAVA_HOME, ANDROID_SDK_ROOT, GRADLE_HOME, PATH"
  echo "------------------------------------------------------"
  exit 1
fi

# 验证关键命令是否可用
echo "------------------------------------------------------"
echo "🧩 检查必要命令..."
for cmd in java javac gradle cordova /opt/android-sdk/cmdline-tools/latest/bin/sdkmanager; do
  if ! command -v $cmd >/dev/null 2>&1; then
    echo "❌ 命令 $cmd 不存在，请检查 PATH 设置"
    MISSING_CMD=true
  else
    echo "✅ $cmd = $(command -v $cmd)"
  fi
done

if [ "$MISSING_CMD" = true ]; then
  echo "------------------------------------------------------"
  echo "❌ 缺少必要命令，无法继续构建。"
  echo "请确认 Dockerfile 中安装步骤正确或镜像未被修改。"
  exit 1
fi

echo "------------------------------------------------------"
echo "✅ 环境变量与命令检测通过，准备构建"
echo "------------------------------------------------------"

# 进入项目目录
PROJECT_DIR=${PROJECT_DIR:-/workspace}
cd "$PROJECT_DIR" || { echo "❌ 项目目录不存在: $PROJECT_DIR"; exit 1; }
echo "当前目录: $(pwd)"

# 如果存在 package.json，则执行 npm install
if [ -f package.json ]; then
  echo "📦 安装 npm 依赖..."
  npm install --no-audit --no-fund
fi

# 检查 Cordova 环境
cordova -v || { echo "❌ Cordova CLI 未安装"; exit 1; }

# 在检查 Cordova 环境之前添加
export CORDOVA_TELEMETRY_OPT_OUT=true

# 清理并添加 Android 平台
echo "------------------------------------------------------"
echo "⚙️  准备 Cordova Android 平台..."
# cordova platform add android@12.0.0 --no-telemetry 下载gradle 7.6 版本
cordova platform add android --no-telemetry

# sh /workspace/build-scripts-short/apk-replace-repositories.sh
