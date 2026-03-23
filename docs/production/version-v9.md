## Docker Startup

> [!TIP]
> It is recommended to build the startup container with Compose

<!-- > [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。 -->

```cmd
λ docker run -it -v .\:/root/.gradle -v .\:/workspace --name cordova-builder01 --privileged -u 0 -e KEYSTORE_PATH=/workspace/xx.keystore -e KEY_ALIAS=xx -e KEYSTORE_PASSWORD=password -e KEY_PASSWORD=password gamesg/cordovabuilder:v1.0.0-rc.7 bash -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && ln -sf /dev/stdout nohup.log && exec /bin/bash"
```

```bash
# Start the container
root@11bd0d4a12a9:/workspace# sh build-scripts-short/apk-init.sh

# 自动构建
root@11bd0d4a12a9:/workspace# sh build-scripts-short/apk-automatic.sh

# build-scripts-short
root@11bd0d4a12a9:/workspace# ll -ls build-scripts-short/
total 40
4 drwxr-xr-x 2 root root 4096 Feb 11 02:01 ./
4 drwxr-xr-x 1 root root 4096 Feb 11 02:01 ../
4 -rwxr-xr-x 1 root root  110 Feb 11 01:26 apk-automatic.sh*
4 -rwxr-xr-x 1 root root  468 Feb 11 01:40 apk-build.sh*
4 -rwxr-xr-x 1 root root  104 Feb 11 01:38 apk-build-sign.sh*
4 -rwxr-xr-x 1 root root  107 Feb 11 01:38 apk-build-sign-v2.sh*
4 -rwxr-xr-x 1 root root 2770 Feb 11 01:41 apk-init.sh*
4 -rwxr-xr-x 1 root root  838 Feb 11 01:45 apk-replace-repositories.sh*
4 -rwxr-xr-x 1 root root 1437 Feb 11 01:45 apk-sign.sh*
4 -rwxr-xr-x 1 root root 2095 Feb 11 01:45 apk-sign-v2.sh*

```

<img src="/v10/build-ok.png" width="100%" />
