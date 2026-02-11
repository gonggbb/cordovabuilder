# Harbor 私有镜像仓库搭建指南

> 本指南适用于在 Linux 系统上部署 Harbor，使用离线安装包（`harbor-offline-installer`）进行安装。

---

## 下载 Harbor 安装包

访问 GitHub 官方地址下载 Harbor 离线安装包：

```bash
https://github.com/goharbor/harbor/releases/download/v2.14.2/harbor-offline-installer-v2.14.2.tgz
```

---

## 解压安装包

将下载的 `.tgz` 文件解压到指定目录：

```bash
tar xf harbor-offline-installer-v2.14.2.tgz -C /harbor/softwares/
```

> 🔧 假设你将软件包放在 `/harbor/softwares/` 目录下。

---

## 修改配置文件 `harbor.yml`

进入解压后的目录，编辑配置文件：

```bash
vim /harbor/softwares/harbor/harbor.yml
```

### 配置项说明

#### 设置主机名称（IP 或域名）

```yaml
hostname: 10.0.0.101
```

> 这是 Harbor 的访问地址，必须设置为公网可访问的 IP 或域名。

#### 禁用 HTTPS（仅用于测试环境）

如果你不需要 HTTPS，可以注释掉相关配置：

```yaml
# https:
#   # https port for harbor, default is 443
#   port: 443
#   # The path of cert and key files for nginx
#   certificate: /your/certificate/path
#   private_key: /your/private/key/path
```

> 💡 生产环境建议启用 HTTPS 并配置证书。

#### 设置管理员密码

```yaml
harbor_admin_password: 123456
```

> 默认用户名为 `admin`，密码是你在这里定义的值（此处为 `"123456"`）。

---

## 开始安装 Harbor 服务

执行安装脚本：

```bash
./install.sh
```

<img src="/harbor/harbor-img.png" width="100%" />

> 安装过程会自动拉取依赖容器镜像，并启动 Harbor 所需的服务（如 Nginx、PostgreSQL、Redis、Registry 等）。

---

## 访问 Harbor 页面

安装完成后，打开浏览器访问：

```
http://10.0.0.101
```

> 用户名：`admin`  
> 密码：你在 `harbor.yml` 中设置的密码（例如 `"123456"`）

---

## 登录后操作（可选）

登录成功后，你可以：

- 添加项目（Project）
- 推送/拉取镜像
- 配置用户权限
- 查看审计日志

---

## 常见问题排查

| 问题                      | 原因       | 解决方案                              |
| ------------------------- | ---------- | ------------------------------------- |
| 无法访问页面              | 端口未开放 | 检查防火墙是否放行 80 端口            |
| 报错 `connection refused` | 服务未启动 | 执行 `docker ps` 查看容器状态         |
| 登录失败                  | 密码错误   | 检查 `harbor_admin_password` 是否正确 |
| HTTPS 报错                | 证书缺失   | 若启用 HTTPS，请提供有效证书路径      |

---

## 启动/停止 Harbor 服务

### 启动服务

```bash
docker-compose up -d
```

### 停止服务

```bash
docker-compose down
```

---

## 升级 Harbor（可选）

如果需要升级 Harbor 版本：

1. 下载新版本的 `harbor-offline-installer`
2. 替换旧版本文件
3. 修改 `harbor.yml` 配置
4. 执行 `./install.sh` 即可自动升级

---

## 补充说明

- Harbor 支持多租户、RBAC 权限控制、镜像复制、漏洞扫描等高级功能。
- 推荐生产环境中使用 HTTPS + 自签名或 CA 证书。
- 可结合 Kubernetes 使用，实现 CI/CD 流水线集成。

---

### 文件结构示例

```
/harbor/softwares/
└── harbor/
    ├── harbor.yml
    ├── install.sh
    └── docker-compose.yml
```

---

### 小贴士

- 如果你是初学者，建议先在本地测试环境部署 Harbor。
- 可以通过 `docker logs <container_name>` 查看具体报错信息。
- Harbor 的日志位于 `/var/log/harbor/` 目录下。
