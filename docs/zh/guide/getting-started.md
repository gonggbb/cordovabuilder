## 快速开始

## 拉取镜像

```bash
# 生产推荐
docker pull gamesg/cordovabuilder:v2.0.0-rc.5
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v2.0.0-rc.4

# 兼容旧版
docker pull gamesg/cordovabuilder:v1.0.0-rc.6
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v1.0.0-rc.5
```

## Windows CMD

--name cordova-builder-$(date +%s) \

```cmd
docker run -it ^
  -v .\gradle-caches:/root/.gradle ^
  -v .\:/workspace ^
  --name cordova-builder01 ^
  -u root ^
  -e KEYSTORE_PATH=/workspace/xx.keystore ^
  -e KEY_ALIAS=xx ^
  -e KEYSTORE_PASSWORD=password ^
  -e KEY_PASSWORD=password ^
  gamesg/cordovabuilder:v2.0.0-rc.5
```

## Windows PowerShell

--name cordova-builder-$(Get-Date -Format yyyyMMddHHmmss) `

```powershell
docker run -it `
  -v ".\gradle-caches:/root/.gradle" `
  -v ".\:/workspace" `
  --name cordova-builder02 `
  -u root `
  -e KEYSTORE_PATH=/workspace/xx.keystore `
  -e KEY_ALIAS=xx `
  -e KEYSTORE_PASSWORD=password `
  -e KEY_PASSWORD=password `
  gamesg/cordovabuilder:v2.0.0-rc.5
```

## macOS / Linux

--name cordova-builder-$(date +%s) \

```bash
docker run -it \
  -v ./gradle-caches:/root/.gradle \
  -v ./:/workspace \
  --name cordova-builder01 \
  -u root \
  --privileged
  -e KEYSTORE_PATH=/workspace/xx.keystore \
  -e KEY_ALIAS=xx \
  -e KEYSTORE_PASSWORD=password \
  -e KEY_PASSWORD=password \
  gamesg/cordovabuilder:v2.0.0-rc.5
```

## 启动脚本

```bash
docker run -it \
  -v ./gradle-caches:/root/.gradle \
  -v ./:/workspace \
  --name cordova-builder01 \
  -u root \
  -e KEYSTORE_PATH=/workspace/xx.keystore \
  -e KEY_ALIAS=xx \
  -e KEYSTORE_PASSWORD=password \
  -e KEY_PASSWORD=password \
  --entrypoint bash \
  gamesg/cordovabuilder:v2.0.0-rc.5 \
  -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && exec /bin/bash"
```

## 参数详解

| 参数            | 说明                            |
| --------------- | ------------------------------- |
| `-it`           | 交互模式 + 伪终端               |
| `-v`            | 挂载卷（Gradle缓存 + 工作目录） |
| `--name`        | 容器命名                        |
| `--privileged`  | 特权模式（⚠️ 安全风险）         |
| `-u 0`          | 以 root 用户运行                |
| `-e`            | 环境变量（密钥库配置）          |
| `bash -c "..."` | 启动时执行初始化脚本            |

## 容器内置的可用构建脚本

| 脚本                          | v3.0.0 | v2.0.0 | v1.0.0 | 功能                   |
| ----------------------------- | ------ | ------ | ------ | ---------------------- |
| `apk-automatic-v2.sh`         | ✅     | ✅     | ✅     | 自动化构建 (apksigner) |
| `apk-build-sign-v2.sh`        | ✅     | ✅     | ✅     | 打包+签名 (apksigner)  |
| `apk-init.sh`                 | ✅     | ✅     | ✅     | 环境初始化             |
| `apk-automatic.sh`            | ❌     | ❌     | ✅     | 自动化构建 (jarsigner) |
| `apk-replace-repositories.sh` | ✅     | ✅     | ✅     | 替换 jcenter 依赖      |

## 行续符对照表

| 平台               | 续行符  | 示例             |
| ------------------ | ------- | ---------------- |
| Windows CMD        | `^`     | `-v path ^`      |
| Windows PowerShell | `` ` `` | `-v path `` ` `` |
| macOS/Linux        | `\`     | `-v path \`      |

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
