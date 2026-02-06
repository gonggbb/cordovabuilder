cordova : https://cordova.apache.org/docs/en/latest/

## Docker Startup

```bash
# Start the container
λ docker run -it  -v C:\worksapce\project-20250903\gradle-caches:/root/.gradle  -v C:\worksapce\project-20250903:/workspace  --name cordova-builder01 --privileged  -u 0 -e KEYSTORE_PATH=/workspace/xx.keystore -e KEY_ALIAS=xx -e KEYSTORE_PASSWORD=password  -e KEY_PASSWORD=password gamesg/cordovabuilder:v2.0.0-rc.5 bash -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && ln -sf /dev/stdout nohup.log && exec /bin/bash"
# build-scripts-short
root@05bb6cd2f485:/workspace# ll build-scripts-short/
total 20
drwxr-xr-x 2 root root 4096 Nov 28 10:27 ./
drwxr-xr-x 3 root root 4096 Nov 28 10:27 ../
-rwxr-xr-x 1 root root  299 Nov 24 08:46 apk-automatic-v2.sh*
-rwxr-xr-x 1 root root 2584 Nov 24 08:53 apk-build-sign-v2.sh*
-rwxr-xr-x 1 root root 2864 Nov 24 08:46 apk-init.sh*

# Automatic Signature Script v2

root@05bb6cd2f485:/workspace# sh  build-scripts-short/apk-automatic-v2.sh 

```

<img src="/v12/build-init.png" width="100%" />

## Docker Log Monitoring

```bash
C:\worksapce\project-20250903
# View logs
λ docker ps -a
CONTAINER ID   IMAGE                               COMMAND                   CREATED         STATUS         PORTS
 NAMES
05bb6cd2f485   gamesg/cordovabuilder:v2.0.0-rc.5   "bash -c 'ln -sfn /o…"   2 minutes ago   Up 2 minutes
 cordova-builder01

C:\worksapce\project-20250903
λ docker logs -f 05
root@05bb6cd2f485:/workspace# ll build-scripts-short/
total 20
drwxr-xr-x 2 root root 4096 Nov 28 10:27 ./
drwxr-xr-x 3 root root 4096 Nov 28 10:27 ../
-rwxr-xr-x 1 root root  299 Nov 24 08:46 apk-automatic-v2.sh*
-rwxr-xr-x 1 root root 2584 Nov 24 08:53 apk-build-sign-v2.sh*
-rwxr-xr-x 1 root root 2864 Nov 24 08:46 apk-init.sh*
root@05bb6cd2f485:/workspace# sh  build-scripts-short/apk-automatic-v2.sh
....
BUILD SUCCESSFUL in 2m 42s
71 actionable tasks: 71 executed
Built the following apk(s):
        /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
✅ APK signing completed: /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
------------------------------------------------------
APK signing process completed
```

<!-- Image docs\public\v12\build-init.png -->
<img src="/v12/build-ok.png" width="100%" />

## Gradle distribution address

::: danger

The distribution address for accessing your own network is: https://services.gradle.org/distributions/

:::

<img src="/gradle/index.png" width="100%" />

## Gradle download failed (SSL handshake exception)

```bash
Subproject Path: app
Downloading https://services.gradle.org/distributions/gradle-7.6-all.zip

Exception in thread "main" javax.net.ssl.SSLHandshakeException: Remote host terminated the handshake
        at java.base/sun.security.ssl.SSLSocketImpl.handleEOF(SSLSocketImpl.java:1715)
        at java.base/sun.security.ssl.SSLSocketImpl.decode(SSLSocketImpl.java:1514)
        at java.base/sun.security.ssl.SSLSocketImpl.readHandshakeRecord(SSLSocketImpl.java:1421)
        at java.base/sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:455)
```

## Gradle download and signing successful

```bash
Subproject Path: app
Downloading https://services.gradle.org/distributions/gradle-7.6-all.zip
...............10%................20%................30%................40%...............50%................60%................70%................80%...............90%................100%


BUILD SUCCESSFUL in 2m 42s
71 actionable tasks: 71 executed
Built the following apk(s):
        /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
✅ APK signing completed: /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
------------------------------------------------------
APK signing process completed
```

## Gradle Cache

It can't be downloaded and copied

> -v C:\worksapce\project-20250903\gradle-caches:/root/.gradle 

Secondary construction, no need to download again

<img src="/v12/build-v2.png" width="100%" />
