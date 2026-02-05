

## 数字证书生成 推荐方式（适用于 JDK 9+）

```bash
keytool -genkeypair -alias myappkey \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125 \
  -keyalg RSA -keysize 2048 \
  -sigalg SHA256withRSA \
  -storetype PKCS12
```

## 传统方式（适用于旧版 JDK）

```bash
keytool -genkey -alias myappkey \
  -keystore "/workspace/myApp/newmyapp.p12" \
  -storepass 你的密码 \
  -keypass 你的密码 \
  -dname "CN=组织名称或域名, OU=部门或分支机构名称, O=组织, L=地区城市, ST=周或省, C=你的国家" \
  -validity 9125 \
  -keyalg RSA
```
