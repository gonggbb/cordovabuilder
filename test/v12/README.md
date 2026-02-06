# Cordova 13 混合 App 构建环境 - images v3.0.0-rc.1 

-  2025.11.25 最新发布的Cordova 13 

| 组件            | 版本    | 实际版本 |
| --------------- | ------- | -------- |
| cordova-android | 13.0.x  |          |
| Build Tools     | ^34.0.0 |          |
| Gradle          | 8.7     |          |
| Java            | 17.0.10 |          |
| Node.js         | ≥ 16.13 | 20.19.5  |
| Cordova         | 13      |          |
# Cordova 12 混合 App 构建环境 - images v2.0.0-rc.x

| 组件            | 版本    | 实际版本 |
| --------------- | ------- | -------- |
| cordova-android | 12.0.x  |          |
| Build Tools     | ^33.0.2 |          |
| Gradle          | 7.6     |          |
| Java            | 11      | 17.0.10  |
| Node.js         | ≥ 16.13 | 18.20.8  |
| Cordova         | 12      |          |

# Cordova10 混合 App 构建环境 - images v1.0.0-rc.x

| 组件            | 版本        | 实际版本 |
| --------------- | ----------- | -------- |
| cordova-android | ^9.1.0      |          |
| SDK             | 30 (30.0.3) |          |
| Gradle          | 6.5-all     |          |
| Java            | 1.8         |          |
| Node.js         | 10.15.3     |          |
| Cordova         | 10          |          |

# ▶️ Windows 启动脚本

手动创建，powershell 启动【不是 cmd】 `run-cordovabuilder.ps1`

- 添加 `nohup` 启动脚本和日志输出 `nohup.log `
- nohup sh build-scripts-short/apk-automatic-v2.sh > nohup.log 2>&1 &
- docker logs container_name

🙈 注意：文件里混用了 Windows 换行符（CRLF），Linux 的 /bin/sh 把整段当成一行解析，也会报同样的 “expecting then”

## images v2.0.0-rc.4

解决该问题 ⚠️ 注意：Cordova + Gradle + Java 都对非 ASCII 路径敏感。会导致处理中文文件名时行为异常

```bash
apt update && apt install -y locales
locale-gen en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale
```

```bash
> Task :app:mergeReleaseAssets FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeReleaseAssets'.
> Changes are not tracked, unable determine incremental changes.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
```

- 纯镜像

```bash
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v2.0.0-rc.2
```

```powershell

param(
    [string]$ProjectPath = "C:\worksapce\项目目录",
    [string]$GradleCachePath = "C:\worksapce\项目目录\gradle-caches"
)

# 生成随机容器名
$RandomId = -join ((65..90) + (97..122) | Get-Random -Count 8 | % {[char]$_})
$ContainerName = "test-server-$RandomId"
docker run -it `
  -v ${ProjectPath}:/workspace `
  -v ${GradleCachePath}:/root/.gradle `
  -v ${ProjectPath}/build-script-ln.sh:/build-script-ln.sh `
  --name $ContainerName `
  --privileged `
  -u 0 `
  -e KEYSTORE_PATH=/workspace/xx.p12 `
  -e KEY_ALIAS=xx `
  -e KEYSTORE_PASSWORD=自己的密码 `
  -e KEY_PASSWORD=自己的密码 `
  gamesg/cordovabuilder:v2.0.0-rc.2 bash /build-script-ln.sh

```

- build-script-ln.sh

```shell
#!/bin/bash
# File Name:apk-automatic-v2
# Version:V1.0
# Author:gamesg
# Organization:github.com/gonggbb
# Desc: 构建脚本初始化入口
#############################################
ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short
ln -sf /dev/stdout nohup.log
exec /bin/bash
```

## images v1.0.0-rc.x

- 纯镜像

```bash
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v1.0.0-rc.5
```

```powershell

param(
    [string]$ProjectPath = "C:\worksapce\项目目录",
    [string]$GradleCachePath = "C:\worksapce\项目目录\gradle-caches"
)


docker run -it `
  -v ${ProjectPath}:/workspace `
  -v ${GradleCachePath}:/root/.gradle `
  -u 0 `
  -e KEYSTORE_PATH=/workspace/xx.keystore `
  -e KEY_ALIAS=xx `
  -e KEYSTORE_PASSWORD=自己的密码 `
  -e KEY_PASSWORD=自己的密码 `
  gamesg/cordovabuilder:v1.0.0-rc.5 bash -c "
    ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short &&
    nohup sh build-scripts-short/apk-automatic-v2.sh > nohup.log 2>&1 &
    exec /bin/bash"
```

# 1. 项目初始化与构建

```bash
# 创建 Cordova 项目
cordova create myApp org.apache.cordova.myApp myApp

# 添加插件
cordova plugin add cordova-plugin-camera

# 添加 Android 平台
cordova platform add android

# 添加插件和平台（不保存到 config.xml）
cordova plugin add cordova-plugin-camera --nosave
cordova platform add android --nosave

