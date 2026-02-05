## APK 使用 apksigner 签名（推荐方式）

```bash
apksigner sign \
  --ks newmyapp-renewed.p12 \
  --ks-pass pass:你的密码 \
  --ks-key-alias myappkey \
  --key-pass pass:你的密码 \
  --out platforms/android/app/build/outputs/apk/release/app-release-signed.apk \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

## APK 使用 jarsigner 签名（传统方式）

```bash
jarsigner -verbose \
  -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 -keypass 你的密码 \
  app-release-unsigned.apk myappkey
```

## 签名验证

```bash
# 验证 APK 签名
jarsigner -verify -verbose -certs app-release-unsigned.apk

# 查看密钥库内容
keytool -list -v -keystore newmyapp-renewed.p12

# 从 APK 中提取并显示证书信息
keytool -printcert -jarfile platforms/android/app/build/outputs/apk/release/app-release-signed.apk
```

