## 使用 Docker Compose（全平台通用）

创建 `docker-compose.yml` 文件：

```yaml
# version: '3.8'

services:
  cordova-builder:
    image: gamesg/cordovabuilder:v2.0.0-rc.5
    container_name: cordova-builder01
    user: root
    stdin_open: true
    tty: true
    volumes:
      - ./gradle-caches:/root/.gradle
      - ./:/workspace
    environment:
      KEYSTORE_PATH: /workspace/xx.keystore
      KEY_ALIAS: xx
      KEYSTORE_PASSWORD: password
      KEY_PASSWORD: password
    working_dir: /workspace
    # 如需初始化命令，取消下面注释：
    # entrypoint: ["/bin/bash", "-c", "ln -sfn /opt/app-env/build-scripts /workspace/build-scripts-short && exec /bin/bash"]
```

## 使用方法（全平台通用）：

```bash
# 验证
docker-compose config

# 启动
docker-compose up -d cordova-builder

# 进入容器
docker-compose exec cordova-builder bash

# 停止
docker-compose down


```

<img src="/v12/compose-ok.png" width="100%" />