# 检查 Android 平台需求
cordova requirements android

# 构建 Android 应用（详细模式）
cordova build android --verbose

# 在设备上运行应用
cordova run android

# 构建发布版本 APK
cordova build android --release -- --keystore="..\android.keystore" --storePassword=android --alias=mykey

# 查看 Cordova 配置
cordova config ls
```

# 2. 数字证书生成

## 传统方式（适用于旧版 JDK）

```bash
keytool -genkey -alias myappkey \
  -keystore "/workspace/myApp/newmyapp.p12" \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125  \
  -keyalg RSA
```

## 推荐方式（适用于 JDK 9+） 😄

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

# 3. APK 签名

## 使用 jarsigner（传统方式）

```bash
jarsigner -verbose \
  -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 -keypass 你的密码 \
  app-release-unsigned.apk myappkey
```

## 使用 apksigner（推荐方式） 😄

```bash
apksigner sign \
  --ks newmyapp-renewed.p12 \
  --ks-pass pass:你的密码 \
  --ks-key-alias myappkey \
  --key-pass pass:你的密码 \
  --out platforms/android/app/build/outputs/apk/release/app-release-signed.apk \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

# 4. 签名验证 😄

```bash
# 验证 APK 签名
jarsigner -verify -verbose -certs app-release-unsigned.apk

# 查看密钥库内容
keytool -list -v -keystore newmyapp-renewed.p12

# 从 APK 中提取并显示证书信息
keytool -printcert -jarfile platforms/android/app/build/outputs/apk/release/app-release-signed.apk
```

# 5. 证书升级与转换

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

# 6. 通过 Cordova CLI 直接构建和签名 😄

```bash
cordova build android --release  -- --packageType=apk \
  --keystore=/workspace/myApp/newmyapp-renewed.p12 \
  --keystoreType=PKCS12 \
  --storePassword=你的密码 \
  --alias=myappkey \
  --password=你的密码
```

# ⚠️ 注意事项

## images v2.0.0-rc.2

用 keytool -genkey 和 jarsigner 出现下面情况, 推荐 😄 用 keytool -genkeypair 和 apksigner

- JDK 9+ 请用 -genkeypair（-genkey 已废弃）keytool -genkey 生成了 RSA + SHA1 默认算法 的密钥对,SHA1 标记为“弱算法”，验证时直接判“无效签名”
  #Warning: The signer's certificate is self-signed. The SHA1 algorithm specified for the -digestalg option is considered a security risk and is disabled. The SHA1withRSA algorithm specified for the -sigalg option is considered a security risk and is disabled. POSIX file permission and/or symlink attributes detected. These attributes are ignored when signing and are not protected by the signature.

## images v1.0.0-rc.x

`cordova-fetch for cordova-android`

```bash
Thanks for opting into telemetry to help us improve cordova.
10.0.0 (cordova-lib@10.1.0)
------------------------------------------------------
⚙️  准备 Cordova Android 平台...
(node:54) ExperimentalWarning: The fs.promises API is experimental
Using cordova-fetch for cordova-android@^9.1.0

```

⚠️ 注意：`cordova platform add android@10.0.0` 会下载 `gradle 7.x` 【不支持】

⚠️ 注意：gradle 6.5-all 首次构建 `cordova build android` 会下载 【distributionUrl=https://services.gradle.org/distributions/gradle-6.5-all.zip】

# 📦 版本说明

## 🔄 v3.0.0-rc.1

- 添加 `cordova13` 的打包环境

## 🔄 v2.0.0-rc.4 😄

解决 ： ⚠️ 注意：Cordova + Gradle + Java 都对非 ASCII 路径敏感。会导致处理中文文件名时行为异常

```bash
apt update && apt install -y locales
locale-gen en_US.UTF-8
export LC_ALL=en_US.UTF-8
locale
```

```bash
> Task :app:mergeReleaseAssets FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeReleaseAssets'.
> Changes are not tracked, unable determine incremental changes.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.
```

## 🔄 v2.0.0-rc.3 

- jdk 17 改成 jdk 11，镜像俩者都有

## 🔄 v2.0.0-rc.2 

- 添加 `cordova12` 的打包脚本指令

```bash
root@fb13349b82a6:/workspace# ll build-scripts-short/
total 20
drwxr-xr-x 2 root root 4096 Nov 24 08:54 ./
drwxr-xr-x 3 root root 4096 Nov 24 08:54 ../
-rwxr-xr-x 1 root root  299 Nov 24 08:46 apk-automatic-v2.sh*
-rwxr-xr-x 1 root root 2584 Nov 24 08:53 apk-build-sign-v2.sh*
-rwxr-xr-x 1 root root 2864 Nov 24 08:46 apk-init.sh*
```

## 🔄 v2.0.0-rc.1

- 添加 `cordova12` 的打包环境

## 🔄 v1.0.0-rc.5 😄

