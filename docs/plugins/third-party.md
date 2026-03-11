<!-- ---
Third Party
--- -->

# Flashlight

The plugin version is outdated. Please upgrade the plugin version.

## cordova-plugin-qrscanner [v10:❌]

cordova plugin add cordova-plugin-qrscanner

https://www.npmjs.com/package/cordova-plugin-qrscanner

<img src="/v10/compile.png" width="100%" />

<!-- * VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" /> -->

```bash
BUILD SUCCESSFUL in 3s
1 actionable task: 1 executed
Subproject Path: CordovaLib
Subproject Path: app

> Configure project :app
WARNING: Configuration 'compile' is obsolete and has been replaced with 'implementation' and 'api'.
It will be removed in version 5.0 of the Android Gradle plugin.
For more information, see http://d.android.com/r/tools/update-dependency-configurations.html.

> Configure project :CordovaLib
[Cordova] cdvMinSdkVersion is overridden, try it at your own risk.
```

## community-cordova-plugin-flashlight [v10:✅]

cordova plugin add community-cordova-plugin-flashlight

https://www.npmjs.com/package/community-cordova-plugin-flashlight

# 设备诊断插件

## cordova-diagnostic-plugin [v12:✅]

功能概述

此插件用于权限管理和设备状态检测，提供权限引导和获取权限的功能。

主要特性

- **权限检测**：检查应用是否拥有特定权限
- **权限请求**：向用户请求必要的权限
- **权限引导**：引导用户到设置页面手动授予权限
- **设备状态**：获取设备的各种状态信息

安装命令

```bash
cordova plugin add cordova-diagnostic-plugin@6
```

使用示例

- [官方示例用法](https://github.com/dpa99c/cordova-diagnostic-plugin?tab=readme-ov-file#example-usage-1)
- [TypeScript 定义文件](https://github.com/dpa99c/cordova-diagnostic-plugin/blob/fe6e1b802ac6f1d1b517217961f880ef4ee8263f/cordova.plugins.diagnostic.d.ts#L78)

常见应用场景

- 相机权限申请
- 位置权限申请
- 存储权限申请
- 蓝牙权限管理
- 定位服务状态检测

重要提示

- 此插件对于需要访问设备硬件功能的应用非常有用
- 支持 iOS 和 Android 平台
- 提供详细的权限状态反馈，有助于用户体验优化
