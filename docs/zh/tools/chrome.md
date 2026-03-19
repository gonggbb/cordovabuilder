## ADB 调试

![adb-device](/chrome/adb-device.png)

想要通过电脑上的 ADB（Android Debug Bridge）调试手机浏览器里的网页，流程其实非常直观。简单来说，就是建立一个从**手机浏览器内内核**到**电脑 Chrome 开发者工具**的桥梁。

以下是详细的操作步骤：

第一步：准备手机端（开启开发者模式）

你需要让手机处于“可被调试”的状态。

1.  **开启开发者选项**：进入手机 `设置` -> `关于手机` -> 连续点击 `版本号`（Build Number）7 次，直到提示已进入开发者模式。
2.  **开启 USB 调试**：返回设置，进入 `系统/附加设置` -> `开发者选项`，找到并打开 **USB 调试**。
3.  **连接电脑**：用数据线连接电脑，手机端弹出“允许 USB 调试吗？”对话框时，勾选“始终允许”并点击确定。

第二步：准备电脑端（环境检测）

确保你的电脑已经安装了 ADB 工具。

1.  打开终端（Windows 的 CMD/PowerShell 或 macOS 的 Terminal）。
2.  输入以下命令确认手机已连接：
    ```bash
    adb devices
    ```
3.  如果看到一串序列号后面跟着 `device` 字样，说明连接成功。

第三步：开始调试（Chrome Inspect）

这是最关键的一步，利用 Chrome 的内置工具进行远程连接。

1.  在手机上打开 **Chrome 浏览器**（或任何基于 Chromium 内核的浏览器，如 Edge、小米/华为自带浏览器等），并打开你想调试的网页。
2.  在电脑上的 Chrome 浏览器地址栏输入：
    `chrome://inspect/##devices`
3.  你会看到 **Remote Target** 下方列出了你的手机型号，以及手机上当前打开的所有网页标签页。
4.  点击对应标签页下方的 **inspect** 按钮。

## cordova run android --device --target=7e9ac4dc

![devtools](/chrome/devtools.png)

当你运行 `cordova run android` 时，Cordova 默认执行的是 `--debug` 编译模式（除非你手动加上 `--release`）。

- **包含了调试签名**：它使用的是 Android SDK 默认的调试密钥。
- **开启了远程调试开关**：正如前面聊到的，它会自动在 App 的原生代码里执行 `setWebContentsDebuggingEnabled(true)`。
- **没有代码混淆**：你的 JS 代码和 HTML 都是原汁原味的，方便你查看。

虽然 App 是以 Debug 模式运行的，但 `cordova run` 命令本身只负责**部署**。

- **它不能断点**：运行完这个命令后，你的终端（Terminal）通常就停止输出详细日志了。你无法在命令行里写 `step over` 或者看变量值。
- **它不能实时修改**：如果你发现页面按钮歪了，在命令行里是改不了的。

**这就是为什么你需要 `chrome://inspect`。**

完整的“Debug 链路”模型

| 阶段         | 执行动作               | 对应命令/工具         | 目的                                |
| :----------- | :--------------------- | :-------------------- | :---------------------------------- |
| **发射阶段** | 编译 + 安装 + 启动     | `cordova run android` | 让手机上出现这个 App 的图标并运行。 |
| **观察阶段** | 监控 + 报错 + 实时修改 | **Chrome DevTools**   | 像手术刀一样进入 App 内部看逻辑。   |

如果你不想打开 Chrome，只想看看 App 有没有崩溃，或者想看 `console.log` 的输出，你可以配合 **Logcat** 使用：

```bash
## 在运行完 cordova 后执行，实时查看手机日志
adb -s 7e9ac4dc logcat | grep chromium
```

这条命令会过滤出所有来自 Webview（浏览器内核）的日志。

## 调试模式 (Debug Build)

![chrome-device](/chrome/chrome-device.png)

Android 系统出于安全考虑，默认关闭了 WebView 的远程调试功能。

- ​**调试模式 (Debug Build)**​：当你开发一个 Cordova、Ionic、ReactNative 或原生混合 App 时，编译出的 **Debug 版** 默认开启了调试开关。
- ​**正式发布版 (Release Build)**​：你在应用商店下载的微信、支付宝、抖音等，开发者在打包时通常会关闭调试开关。这时候你在 `chrome://inspect` 里是看不到它们的

```

```
