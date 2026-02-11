

# Docker Private Image Registry Configuration and Usage

This guide is applicable to setting up a private image repository based on Docker Registry, which supports both HTTP and HTTPS access and provides an authentication mechanism.

---

## Basic Deployment

### Create a storage directory on the host machine

```bash
sudo mkdir -p /opt/myregistry
```

### Start a private repository (without authentication)

```bash
docker run -d \
  -p 5000:5000 \
  --restart=always \
  --name registry \
  -v /opt/myregistry:/var/lib/registry \
  registry
```

### Verify running status

```bash
docker ps | grep registry
```

### Test whether the repository is available

```bash
curl http://localhost:5000/v2/_catalog
```

✅ The returned result should be:

```json
{"repositories":[]}
```

Indicates that the warehouse has been activated and is empty (normal).

---

## Push the image to the repository

### Labeling local images

```bash
docker tag nginx:latest localhost:5000/nginx:latest
```

### Push to private repository

```bash
docker push localhost:5000/nginx:latest
```

### Verify push results

```bash
curl http://localhost:5000/v2/_catalog
```

✅ The returned results should include:

```json
{"repositories":["nginx"]}
```

---

## Other machines pulling images

> Note: You need to configure `insecure-registries` to allow non-HTTPS access.

### Configure Docker client

Edit `/etc/docker/daemon.json`:

```json
{
  "insecure-registries": ["192.168.1.100:5000"]
}
```

Restart Docker:

```bash
sudo systemctl restart docker
```

### Pulling images

```bash
docker pull 192.168.1.100:5000/nginx:latest
```

---

## Enable authentication (HTpasswd)

### Create authentication directory

```bash
mkdir -p /opt/registry-auth
```

### Generate password file

```bash
docker run --rm --entrypoint htpasswd httpd:2 -Bbn admin 123456 > /opt/registry-auth/htpasswd
```

### Start a repository with authentication

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

## Verification and Debugging

### View the list of images in the repository

```bash
curl http://localhost:5000/v2/_catalog
```

### View the tag list of a specific image

```bash
curl http://localhost:5000/v2/nginx/tags/list
```

### Viewing container logs

```bash
docker logs registry
```

---

## Management Operations

### Stop/start/restart the repository

```bash
docker stop registry
docker start registry
docker restart registry
```

### Completely delete the repository (retain the data volume)

```bash
docker rm -f registry
```

### Recreate repository (without losing data)

```bash
docker run -d -p 5000:5000 --restart=always --name registry \
  -v /opt/myregistry:/var/lib/registry \
  registry
```

---

## Advanced Operations

### Delete specific images (manual cleanup)

#### Enter container to delete

```bash
docker exec -it registry /bin/sh
cd /var/lib/registry/docker/registry/v2/repositories
rm -rf centos7
exit
```

#### Perform garbage collection

```bash
registry garbage-collect /etc/distribution/config.yml
```

#### One-click script (recommended)

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

## Comparison of Authentication Methods

| Tool | Behavior | Description |
|--------------------|-------------------|------|
| `docker login`     | ✅ Successfully | Credentials saved to `~/.docker/config.json` |
| `docker push/pull` | ✅ Automatic credential usage   | Docker client automatically reads config.json |
| `curl`             | ❌ Unauthenticated | Will not read Docker configuration files |

### Using `curl` for Authentication

#### Directly pass username and password

```bash
curl -u admin:123456 http://localhost:5000/v2/_catalog
```

#### Base64 encoded authentication header

```bash
echo -n "admin:123456" | base64
# Output: YWRtaW46MTIzNDU2

curl -H "Authorization: Basic YWRtaW46MTIzNDU2" http://localhost:5000/v2/_catalog
```

#### Extracting credentials from Docker configuration (automatically)

```bash
AUTH=$(cat ~/.docker/config.json | jq -r '.auths["localhost:5000"].auth')
curl -H "Authorization: Basic $AUTH" http://localhost:5000/v2/_catalog
```

---

## Path change description

| Old path (document/old version) | Actual path (your version) |
|----------------------------------|-------------------------------|
| `/etc/docker/registry/config.yml` | `/etc/distribution/config.yml` |

> ⚠️ Note: Docker Registry v2+ uses the `distribution` configuration file, rather than the older `docker/registry` version.