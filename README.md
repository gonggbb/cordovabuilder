# Cordova 混合 App 构建环境文档

## 📋 版本概览

| 版本 | 核心组件 | 适用场景 |
|------|----------|----------|
| **v3.0.0-rc.1**<br>Cordova 13<br>2025.11.25 (最新发布) | • Java 17.0.10<br>• Gradle 8.7<br>• Node.js 20.19.5<br>• Build Tools ^34.0.0 | ✅ 新项目开发 |
| **v2.0.0-rc.4**<br>Cordova 12<br>2023.5.22 | • Java 11/17<br>• Gradle 7.6<br>• Node.js 18.20.8<br>• Build Tools ^33.0.2 | ✅ 推荐生产环境|
| **v1.0.0-rc.5**<br>Cordova 10<br>2021.7.20 | • Java 1.8<br>• Gradle 6.5<br>• Node.js 10.15.3<br>• SDK 30 | ⚠️ 遗留项目维护 |

---

## 🚀 快速开始

### 1. 拉取镜像
```bash
# 生产推荐
docker pull gamesg/cordovabuilder:v2.0.0-rc.4
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v2.0.0-rc.4

# 兼容旧版
docker pull gamesg/cordovabuilder:v1.0.0-rc.5
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v1.0.0-rc.5
```

### 2. Docker 启动命令

#### 基础启动（进入交互式终端）

##### PowerShell (Windows)
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
  gamesg/cordovabuilder:v2.0.0-rc.4 `
  bash 
```

##### Bash (Linux/macOS)
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
  gamesg/cordovabuilder:v2.0.0-rc.4 \
  bash 
```
#### 自动设置软链接和日志输出
bash -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && ln -sf /dev/stdout nohup.log && exec /bin/bash"

#### 使用外部链接脚本

-v /home/workspace/项目目录/build-script-ln.sh:/build-script-ln.sh \
bash /build-script-ln.sh

创建 `build-script-ln.sh`：
```bash
#!/bin/bash
ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short
ln -sf /dev/stdout nohup.log
exec /bin/bash
```
#### 🛠 可用构建脚本

| 脚本 | v3.0.0 | v2.0.0 | v1.0.0 | 功能 |
|------|--------|--------|--------|------|
| `apk-automatic-v2.sh` | ✅ | ✅ | ✅ | 自动化构建 (apksigner) |
| `apk-build-sign-v2.sh` | ✅ | ✅ | ✅ | 打包+签名 (apksigner) |
| `apk-init.sh` | ✅ | ✅ | ✅ | 环境初始化 |
| `apk-automatic.sh` | ❌ | ❌ | ✅ | 自动化构建 (jarsigner) |
| `apk-replace-repositories.sh` | ✅ | ✅ | ✅ | 替换 jcenter 依赖 |
---

## 🔧 核心构建流程

### 项目初始化
```bash
cordova create myApp org.apache.cordova.myApp myApp
cordova platform add android
cordova plugin add cordova-plugin-camera
cordova requirements android
```

### 构建命令
```bash
# 调试构建
cordova build android --verbose

# 发布构建 + 签名（推荐）
cordova build android --release -- --packageType=apk \
  --keystore=/workspace/myapp.p12 --keystoreType=PKCS12 \
  --storePassword=密码 --alias=myappkey --password=密码
```

---

## 🔐 数字证书生成与签名

-  工具链兼容性矩阵

| 镜像版本 | 默认 JDK | 默认签名工具 | 默认证书生成命令 | 适配说明 |
|---------|----------|-------------|------------------|----------|
| **v3.0.0-rc.1**<br>(Cordova 13) | JDK 17.0.10 |  `apksigner`（推荐）<br>可使用 `jarsigner`（兼容） |  `keytool -genkeypair`（推荐） | 完整支持新版 sha256withrsa、PKCS12 标准 |
| **v2.0.0-rc.4**<br>(Cordova 12) | JDK 11 / 17 |  `apksigner`（内置脚本支持）<br>✔ `jarsigner` |  `keytool -genkeypair`（推荐）<br>✔ 旧式 `keytool -genkey` | 完整支持新版 sha256withrsa、PKCS12 标准 |
| **v1.0.0-rc.5**<br>(Cordova 10) | JDK 1.8 | ✔ `jarsigner`（默认方式）<br>⚠ 不推荐 `apksigner` | ✔ 传统 `keytool -genkey` | 专为遗留项目保留，必须兼容 SHA1 旧流程 |


### 数字证书生成

#### 推荐方式（适用于 JDK 9+）
```bash
keytool -genkeypair -alias myappkey \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125 \
  -keyalg RSA -keysize 2048 \
  -sigalg SHA256withRSA \
  -storetype PKCS12
```

#### 传统方式（适用于旧版 JDK）
```bash
keytool -genkey -alias myappkey \
  -keystore "/workspace/myApp/newmyapp.p12" \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125 \
  -keyalg RSA
