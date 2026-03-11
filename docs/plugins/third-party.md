# Flashlight

The plugin version is outdated. Please upgrade the plugin version.

## cordova-plugin-qrscanner compatibility issue

[v10:❌]

```bash
cordova plugin add cordova-plugin-qrscanner
```

https://www.npmjs.com/package/cordova-plugin-qrscanner

<img src="/v10/compile.png" width="100%" />

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

## community-cordova-plugin-flashlight

[v10:✅]

```bash
cordova plugin add community-cordova-plugin-flashlight
```

https://www.npmjs.com/package/community-cordova-plugin-flashlight

# Device Diagnostic Plugin

## cordova-diagnostic-plugin

[v12:✅] "cordova.plugins.diagnostic": "^6.1.1",

Overview

This plugin is used for permission management and device status detection, providing permission guidance and access to permissions.

Key Features

- **Permission Detection**: Check if the app has specific permissions
- **Permission Request**: Request necessary permissions from the user
- **Permission Guidance**: Guide users to manually grant permissions in settings
- **Device Status**: Obtain various status information of the device

Installation Command

```bash
cordova plugin add cordova-diagnostic-plugin@6
```

Usage Examples

- [Official Example Usage](https://github.com/dpa99c/cordova-diagnostic-plugin?tab=readme-ov-file#example-usage-1)
- [TypeScript Definition File](https://github.com/dpa99c/cordova-diagnostic-plugin/blob/fe6e1b802ac6f1d1b517217961f880ef4ee8263f/cordova.plugins.diagnostic.d.ts#L78)

Common Application Scenarios

- Camera permission request
- Location permission request
- Storage permission request
- Bluetooth permission management
- Location service status detection

Important Notes

- This plugin is very useful for applications that need to access device hardware features
- Supports both iOS and Android platforms
- Provides detailed permission status feedback, which helps optimize user experience
