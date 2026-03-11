# ADB & Scrcpy 使用指南

这是一个关于 Android Debug Bridge (ADB) 和 Scrcpy 工具使用的详细指南，涵盖了常见问题和解决方案。

## 资源链接

- [Scrcpy GitHub 主页](https://github.com/Genymobile/scrcpy?tab=readme-ov-file)
- [Scrcpy 连接文档](https://github.com/Genymobile/scrcpy/blob/master/doc/connection.md)
- [Scrcpy v3.3.4 发布页面](https://github.com/Genymobile/scrcpy/releases/tag/v3.3.4)
- [Android ADB 官方文档](https://developer.android.com/tools/adb?hl=zh-cn)

## Scrcpy WiFi 连接方式

![LocalSend Logo](/cordova/adb-scropy.png)

### 方式一：USB 首次配对后转 WiFi（推荐）

#### 第一步：首次 USB 连接激活

```bash
# 1. 先用 USB 线连接手机，确认 ADB 能识别
adb devices

# 2. 让设备监听 TCP/IP 连接（默认端口 5555）
adb tcpip 5555
```

#### 第二步：断开 USB，切换 WiFi

```bash
# 3. 查看手机 WiFi IP 地址（设置 → 关于手机 → 状态信息）

# 4. 无线连接（替换 your_ip 为实际 IP）
adb connect your_ip:5555

# 5. 启动 Scrcpy
scrcpy
```

### 常用命令参数

| 操作         | 命令                                     |
| ------------ | ---------------------------------------- |
| 查看设备 IP  | `adb shell ip route` 或 `ifconfig wlan0` |
| 指定设备启动 | `scrcpy -s your_ip:5555`                 |
| 降低画质提速 | `scrcpy -m 1024 -b 2M`                   |
| 只投屏不控制 | `scrcpy -n`                              |
| 全屏模式     | `scrcpy -f`                              |

## 多设备连接问题解决

当 USB 和 WiFi 同时连接时，Scrcpy 会出现以下错误：

```
ERROR: Multiple (2) ADB devices:
ERROR: --> (usb) askdlskdf device Redmi_Note_x
ERROR: --> (tcpip) 192.168.40.16:5555 device Redmi_Note_x
```

### 解决方案

#### 方案 1：断开 USB，只用 WiFi（推荐）

直接拔掉 USB 数据线，然后重新运行：

```bash
.\scrcpy.exe
```

#### 方案 2：指定使用 WiFi 连接

```bash
.\scrcpy.exe -e
```

或

```bash
.\scrcpy.exe --select-tcpip
```

#### 方案 3：指定使用 USB 连接

```bash
.\scrcpy.exe -d
```

或

```bash
.\scrcpy.exe --select-usb
```

#### 方案 4：指定具体 IP 地址

```bash
.\scrcpy.exe -s 192.168.40.16:5555
```

### 参数对照表

| 参数          | 含义             | 使用场景       |
| ------------- | ---------------- | -------------- |
| `-d`          | 选择 USB 设备    | 插着线想用有线 |
| `-e`          | 选择 TCP/IP 设备 | 想用 WiFi 无线 |
| `-s <序列号>` | 指定具体设备     | 多设备精确控制 |

## ADB 常用命令

| 命令                         | 作用           |
| ---------------------------- | -------------- |
| `adb devices`                | 查看连接的设备 |
| `adb connect IP:端口`        | 无线连接设备   |
| `adb disconnect`             | 断开无线连接   |
| `adb shell`                  | 进入手机命令行 |
| `adb install xxx.apk`        | 安装应用       |
| `adb push 电脑文件 手机路径` | 传文件到手机   |
| `adb pull 手机文件 电脑路径` | 从手机拉文件   |

### 多设备时指定操作目标

当存在多个设备时，可以使用 `-s` 参数指定特定设备：

| 命令                                               | 作用                 |
| -------------------------------------------------- | -------------------- |
| `adb -s 192.168.40.16:5555 shell`                  | 进入指定设备的 shell |
| `adb -s 192.168.40.16:5555 install app.apk`        | 给指定设备安装应用   |
| `adb -s 192.168.40.16:5555 push file.txt /sdcard/` | 传文件到指定设备     |

## ADB Shell 使用

成功进入 ADB Shell 后的常用操作：

### 查看可访问的目录

```bash
# 进入存储目录（有权限）
cd /sdcard
ls

# 或
cd /storage/emulated/0
ls
```

### 查看系统信息

```bash
# 查看 Android 版本
getprop ro.build.version.release

# 查看设备型号
getprop ro.product.model

```

### 文件操作（在 /sdcard 下有权限）

```bash
cd /sdcard

# 查看文件
ls -la

# 创建文件夹
mkdir test_folder

# 查看当前路径
pwd
```

### 退出 ADB Shell

```bash
exit
# 或按 Ctrl+D
```

### ADB Shell 实际用途

- **查看日志**：`logcat`
- **安装应用**：`pm install xxx.apk`
- **截屏**：`screencap /sdcard/screen.png`
- **录屏**：`screenrecord /sdcard/video.mp4`
- **重启手机**：`reboot`

## 版本信息

当前 ADB 版本：

```
Android Debug Bridge version 1.0.41
Version 36.0.0-13206524
```

## 注意事项

1. 如果手机未 Root，`su` 命令会提示 `Permission denied`
2. Android 10 及以下版本不支持音频传输
3. 建议配置好 WiFi 连接后拔掉 USB 线，避免多设备冲突
4. Scrcpy 需要确保防火墙没有阻止相应端口

## 日志

```ps1
adb devices -l
List of devices attached
192.168.40.16:5555 device product:lavender model:Redmi_Note_x device:lavender transport_id:6

 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  .\adb.exe --version
Android Debug Bridge version 1.0.41
Version 36.0.0-13206524
Installed as C:\Users\user\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4\adb.exe
Running on Windows 10.0.26200
 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  adb.exe --version
Android Debug Bridge version 1.0.41
Version 36.0.0-13206524
Installed as C:\Users\user\AppData\Local\Android\Sdk\platform-tools\adb.exe
Running on Windows 10.0.26200
 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  adb -s askdlskdf shell
adb.exe: device 'askdlskdf' not found
 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  adb devices
List of devices attached
192.168.40.16:5555 device

 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  adb -s 192.168.40.16:5555 shell
lavender:/ $ su
/system/bin/sh: su: inaccessible or not found
127|lavender:/ $ exit
 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  adb pair 192.168.40.16:5555
Enter pairing code: 139422 # 自己的
error: protocol fault (couldn't read status message): No error

 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  .\scrcpy.exe
scrcpy 3.3.4 <https://github.com/Genymobile/scrcpy >
ERROR: Multiple (2) ADB devices:
ERROR: --> (usb) askdlskdf device Redmi_Note_x
ERROR: --> (tcpip) 192.168.40.16:5555 device Redmi_Note_x
ERROR: Select a device via -s (--serial), -d (--select-usb) or -e (--select-tcpip)
ERROR: Server connection failed

 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  adb connect 192.168.40.16:5555
connected to 192.168.40.16:5555
 user@DESKTOP-EH2GAQ2  ~\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-v3.3.4  .\scrcpy.exe -e
scrcpy 3.3.4 <https://github.com/Genymobile/scrcpy>
INFO: ADB device found:
INFO: --> (tcpip) 192.168.40.16:5555 device Redmi_Note_x
C:\Users\user\Downloads\scrcpy-win64-v3.3.4\scrcpy-win64-... file pushed, 0 skipped. 65.7 MB/s (90980 bytes in 0.001s)
[server] INFO: Device: [Xiaomi] xiaomi Redmi Note X (Android 10)
[server] WARN: Audio disabled: it is not supported before Android 11
INFO: Renderer: direct3d
WARN: Demuxer 'audio': stream explicitly disabled by the device

adb shell
lavender:/sdcard $ cd com
com.android.bankabc/ com.sfpay.mobile/ com.weilai.ssby.banana/
com.jifen.ac/ com.tencent.mtt/ com.wifi.ac/
lavender:/sdcard $ ip route
192.168.40.0/24 dev wlan0 proto kernel scope link src 192.168.40.16
lavender:/sdcard $ ip route | awk '{print $9}'
192.168.40.16
```