```

### APK 签名

#### 使用 apksigner（推荐方式）
```bash
apksigner sign \
  --ks newmyapp-renewed.p12 \
  --ks-pass pass:你的密码 \
  --ks-key-alias myappkey \
  --key-pass pass:你的密码 \
  --out platforms/android/app/build/outputs/apk/release/app-release-signed.apk \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

#### 使用 jarsigner（传统方式）
```bash
jarsigner -verbose \
  -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 -keypass 你的密码 \
  app-release-unsigned.apk myappkey
```

### 签名验证
```bash
# 验证 APK 签名
jarsigner -verify -verbose -certs app-release-unsigned.apk

# 查看密钥库内容
keytool -list -v -keystore newmyapp-renewed.p12

# 从 APK 中提取并显示证书信息
keytool -printcert -jarfile platforms/android/app/build/outputs/apk/release/app-release-signed.apk
```

---

## 📦 证书升级与转换

```bash
# 安装 OpenSSL（Ubuntu/Debian）
apt update && apt install openssl

# 提取私钥
openssl pkcs12 -in newmyapp.p12 -nodes -nocerts -out myappkey.pem

# 提取原证书
openssl pkcs12 -in newmyapp.p12 -nokeys -out old-cert.pem

# 生成新的自签名证书
openssl req -new -x509 \
  -key myappkey.pem \
  -out new-cert.pem \
  -days 9125 \
  -subj "/CN=组织名称或域名/OU=部门或分支机构名称/O=组织/L=地区城市/ST=周或省/C=你的国家"

# 导出为 PKCS12 格式
openssl pkcs12 -export \
  -in new-cert.pem \
  -inkey myappkey.pem \
  -out newmyapp-renewed.p12 \
  -name myappkey \
  -passout pass:你的密码
```

---

## ⚠️ 重要注意事项

### 路径编码问题
Cordova + Gradle + Java 都对非 ASCII 路径敏感，会导致处理中文文件名时行为异常。

**解决方案**：
```bash
apt update && apt install -y locales
locale-gen en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale
```

**任务执行失败**：
```bash
> Task :app:mergeReleaseAssets FAILED
FAILURE: Build failed with an exception.
* What went wrong:
Execution failed for task ':app:mergeReleaseAssets'.
> Changes are not tracked, unable determine incremental changes.
```

### JDK 版本兼容性
- **v2.0.0+**: 用 `keytool -genkey` 和 `jarsigner` 可能出现警告，推荐使用 `keytool -genkeypair` 和 `apksigner`
- **JDK 9+**: 请用 `-genkeypair`（`-genkey` 已废弃）
- SHA1 已被弃用，请用 SHA256

**警告信息**：
```
#Warning: The signer's certificate is self-signed. The SHA1 algorithm specified for the -digestalg option is considered a security risk and is disabled. The SHA1withRSA algorithm specified for the -sigalg option is considered a security risk and is disabled. POSIX file permission and/or symlink attributes detected. These attributes are ignored when signing and are not protected by the signature.

```

### Gradle 版本兼容性
- 首次下载完整版 Gradle，检查网络连接
- **Cordova 10**: 使用 `gradle 6.5-all`，下载 `distributionUrl=https://services.gradle.org/distributions/gradle-6.5-all.zip`
- ⚠️ 注意：`cordova platform add android@10.0.0` 会下载 `gradle 7.x`（Cordova 10 不支持）

### 依赖仓库问题
由于 jcenter 已废弃，需要替换依赖源。

**替换为阿里云镜像**：
```gradle
repositories {
    maven { url 'https://maven.aliyun.com/repository/central' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    maven { url 'https://maven.aliyun.com/repository/public' }
    maven { url 'https://maven.aliyun.com/repository/google' }
    google()
    mavenCentral()
}
```

---

## 📋 版本更新日志

### v3.0.0-rc.2, v2.0.0-rc.5, v1.0.0-rc.6

- 非 ASCII 路径敏感问题
- 添加 label说明

### v3.0.0-rc.1
- 添加 Cordova 13 打包环境

### v2.0.0-rc.4
**解决**: 非 ASCII 路径敏感问题
```bash
apt update && apt install -y locales
locale-gen en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

### v2.0.0-rc.3
- 同时包含 JDK 11 和 17

### v2.0.0-rc.2
- 添加 Cordova 12 打包脚本指令

### v1.0.0-rc.5
- 完整的构建脚本套件，支持多种签名方式

---

## 💡实践经验

1. **版本选择**: 新项目用 v2.0.0-rc.5，遗留项目用 v1.0.0-rc.6
2. **证书管理**: 使用 PKCS12 格式，推荐 apksigner 签名
3. **路径规范**: 避免中文和特殊字符
4. **缓存优化**: 挂载 gradle-caches 加速构建
5. **日志排查**: 使用 `docker logs` 和 `nohup` 启动脚本和日志输出 `nohup.log`，使用 `nohup sh build-scripts-short/apk-automatic-v2.sh > nohup.log 2>&1 &`
6. **脚本格式**: 确保脚本文件使用 Unix 格式（LF），避免 Windows 格式（CRLF）导致解析错误

---

*文档版本: 2025.12.2 | 维护者: github.com/gonggbb*