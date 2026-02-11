# Harbor Private Image Repository Setup Guide

> This guide is applicable to deploying Harbor on a Linux system using the offline installer package (`harbor-offline-installer`).

---

## Download Harbor installation package

Visit the official GitHub site to download the Harbor offline installer:

```bash
https://github.com/goharbor/harbor/releases/download/v2.14.2/harbor-offline-installer-v2.14.2.tgz
```

> Note: Please ensure that the version you download is compatible with your system (such as v2.14.2) and confirm that the file name is correct.

---

## Unzip the installation package

Unzip the downloaded `.tgz` file to the specified directory:

```bash
tar xf harbor-offline-installer-v2.14.2.tgz -C /harbor/softwares/
```

🔧 Assume that you place the software package in the `/harbor/softwares/` directory.

---

## Modify the configuration file `harbor.yml`

Enter the unzipped directory and edit the configuration file:

```bash
vim /harbor/softwares/harbor/harbor.yml
```

### Configuration item description

#### Set host name (IP or domain name)

```yaml
hostname: 10.0.0.101
```

This is the access address for Harbor, which must be set to a publicly accessible IP or domain name.

#### Disable HTTPS (only for test environments)

If you don't need HTTPS, you can comment out the relevant configuration:

```yaml
# https:
#   # https port for harbor, default is 443
#   port: 443
#   # The path of cert and key files for nginx
#   certificate: /your/certificate/path
#   private_key: /your/private/key/path
```

💡 It is recommended to enable HTTPS and configure certificates in the production environment.

#### Set administrator password

```yaml
harbor_admin_password: 123456
```

The default username is `admin`, and the password is the value you define here (here it is `"123456"`).

---

## Begin installing the Harbor service

Execute the installation script:

```bash
./install.sh
```

<img src="/harbor/harbor-img.png" width="100%" />

The installation process will automatically pull the dependent container images and start the services required by Harbor (such as Nginx, PostgreSQL, Redis, Registry, etc.).

---

## Accessing the Harbor page

After the installation is complete, open your browser and visit:

```
http://10.0.0.101
```

> Username: `admin`
Password: The password you set in `harbor.yml` (e.g. `"123456"`)

---

## Operations after Login (Optional)

After successfully logging in, you can:

- Add Project
- Push/pull images
- Configure user permissions
- View audit logs

---

## Troubleshooting of Common Issues

| Problem                      | Reason       | Solution                              |
| ------------------------- | ---------- | ------------------------------------- |
| Page cannot be accessed | Port not open | Check if the firewall allows port 80 |
| Error: `connection refused` | Service not started | Execute `docker ps` to check container status |
| Login failed                  | Password error   | Check if `harbor_admin_password` is correct |
| HTTPS Error                | Certificate Missing   | If HTTPS is enabled, please provide a valid certificate path      |

---

## Start/Stop Harbor Service

### Start the service

```bash
docker-compose up -d
```

### Discontinuation of Service

```bash
docker-compose down
```

---

## Upgrade Harbor (Optional)

If you need to upgrade the Harbor version:

1. Download the new version of `harbor-offline-installer`
2. Replace old version files
3. Modify the `harbor.yml` configuration
4. Execute `./install.sh` to automatically upgrade

---

## Supplementary Information

- Harbor supports advanced features such as multi-tenancy, RBAC permission control, image replication, and vulnerability scanning.
- It is recommended to use HTTPS + self-signed or CA certificates in production environments.
- Can be used in conjunction with Kubernetes to achieve CI/CD pipeline integration.

---

### Example of file structure

```
/harbor/softwares/
└── harbor/
    ├── harbor.yml
    ├── install.sh
    └── docker-compose.yml
```

---

### Tips

- If you are a beginner, it is recommended to deploy Harbor in a local testing environment first.
- You can view the specific error information by executing `docker logs <container_name>`.
- The logs of Harbor are located in the `/var/log/harbor/` directory.