## 🚀 快速开始

## 拉取镜像
```bash
# 生产推荐
docker pull gamesg/cordovabuilder:v2.0.0-rc.5
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v2.0.0-rc.4

# 兼容旧版
docker pull gamesg/cordovabuilder:v1.0.0-rc.6
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v1.0.0-rc.5
```


## Docker 在 PowerShell (Windows) 启动命令
```powershell
# 自动设置软链接
docker run -it `
  -v C:\workspace\项目目录:/workspace `
  -v C:\workspace\项目目录\gradle-caches:/root/.gradle `
  --name cordova-builder-$(Get-Date -Format yyyyMMddHHmmss) `
  --privileged `
  -u 0 `
  -e KEYSTORE_PATH=/workspace/你的签名文件 `
  -e KEY_ALIAS=xx `
  -e KEYSTORE_PASSWORD=你的密码 `
  -e KEY_PASSWORD=你的密码 `
  gamesg/cordovabuilder:v2.0.0-rc.5 `
  bash 
```

## Docker 在 Bash (Linux/macOS)启动命令
```bash
# 自动设置软链接
docker run -it \
  -v /home/workspace/项目目录:/workspace \
  -v /home/workspace/项目目录/gradle-caches:/root/.gradle \
  --name cordova-builder-$(date +%s) \
  --privileged \
  -u 0 \
  -e KEYSTORE_PATH=/workspace/你的签名文件 \
  -e KEY_ALIAS=xx \
  -e KEYSTORE_PASSWORD=你的密码 \
  -e KEY_PASSWORD=你的密码 \
  gamesg/cordovabuilder:v2.0.0-rc.5 \
  bash 
```

## bash 自动设置软链接和日志输出
bash -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && ln -sf /dev/stdout nohup.log && exec /bin/bash"

## 使用外部链接脚本

-v /home/workspace/项目目录/build-script-ln.sh:/build-script-ln.sh \
bash /build-script-ln.sh

创建 `build-script-ln.sh`：
```bash
#!/bin/bash
ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short
ln -sf /dev/stdout nohup.log
exec /bin/bash
```

## 容器内置的可用构建脚本

| 脚本 | v3.0.0 | v2.0.0 | v1.0.0 | 功能 |
|------|--------|--------|--------|------|
| `apk-automatic-v2.sh` | ✅ | ✅ | ✅ | 自动化构建 (apksigner) |
| `apk-build-sign-v2.sh` | ✅ | ✅ | ✅ | 打包+签名 (apksigner) |
| `apk-init.sh` | ✅ | ✅ | ✅ | 环境初始化 |
| `apk-automatic.sh` | ❌ | ❌ | ✅ | 自动化构建 (jarsigner) |
| `apk-replace-repositories.sh` | ✅ | ✅ | ✅ | 替换 jcenter 依赖 |
---


## 项目初始化

```bash
cordova create myApp org.apache.cordova.myApp myApp
cordova platform add android
cordova plugin add cordova-plugin-camera
cordova requirements android
```


## 构建命令
```bash
# 调试构建
cordova build android --verbose

# 发布构建 + 签名（推荐）
cordova build android --release -- --packageType=apk \
  --keystore=/workspace/myapp.p12 --keystoreType=PKCS12 \
  --storePassword=密码 --alias=myappkey --password=密码
```

## 容器内置的可用构建脚本

| 脚本 | v3.0.0 | v2.0.0 | v1.0.0 | 功能 |
|------|--------|--------|--------|------|
| [apk-automatic-v2.sh](shells\v12\apk-automatic-v2.sh) | ✅ | ✅ | ✅ | 自动化构建 (apksigner) |
| [apk-build-sign-v2.sh](shells\v10\apk-build-sign-v2.sh) | ✅ | ✅ | ✅ | 打包+签名 (apksigner) |
| [apk-init.sh](shells\v10\apk-init.sh) | ✅ | ✅ | ✅ | 环境初始化 |
| [apk-automatic.sh](shells\v10\apk-automatic.sh) | ❌ | ❌ | ✅ | 自动化构建 (jarsigner) |
| [apk-replace-repositories.sh](shells\v10\apk-replace-repositories.sh) | ✅ | ✅ | ✅ | 替换 jcenter 依赖 |

### 示例脚本：[apk-build.sh](/docs/shells/v10/apk-build.sh)
```bash
#!/bin/bash
# 开始 release 构建（不签名）
echo "------------------------------------------------------"
echo "🏗️  正在构建 release APK（未签名）..."

# 进入项目目录
PROJECT_DIR=${PROJECT_DIR:-/workspace}
cd "$PROJECT_DIR" || { echo "❌ 项目目录不存在: $PROJECT_DIR"; exit 1; }
echo "当前目录: $(pwd)"

cordova build android --release --no-telemetry

echo "---- 结束构建 release APK（未签名）----------------------------------"