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


## Docker start command in PowerShell (Windows)
```powershell
# Automatically set soft links
docker run -it `
  "-v C:\workspace\project directory:/workspace"
  -v C:\workspace\project_directory\gradle-caches:/root/.gradle `
  --name cordova-builder-$(Get-Date -Format yyyyMMddHHmmss) `
  --privileged `
  -u 0 `
  "-e KEYSTORE_PATH=/workspace/your_signature_file"
  -e KEY_ALIAS=xx `
  -e KEYSTORE_PASSWORD=Your password
  -e KEY_PASSWORD=your password
  gamesg/cordovabuilder:v2.0.0-rc.5 `
  bash 
```

## Docker start command in Bash (Linux/macOS)
```bash
# Automatically set soft links
docker run -it \
  -v /home/workspace/project_directory:/workspace \
  -v /home/workspace/project_directory/gradle-caches:/root/.gradle \
  --name cordova-builder-$(date +%s) \
  --privileged \
  -u 0 \
  -e KEYSTORE_PATH=/workspace/your signature file \
  -e KEY_ALIAS=xx \
  -e KEYSTORE_PASSWORD=Your password \
  -e KEY_PASSWORD=Your password \
  gamesg/cordovabuilder:v2.0.0-rc.5 \
  bash 
```

## Docker start command to set up build script soft links and log output
bash -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && ln -sf /dev/stdout nohup.log && exec /bin/bash"

## Docker startup script sets up soft links for build scripts and logs output

-v /home/workspace/project_directory/build-script-ln.sh:/build-script-ln.sh \
bash /build-script-ln.sh

Create `build-script-ln.sh`:
```bash
#!/bin/bash
ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short
ln -sf /dev/stdout nohup.log
exec /bin/bash
```

## Available build scripts built into the container

| Script | v3.0.0 | v2.0.0 | v1.0.0 | Functionality |
|------|--------|--------|--------|------|
| `apk-automatic-v2.sh` | ✅ | ✅ | ✅ | Automated build (apksigner) |
| `apk-build-sign-v2.sh` | ✅ | ✅ | ✅ | Package + Sign (apksigner) |
| `apk-init.sh` | ✅ | ✅ | ✅ | Environment initialization |
| `apk-automatic.sh` | ❌ | ❌ | ✅ | Automated build (jarsigner) |
| `apk-replace-repositories.sh` | ✅ | ✅ | ✅ | Replace jcenter dependencies |
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