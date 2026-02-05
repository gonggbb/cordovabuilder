## 📦 证书升级与转换

```bash
# 安装 OpenSSL（Ubuntu/Debian）
apt update && apt install openssl

# 提取私钥
openssl pkcs12 -in newmyapp.p12 -nodes -nocerts -out myappkey.pem

# 提取原证书
openssl pkcs12 -in newmyapp.p12 -nokeys -out old-cert.pem

# 生成新的自签名证书
openssl req -new -x509 \
  -key myappkey.pem \
  -out new-cert.pem \
  -days 9125 \
  -subj "/CN=组织名称或域名/OU=部门或分支机构名称/O=组织/L=地区城市/ST=周或省/C=你的国家"

# 导出为 PKCS12 格式
openssl pkcs12 -export \
  -in new-cert.pem \
  -inkey myappkey.pem \
  -out newmyapp-renewed.p12 \
  -name myappkey \
  -passout pass:你的密码
```
