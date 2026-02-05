

## Digital Certificate Generation - Recommended Method (Applicable to JDK 9+)

```bash
keytool -genkeypair -alias myappkey \
  -keystore /workspace/myApp/newmyapp.p12 \
  -storepass your password
  -keypass your password
  -dname "CN=Organization name or domain name, OU=Department or branch name, O=Organization, L=City, ST=State or province, C=Your country" \
  -validity 9125 \
  -keyalg RSA -keysize 2048 \
  -sigalg SHA256withRSA \
  -storetype PKCS12
```

## Traditional method (applicable to older JDK versions)

```bash
keytool -genkey -alias myappkey \
  -keystore "/workspace/myApp/newmyapp.p12" \
  -storepass your password
  -keypass your password
  -dname "CN=Organization name or domain name, OU=Department or branch name, O=Organization, L=City, ST=State or province, C=Your country" \
  -validity 9125 \
  -keyalg RSA
```