```powershell
Name
----
apk-automatic-v2.sh            # 自动化构建 apksigner v2 签名
apk-automatic.sh               # 自动化构建 jarsigner 签名
apk-build-sign-v2.sh           # 打包 apksigner v2 签名
apk-build-sign.sh              # 打包 jarsigner 签名
apk-build.sh                   # 构建
apk-init.sh                    # 初始化环境
apk-replace-repositories.sh    # 替换jcenter依赖
apk-sign-v2.sh                 # apksigner v2 签名
apk-sign.sh                    # jarsigner 签名
```

## 🔄 v1.0.0-rc.4.1

- 包含 v1.0.0-rc.4 feat:1 ; v1.0.0-rc.4 feat:2

- feat:1 gradle-6.5-all.zip\*下载失败手动替换 `/root/.gradle/wrapper/dists/gradle-6.5-all/2oz4ud9k3tuxjg84bbf55q0tn/gradle-6.5-all.zip`

- 2oz4ud9k3tuxjg84bbf55q0tn 随机的

```bash
root@73578b1a6311:/# ll /root/.gradle/wrapper/dists/gradle-6.5-all/2oz4ud9k3tuxjg84bbf55q0tn/
total 142352
drwxr-xr-x 1 root root      4096 Nov 13 06:35 ./
drwxr-xr-x 1 root root      4096 Nov 13 06:34 ../
drwxr-xr-x 1 root root      4096 Nov 13 06:35 gradle-6.5/
-rw-r--r-- 1 root root 145767155 Nov 13 06:34 gradle-6.5-all.zip
-rw-r--r-- 1 root root         0 Nov 13 06:34 gradle-6.5-all.zip.lck
-rw-r--r-- 1 root root         0 Nov 13 06:35 gradle-6.5-all.zip.ok

```

## 🔄 v1.0.0-rc.4

- /opt/app-env 新增环境和配置文件

```bash
drwxr-xr-x 1 root root      4096 Nov 13 06:56 build-scripts/
-rwxr-xr-x 1 root root 145767155 Nov 12 01:33 gradle-6.5-all.zip*
drwxr-xr-x 2 root root      4096 Nov 12 10:06 platforms-files/
```

- feat:1 `v1.0.0-rc.1 fix:1.1` apk-replace-repositories.sh 替换`jcenter`依赖

- feat:2 添加 `gradle-caches.tar.gz` 缓存文件，优化构建速度

  启动的时候 gradle-caches 镜像挂载的目录 `C:\worksapce\项目目录\gradle-caches:/root/.gradle`

  挂载参数:

  ```bash
  -v ${GradleCachePath}:/root/.gradle `
  -u 0 `
  ```

  tar -xzf /workspace/gradle-caches.tar.gz -C /workspace

```bash
drwxr-xr-x 1 root root      4096 Nov 13 06:35 gradle-caches/
```

- feat:3：添加 `build-scripts` 软链接，打包脚本会自动创建软链接

```bash
  apk-init.sh*                  # 初始化环境
  apk-replace-repositories.sh*  # 替换jcenter依赖
  apk-build-sign.sh*            # 打包签名
  apk-build.sh*                 # 打包
  apk-sign.sh*                  # 签名
  build-scripts -> /opt/app-env/build-scripts/
```

## 🔄 v1.0.0-rc.3

- 修复 `v1.0.0-rc.1 fix:1.0` 需要进入手动容器设置 GRADLE_HOME

## 🔄 v1.0.0-rc.1（初始版本）

### 修复内容

- `fix:1.0` 需要进入容器设置 `export GRADLE_HOME=/opt/gradle/gradle`
- `fix:1.1` `jcenter` 依赖替换

> `platforms/android/CordovaLib/cordova.gradle` > `platforms/android/CordovaLib/repositories.gradle` > `platforms/android/repositories.gradle`

- `platforms\android\CordovaLib\cordova.gradle`

```bash
buildscript {
    repositories {
      maven { url 'https://maven.aliyun.com/repository/central' }
      maven { url 'https://maven.aliyun.com/repository/jcenter' }
      maven { url 'https://maven.aliyun.com/repository/public' }
      maven { url 'https://maven.aliyun.com/repository/google' }
      google()
      mavenCentral()
    //   maven { url 'https://jitpack.io' }
    //   maven { url "https://plugins.gradle.org/m2/" }
    //   maven { url uri('../local-m2') }
    //   jcenter()
    }

    dependencies {
        // classpath 'libs/gradle-bintray-plugin-1.7.3.jar'
        // classpath 'com.g00fy2:versioncompare:1.3.4@jar'
        classpath 'io.github.g00fy2:versioncompare:1.4.0@jar'

    }
}
```

- `platforms\android\CordovaLib\repositories.gradle`
- `platforms\android\repositories.gradle`

```bash

ext.repos = {
    // google()
    // jcenter()
      maven { url 'https://maven.aliyun.com/repository/central' }
      maven { url 'https://maven.aliyun.com/repository/jcenter' }
      maven { url 'https://maven.aliyun.com/repository/public' }
      maven { url 'https://maven.aliyun.com/repository/google' }
      google()
      mavenCentral()
}

```
