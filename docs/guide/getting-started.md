## Quick Start

## Pulling images

```bash
# Production recommendation
docker pull gamesg/cordovabuilder:v2.0.0-rc.5
docker pull ghcr.io/gonggbb/docker-cordovabuilder:v2.0.0-rc.4

# Compatibility with older versions
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


## Startup script

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


## Detailed Parameter Explanation


| Parameter | Description |
| --------------- | ------------------------------- |
| `-it`           | Interactive mode + pseudo terminal |
| `-v`            | Mount volumes (Gradle cache + working directory) |
| `--name`        | Container naming                      |
| `--privileged`  | Privileged mode (⚠️ Security risk) |
| `-u 0`          | Run as root user                |
| `-e`            | Environment variable (keystore configuration) |
| `bash -c "..."` | Execute initialization script at startup |


## Available build scripts built into the container

| Script                        | v3.0.0 | v2.0.0 | v1.0.0 | Functionality                |
| ----------------------------- | ------ | ------ | ------ | ---------------------------- |
| `apk-automatic-v2.sh`         | ✅     | ✅     | ✅     | Automated build (apksigner)  |
| `apk-build-sign-v2.sh`        | ✅     | ✅     | ✅     | Package + Sign (apksigner)   |
| `apk-init.sh`                 | ✅     | ✅     | ✅     | Environment initialization   |
| `apk-automatic.sh`            | ❌     | ❌     | ✅     | Automated build (jarsigner)  |
| `apk-replace-repositories.sh` | ✅     | ✅     | ✅     | Replace jcenter dependencies |


## Line continuation character comparison table

| Platform | Line break | Example |
| ------------------ | ------- | ---------------- |
| Windows CMD        | `^`     | `-v path ^`      |
| Windows PowerShell | `` ` `` | `-v path `` ` `` |
| macOS/Linux        | `\`     | `-v path \`      |

---

## Project initialization

```bash
cordova create myApp org.apache.cordova.myApp myApp
cordova platform add android
cordova plugin add cordova-plugin-camera
cordova requirements android
```

## Build Command

```bash
# Debugging and building
cordova build android --verbose

# Release build + Signing (recommended)
cordova build android --release -- --packageType=apk \
  --keystore=/workspace/myapp.p12 --keystoreType=PKCS12 \
  --storePassword=password --alias=myappkey --password=password
```
