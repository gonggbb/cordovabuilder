# Docker 私有镜像仓库（Registry）配置与使用

> 本指南适用于搭建基于 Docker Registry 的私有镜像仓库，支持 HTTP 和 HTTPS 访问，并提供认证机制。

---

## 基础部署

### 创建宿主机存储目录

```bash
sudo mkdir -p /opt/myregistry
```

### 启动私有仓库（无认证）

```bash
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /opt/myregistry:/var/lib/registry \
  registry
```

### 验证运行状态

```bash
docker ps | grep registry
```

### 测试仓库是否可用

```bash
curl http://localhost:5000/v2/_catalog
```

返回结果应为：

```json
{ "repositories": [] }
```

表示仓库已启动且为空（正常）。

---

## 推送镜像到仓库

### 给本地镜像打标签

```bash
docker tag nginx:latest localhost:5000/nginx:latest
```

### 推送到私有仓库

```bash
docker push localhost:5000/nginx:latest
```

### 验证推送结果

```bash
curl http://localhost:5000/v2/_catalog
```

返回结果应包含：

```json
{ "repositories": ["nginx"] }
```

---

## 其他机器拉取镜像

> 注意：需配置 `insecure-registries` 允许非 HTTPS 访问。

### 配置 Docker 客户端

编辑 `/etc/docker/daemon.json`：

```json
{
  "insecure-registries": ["192.168.1.100:5000"]
}
```

重启 Docker：

```bash
sudo systemctl restart docker
```

### 拉取镜像

```bash
docker pull 192.168.1.100:5000/nginx:latest
```

---

## 启用认证（HTpasswd）

### 创建认证目录

```bash
mkdir -p /opt/registry-auth
```

### 生成密码文件

```bash
docker run --rm --entrypoint htpasswd httpd:2 -Bbn admin 123456 > /opt/registry-auth/htpasswd
```

### 启动带认证的仓库

```bash
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /opt/myregistry:/var/lib/registry \
  -v /opt/registry-auth:/auth \
  -e "REGISTRY_AUTH=htpasswd" \
  -e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
  -e "REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd" \
  registry
```

---

## 验证与调试

### 查看仓库中的镜像列表

```bash
curl http://localhost:5000/v2/_catalog
```

### 查看某个镜像的标签列表

```bash
curl http://localhost:5000/v2/nginx/tags/list
```

### 查看容器日志

```bash
docker logs registry
```

---

## 管理操作

### 停止/启动/重启仓库

```bash
docker stop registry
docker start registry
docker restart registry
```

### 完全删除仓库（保留数据卷）

```bash
docker rm -f registry
```

### 重新创建仓库（数据不丢失）

```bash
docker run -d -p 5000:5000 --restart=always --name registry \
  -v /opt/myregistry:/var/lib/registry \
  registry
```

---

## 高级操作

### 删除特定镜像（手动清理）

#### 进入容器删除

```bash
docker exec -it registry /bin/sh
cd /var/lib/registry/docker/registry/v2/repositories
rm -rf centos7
exit
```

#### 执行垃圾回收

```bash
registry garbage-collect /etc/distribution/config.yml
```

#### 一键脚本（推荐）

```bash
#!/bin/bash
IMAGE_NAME="centos7"
REGISTRY_IP="192.168.91.8:5000"

docker exec -it registry /bin/sh << EOF
cd /var/lib/registry/docker/registry/v2/repositories
rm -rf $IMAGE_NAME
registry garbage-collect /etc/distribution/config.yml
EOF

curl http://$REGISTRY_IP/v2/_catalog
```

---

## 认证方式对比

| 工具               | 行为         | 说明                               |
| ------------------ | ------------ | ---------------------------------- |
| `docker login`     | 成功         | 凭证保存到 `~/.docker/config.json` |
| `docker push/pull` | 自动使用凭证 | Docker 客户端自动读取 config.json  |
| `curl`             | 未认证       | 不会读取 Docker 配置文件           |

### 使用 `curl` 进行认证

#### 直接传用户名密码

```bash
curl -u admin:123456 http://localhost:5000/v2/_catalog
```

#### Base64 编码认证头

```bash
echo -n "admin:123456" | base64
# 输出：YWRtaW46MTIzNDU2

curl -H "Authorization: Basic YWRtaW46MTIzNDU2" http://localhost:5000/v2/_catalog
```

#### 从 Docker 配置提取凭证（自动化）

```bash
AUTH=$(cat ~/.docker/config.json | jq -r '.auths["localhost:5000"].auth')
curl -H "Authorization: Basic $AUTH" http://localhost:5000/v2/_catalog
```

---

## 路径变更说明

| 旧路径（文档/旧版本）             | 实际路径（你的版本）           |
| --------------------------------- | ------------------------------ |
| `/etc/docker/registry/config.yml` | `/etc/distribution/config.yml` |

> 注意：Docker Registry v2+ 使用 `distribution` 配置文件，而非旧版的 `docker/registry`。
