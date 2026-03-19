cordova : https://cordova.apache.org/docs/en/latest/

## Docker 启动

> [!TIP]
> 推荐Compose 构建启动容器

启动容器

> λ docker run -it -v .\:/root/.gradle -v .\:/workspace --name cordova-builder01 --privileged -u 0 -e KEYSTORE_PATH=/workspace/xx.keystore -e KEY_ALIAS=xx -e KEYSTORE_PASSWORD=password -e KEY_PASSWORD=password gamesg/cordovabuilder:v2.0.0-rc.5 bash -c "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && ln -sf /dev/stdout nohup.log && exec /bin/bash"

```bash
# build-scripts-short
root@05bb6cd2f485:/workspace# ll build-scripts-short/
total 20
drwxr-xr-x 2 root root 4096 Nov 28 10:27 ./
drwxr-xr-x 3 root root 4096 Nov 28 10:27 ../
-rwxr-xr-x 1 root root  299 Nov 24 08:46 apk-automatic-v2.sh*
-rwxr-xr-x 1 root root 2584 Nov 24 08:53 apk-build-sign-v2.sh*
-rwxr-xr-x 1 root root 2864 Nov 24 08:46 apk-init.sh*

# 自动签名脚本v2

root@05bb6cd2f485:/workspace# sh  build-scripts-short/apk-automatic-v2.sh

```

<img src="/v12/build-init.png" width="100%" />

## Docker 日志监控

```bash
C:\worksapce\project-20250903
# 查看日志
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
✅ APK 签名完成: /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
------------------------------------------------------
� APK 签名流程完成
```

<!-- 图片 docs\public\v12\build-init.png -->
<img src="/v12/build-ok.png" width="100%" />

## Gradle 分发地址

::: danger

自己网络需要访问通分发地址 : https://services.gradle.org/distributions/

:::

<img src="/gradle/index.png" width="100%" />

## Gradle 下载失败（SSL 握手异常）

```bash
Subproject Path: app
Downloading https://services.gradle.org/distributions/gradle-7.6-all.zip

Exception in thread "main" javax.net.ssl.SSLHandshakeException: Remote host terminated the handshake
        at java.base/sun.security.ssl.SSLSocketImpl.handleEOF(SSLSocketImpl.java:1715)
        at java.base/sun.security.ssl.SSLSocketImpl.decode(SSLSocketImpl.java:1514)
        at java.base/sun.security.ssl.SSLSocketImpl.readHandshakeRecord(SSLSocketImpl.java:1421)
        at java.base/sun.security.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:455)
```

## Gradle 下载成功并且签名成功

```bash
Subproject Path: app
Downloading https://services.gradle.org/distributions/gradle-7.6-all.zip
...............10%................20%................30%................40%...............50%................60%................70%................80%...............90%................100%


BUILD SUCCESSFUL in 2m 42s
71 actionable tasks: 71 executed
Built the following apk(s):
        /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
✅ APK 签名完成: /workspace/platforms/android/app/build/outputs/apk/release/app-release.apk
------------------------------------------------------
� APK 签名流程完成
```

## Gradle Cache

-v C:\worksapce\project-20250903\gradle-caches:/root/.gradle

二次构建，不用重新下载

<img src="/v12/build-v2.png" width="100%" />

## Execution failed for task ':app:mergeReleaseResources'.

```
Note: Recompile with -Xlint:deprecation for details.

> Task :app:mergeReleaseResources FAILED

FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:mergeReleaseResources'.
> A failure occurred while executing com.android.build.gradle.internal.res.ResourceCompilerRunnable
   > Resource compilation failed (Failed to compile resource file: /workspace/platforms/android/app/src/main/res/xml/config.xml: . Cause: javax.xml.stream.XMLStreamException: ParseError at [row,col]:[37,60]
     Message: http://www.w3.org/TR/1999/REC-xml-names-19990114#AttributePrefixUnbound?application&android:usesCleartextTraffic&android). Check logs for more details.

* Try:
> Run with --stacktrace option to get the stack trace.
> Run with --info or --debug option to get more log output.
> Run with --scan to get full insights.

* Get more help at https://help.gradle.org

Deprecated Gradle features were used in this build, making it incompatible with Gradle 8.0.

You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.

See https://docs.gradle.org/7.6/userguide/command_line_interface.html#sec:command_line_warnings

BUILD FAILED in 26s
47 actionable tasks: 47 executed
Command failed with exit code 1: /workspace/platforms/android/gradlew -b /workspace/platforms/android/build.gradle cdvBuildRelease
```

这个错误提示显示你的 Android 编译失败了，核心原因在于你的 **`config.xml` 文件中存在 XML 语法错误**，导致编译器无法识别某些属性。

具体原因和解决方法如下：

1. 核心原因：命名空间未绑定 (AttributePrefixUnbound)

错误信息中提到了：
`AttributePrefixUnbound?application&android:usesCleartextTraffic&android`

这通常意味着你在 `config.xml`（或者最终生成的 `AndroidManifest.xml`）中使用了带有 `android:` 前缀的属性（例如 `android:usesCleartextTraffic`），但是你**没有在文件根节点声明 Android 的命名空间**。

2. 解决方案

请检查你的 `/workspace/platforms/android/app/src/main/res/xml/config.xml` 文件（或者 Cordova 项目根目录下的 `config.xml`）。

步骤 A：检查根节点声明

确保你的 `<widget>` 或 `<edit-config>` 标签中包含了 `xmlns:android` 的定义。它应该看起来像这样：

````xml
<widget id="com.example.app" ...
    xmlns:android="http://schemas.android.com/apk/res/android">
    ```

 步骤 B：检查 `edit-config` 的写法
如果你是为了开启 HTTP 明文传输（Cleartext Traffic）而修改了配置，正确的写法通常如下：

```xml
<edit-config file="app/src/main/AndroidManifest.xml" mode="merge" target="/manifest/application">
    <application android:usesCleartextTraffic="true" />
</edit-config>
````

**注意：** 如果你在 `<application>` 标签里用了 `android:`，那么在 `config.xml` 顶部的 `<widget>` 标签里必须加上 `xmlns:android="http://schemas.android.com/apk/res/android"`。

排查建议

1.  **检查第 37 行：** 错误提示指向了 `[row,col]:[37,60]`。去看看那一行，是不是有一个 `android:xxxx` 的属性，但周围没有对应的命名空间定义。
2.  **清理缓存：** 修复完代码后，建议运行以下命令重新编译：
    ```bash
    cordova clean android
    cordova build android --release
    ```
