## 指令

```bash
# 创建项目 
  cordova create myApp org.apache.cordova.myApp myApp
  cordova plugin add cordova-plugin-camera
  cordova platform add android
  cordova plugin add cordova-plugin-camera --nosave
  cordova platform add android --nosave
  cordova requirements android
  cordova build android --verbose
  cordova run android
  cordova build android --release -- --keystore="..\android.keystore" --storePassword=android --alias=mykey
  cordova config ls

# 签名证书生成 或者 Android Studio 签名证书生成
keytool -genkey -alias myappkey \
  -keystore "/workspace/myApp/newmyapp.p12" \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125  \
  -keyalg RSA

## JDK 9+ 请用 -genkeypair（-genkey 已废弃）keytool -genkey 生成了 RSA + SHA1 默认算法 的密钥对,SHA1 标记为“弱算法”，验证时直接判“无效签名”
#Warning: The signer's certificate is self-signed. The SHA1 algorithm specified for the -digestalg option is considered a security risk and is disabled. The SHA1withRSA algorithm specified for the -sigalg option is considered a security risk and is disabled. POSIX file permission and/or symlink attributes detected. These attributes are ignored when signing and are not protected by the signature. 

## 推荐 😄
keytool -genkeypair -alias myappkey \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125 \
  -keyalg RSA -keysize 2048 \
  -sigalg SHA256withRSA \
  -storetype PKCS12        # 显式指定，防止老版本默认 JKS

#  jarsigner v1 
jarsigner -verbose \
  -sigalg SHA256withRSA -digestalg SHA-256 \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 -keypass 你的密码 \
  app-release-unsigned.apk myappkey

# APK文件中实际应用的签名信息
jarsigner -verify -verbose -certs app-release-unsigned.apk          
# 源密钥库文件的内容：
keytool -list -v -keystore newmyapp-renewed.p12 # Keystore type: PKCS12
# APK文件中实际应用的签名信息
keytool -printcert -jarfile platforms/android/app/build/outputs/apk/release/app-release-signed.apk

# 升级

## 对于 Ubuntu/Debian
apt update && apt install openssl

openssl pkcs12 -in newmyapp.p12 -nodes -nocerts -out myappkey.pem
openssl pkcs12 -in newmyapp.p12 -nokeys -out old-cert.pem
openssl req -new -x509 \
  -key myappkey.pem \
  -out new-cert.pem \
  -days 9125 \
  -subj "/CN=组织名称或域名/OU=部门或分支机构名称/O=组织/L=地区城市/ST=周或省/C=你的国家"
openssl pkcs12 -export \
  -in new-cert.pem \
  -inkey myappkey.pem \
  -out newmyapp-renewed.p12 \
  -name myappkey \
  -passout pass:你的密码

# 推荐签名 😄 apksigner 默认就用 SHA-256 + v2/v3 方案，不会踩 SHA1 坑

## Cordova CLI：
cordova build android --release  -- --packageType=apk \
  --keystore=/workspace/myApp/newmyapp-renewed.p12 \
  --keystoreType=PKCS12 \
  --storePassword=你的密码 \
  --alias=myappkey \
  --password=你的密码

## 手工签名（apksigner）：

apksigner sign \
  --ks newmyapp-renewed.p12 \
  --ks-pass pass:你的密码 \
  --ks-key-alias myappkey \
  --key-pass pass:你的密码 \
  --out platforms/android/app/build/outputs/apk/release/app-release-signed.apk \
  platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```